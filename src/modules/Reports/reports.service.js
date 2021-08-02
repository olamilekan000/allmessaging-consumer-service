/* eslint-disable brace-style */
const logger = require('../../config/winston');
const makeHttpSuccess = require('../../helpers/http-success');

class ReportsService {
  constructor({ ReportsServiceCaller }) {
    this.ReportsServiceCaller = ReportsServiceCaller;
  }

  async createAuditTrail(data, channel) {
    try {
      const parsedMsg = JSON.parse(data.content.toString());

      logger.info('data', parsedMsg);

      const { ReportsServiceCaller } = this;

      await ReportsServiceCaller.createAuditTrail(parsedMsg);

      logger.info('Audit trail successfully created.');
      channel.ack(data);
    } catch (error) {
      console.log(error);
      logger.info(`[xxxxxxxxx]`, error.data);
    }
  }

  async getAuditTrailsByAdmin(httpRequest) {
    const { queryParams, headers } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data, total, limit, page } =
      await ReportsServiceCaller.getAuditTrailsByAdmin(queryParams, headers);

    return makeHttpSuccess(
      {
        statusCode: 200,
        successMessage: 'ok',
        successData: data
      },
      { total, limit, page }
    );
  }

  async getAuditTrailByAdmin(httpRequest) {
    const {
      params: { id },
      headers
    } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data } = await ReportsServiceCaller.getAuditTrailByAdmin(
      id,
      {},
      headers
    );

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: data
    });
  }

  async createTransaction(httpRequest) {
    const { body } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data } = await ReportsServiceCaller.createTransaction(body);

    return makeHttpSuccess({
      statusCode: 201,
      successMessage: 'ok',
      successData: data
    });
  }

  async getTransactionsByAdmin(httpRequest) {
    const { queryParams, headers } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data, total, limit, page } =
      await ReportsServiceCaller.getTransactionsByAdmin(queryParams, headers);

    return makeHttpSuccess(
      {
        statusCode: 200,
        successMessage: 'ok',
        successData: data
      },
      { total, limit, page }
    );
  }

  async getTransactionByAdmin(httpRequest) {
    const {
      params: { id },
      headers
    } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data } = await ReportsServiceCaller.getTransactionByAdmin(
      id,
      {},
      headers
    );

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: data
    });
  }

  async createServiceReport(httpRequest) {
    const { body } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data } = await ReportsServiceCaller.createServiceReport(body);

    return makeHttpSuccess({
      statusCode: 201,
      successMessage: 'ok',
      successData: data
    });
  }

  async getServiceReportsByAdmin(httpRequest) {
    const { queryParams, headers } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data, total, limit, page } =
      await ReportsServiceCaller.getServiceReportsByAdmin(queryParams, headers);

    return makeHttpSuccess(
      {
        statusCode: 200,
        successMessage: 'ok',
        successData: data
      },
      { total, limit, page }
    );
  }

  async getServiceReportByAdmin(httpRequest) {
    const {
      params: { id },
      headers
    } = httpRequest;

    const { ReportsServiceCaller } = this;

    const { data } = await ReportsServiceCaller.getServiceReportByAdmin(
      id,
      {},
      headers
    );

    return makeHttpSuccess({
      statusCode: 200,
      successMessage: 'ok',
      successData: data
    });
  }
}

module.exports = ReportsService;
