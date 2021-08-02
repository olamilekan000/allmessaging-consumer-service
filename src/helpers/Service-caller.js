const axios = require('axios');
const logger = require('../config/winston');
const ERROR_MESSAGES = require('../constants/error-messages');

module.exports = class ServiceCaller {
  constructor({ EnvironmentConfig: { microservice: config } }) {
    this.config = config;
  }

  static throwError(microservice, message, code, data, errors) {
    const error = new Error(message);
    error.microservice = microservice;
    error.code = code;
    error.data = data;
    error.isMicroservice = true;
    error.errors = errors;

    throw error;
  }

  async request(
    microservice,
    method,
    path,
    data = {},
    params = {},
    headers = {},
    timeout = this.config.timeout
  ) {
    const { config } = this;
    const url = `${config.urls[microservice]}${path}`;

    const start = new Date();

    return axios({
      method,
      url,
      data,
      params,
      headers,
      timeout,
      validateStatus: () => true
    })
      .then((response) => {
        const elapsed = +new Date() - +start;

        logger.info(`${microservice} service caller meta-data`, {
          microservice,
          method,
          url,
          data,
          params,
          headers,
          start,
          elapsed,
          status: response.status,
          response: response.data
        });

        if ([200, 201].includes(response.status)) {
          return response.data;
        }

        if (response.data.code) {
          logger.log('error', `[xxxxx] ${response.data} - response.data.code`);
          return ServiceCaller.throwError(
            microservice,
            response?.data.message?.error || response?.data?.message,
            response.data.code,
            response.data.data,
            response.data.errors || response.data.error
          );
        }

        const { message, code } = ERROR_MESSAGES.MICROSERVICE;
        return ServiceCaller.throwError(
          microservice,
          message,
          code,
          response.data
        );
      })
      .catch((requestError) => {
        const elapsed = +new Date() - +start;

        logger.info(
          `[xxxxxxxxx] ${microservice} [service caller error] - requestError`,
          {
            microservice,
            method,
            url,
            data,
            params,
            headers,
            start,
            elapsed,
            error: requestError.message
          }
        );

        return ServiceCaller.throwError(
          microservice,
          requestError.message,
          requestError.isMicroservice
            ? requestError.code
            : ERROR_MESSAGES.MICROSERVICE.code,
          requestError.data,
          requestError.errors
        );
      });
  }
};
