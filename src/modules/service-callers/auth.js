const {
  MICROSERVICE: { auth: microservice }
} = require('../../constants');

class Auth {
  constructor({ ServiceCaller }) {
    this.ServiceCaller = ServiceCaller;
  }

  async login(data = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(microservice, 'POST', `auth/login`, data);
  }

  async createMerchant(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `users/create/merchant`,
      data,
      {},
      headers
    );
  }

  async createPartner(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `users/create/partner`,
      data,
      {},
      headers
    );
  }

  async createAccountType(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `auth/account/type/create`,
      data,
      {},
      headers
    );
  }

  async listAccountTypes(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `auth/account/type/list`,
      {},
      params,
      headers
    );
  }

  async listAccountType(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `auth/account/type/fetch`,
      {},
      params,
      headers
    );
  }

  async deleteAccountType(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'DELETE',
      `auth/account/type/delete`,
      {},
      params,
      headers
    );
  }

  async createRole(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `auth/role/create`,
      data,
      headers
    );
  }

  async listRoles(params = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'GET',
      `auth/role/list`,
      {},
      params,
      headers
    );
  }

  async createPermission(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `auth/permission/create`,
      data,
      {},
      headers
    );
  }

  async assignPermissionToRole(data = {}, headers = {}) {
    const { ServiceCaller } = this;

    return ServiceCaller.request(
      microservice,
      'POST',
      `auth/role/permission/assign`,
      data,
      {},
      headers
    );
  }
}

module.exports = Auth;
