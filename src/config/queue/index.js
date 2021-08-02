/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
const amqp = require('amqplib/callback_api');
const { container } = require('../container');
const { QUEUE } = require('../../constants');
const logger = require('../winston');
const {
  rabbitMq: {
    ALLMESSAGINGAPP: {
      url,
      credentials: { userName, password }
    }
  }
} = require('../environment')();

const messageBroker = () => {
  const opt = { credentials: amqp.credentials.plain(userName, password) };

  const consumeMessage = async (queue, channel) => {
    switch (queue.queue) {
      case QUEUE.REPORT_SERVICE_AUDIT_TRAIL_QUEUE:
        const { createAuditTrail } = container.resolve('AuditTrailConsumer');
        await channel.consume(queue.queue, createAuditTrail(channel));
        break;

      default:
        break;
    }
  };

  const setupBroker = () =>
    new Promise((resolve, reject) => {
      amqp.connect(url, opt, (connErr, conn) => {
        if (connErr) {
          logger.log('info', `${connErr} - Connection Error`);
          return reject();
        }

        conn.createChannel((err, channel) => {
          if (err) {
            logger.log('info', `${err} - Channel Error`);
            return reject();
          }

          const QUEUES_AND_EXC = Object.keys(QUEUE);

          for (let index = 0; index < QUEUES_AND_EXC.length; index++) {
            const element = QUEUES_AND_EXC[index];
            const binding = QUEUE[element];
            channel.assertExchange(binding, 'direct', { durable: true });
            channel.assertQueue(
              binding,
              {
                durable: true
              },
              (err2, queue) => {
                if (err2) {
                  throw err2;
                }
                // channel.bindQueue(q.queue, binding, '');
                consumeMessage(queue, channel);
              }
            );
          }

          logger.log('info', `Successfully Connected to the queue`);
          resolve();
        });
      });
    });

  return {
    setupBroker,
    consumeMessage
  };
};

module.exports = messageBroker;
