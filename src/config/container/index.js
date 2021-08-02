const awilix = require('awilix');

const { containerNameFormatter } = require('../../helpers/formatName');

const container = awilix.createContainer();

const setupContainer = () => {
  container.loadModules(['../../consumers/**.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asFunction
    },
    formatName: containerNameFormatter('Consumer')
  });

  container.loadModules(['../../helpers/Service-caller.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asClass
    },
    formatName: containerNameFormatter('')
  });

  container.loadModules(['../../modules/service-callers/**.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asClass
    },
    formatName: containerNameFormatter('ServiceCaller')
  });

  container.loadModules(['../../modules/**/**.service.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asClass
    },
    formatName: containerNameFormatter('Service')
  });

  container.loadModules(['../environment.js'], {
    cwd: __dirname,
    resolverOptions: {
      register: awilix.asFunction
    },
    formatName: containerNameFormatter('Config')
  });
};

module.exports = {
  container,
  setupContainer
};
