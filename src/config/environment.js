const { MICROSERVICE } = require('../constants');

const environmentConfig = () => {
  let envConfig = {};

  switch (process.env.NODE_ENV) {
    case 'staging':
      envConfig = {
        mongoBD: process.env.MONGODB_URL,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        microservice: {
          urls: {
            [MICROSERVICE.reports]: process.env.MICROSERVICE_URLS_REPORTS || '',
            [MICROSERVICE.auth]: process.env.MICROSERVICE_URLS_AUTH || ''
          },
          timeout: +(process.env.MICROSERVICE_TIMEOUT || 10000)
        },
        rabbitMq: {
          ALLMESSAGINGAPP: {
            url: process.env.RABBITMQ_URL || '',
            name: 'AllmessagingAppStaging',
            maxRetries: 10,
            exchanges: {
              reportService: {
                name: 'reportServiceStaging',
                type: 'direct',
                options: {
                  autoDelete: false,
                  durable: true,
                  passive: true
                },
                queues: {
                  reportService: {
                    name: 'report-service-staging',
                    pattern: 'report-service-staging',
                    options: {
                      durable: true
                    }
                  }
                }
              }
            }
          }
        }
      };
      break;

    default:
      envConfig = {
        mongoBD: process.env.MONGODB_URL_DEV,
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
        microservice: {
          urls: {
            [MICROSERVICE.reports]:
              process.env.MICROSERVICE_URLS_REPORTS ||
              'https://dev-bluintouch-report-service.blusalt.net/api/v1/',
            [MICROSERVICE.auth]:
              process.env.MICROSERVICE_URLS_AUTH ||
              'https://dev-bluintouch-auth.blusalt.net/api/v1/'
          },
          timeout: +(process.env.MICROSERVICE_TIMEOUT || 10000)
        },
        rabbitMq: {
          ALLMESSAGINGAPP: {
            url: process.env.RABBITMQ_URL || '',
            credentials: {
              userName: process.env.RABBITMQ_URL_USERNAME,
              password: process.env.RABBITMQ_URL_PASSWORD
            },
            name: 'AllmessagingAppDev',
            maxRetries: 10,
            exchanges: {
              reportService: {
                name: 'reportServiceDev',
                type: 'direct',
                options: {
                  autoDelete: false,
                  durable: true,
                  passive: true
                },
                queues: {
                  reportService: {
                    name: 'report-service-dev',
                    pattern: 'report-service-dev',
                    options: {
                      durable: true
                    }
                  }
                }
              }
            }
          }
        }
      };
      break;
  }

  return envConfig;
};

module.exports = environmentConfig;
