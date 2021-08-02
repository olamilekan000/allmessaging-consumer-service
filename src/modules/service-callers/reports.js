const {
  MICROSERVICE: { reports: microservice }
} = require('../../constants');

class Reports {
  constructor({ ServiceCaller }) {
    this.ServiceCaller = ServiceCaller;
  }

  async createAuditTrail(data = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `audit-trails/create`,
      data
    );
  }

  async getAuditTrailsByAdmin(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `audit-trails/admin`,
      {},
      params,
      headers
    );
  }

  async getAuditTrailByAdmin(auditTrailId, params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `audit-trails/${auditTrailId}/admin`,
      {},
      params,
      headers
    );
  }

  async createTransaction(data = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `transactions/create`,
      data,
      {}
    );
  }

  async getTransactionsByAdmin(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `transactions/admin`,
      {},
      params,
      headers
    );
  }

  async getTransactionByAdmin(transactionId, params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `transactions/${transactionId}/admin`,
      {},
      params,
      headers
    );
  }

  async createServiceReport(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `service-reports/create`,
      data,
      {},
      headers
    );
  }

  async getServiceReportsByAdmin(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `service-reports/admin`,
      {},
      params,
      headers
    );
  }

  async getServiceReportByAdmin(serviceReportId, params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `service-reports/${serviceReportId}/admin`,
      {},
      params,
      headers
    );
  }
}

module.exports = Reports;
