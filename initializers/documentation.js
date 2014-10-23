// documentation in the form of swagger: https://github.com/wordnik/swagger-ui

var documentation = function(api, next){

  api.documentation = {
    documentation: {
      title: api.config.general.serverName,
      description: api.config.general.description,
      version: api.config.general.apiVersion,
      swagger: 2,
      basePath: '/' + api.config.servers.web.urlPathForActions,
      paths: {},
      definitions: {},
    },

    // build: function(){
    //   for(var i in api.actions.actions){
    //     for(var j in api.actions.actions[i]){
    //       var action = api.actions.actions[i][j];
    //       if(action.toDocument !== false){
    //         if(!api.documentation.documentation.paths[action.name]){ api.documentation.documentation.paths[action.name] = {} }
    //         api.documentation.documentation.paths[action.name][action.version] = {
    //           name: action.name,
    //           version: action.version,
    //           description: action.description,
    //           inputs: action.inputs,
    //           outputExample: action.outputExample
    //         };
    //       }
    //     }
    //   }
    // }

    build: function(){
      for(var verb in api.routes.routes){
        api.routes.routes[verb].forEach(function(collection){
          var path = api.documentation.documentation.basePath + collection.path;
          var version = api.actions.versions[collection.action][api.actions.versions[collection.action].length - 1];
          var actionTemplate = api.actions.actions[collection.action][version];
          if(api.documentation.documentation.paths[path] === undefined){
            api.documentation.documentation.paths[path] = {};
          }
          api.documentation.documentation.paths[path][verb] = {
            summary: actionTemplate.description,
            description: actionTemplate.description,
            operationId: actionTemplate.name,
            consumes: ['application/json'],
            produces: ['application/json'],
          }
        });
      }
    }

  };
  
  api.documentation.build();
  next();
}

/////////////////////////////////////////////////////////////////////
// exports
exports.documentation = documentation;
