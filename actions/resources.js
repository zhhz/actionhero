exports.action = {
  name:                   'resources',
  description:            'documentation: Resources listing',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,

  inputs: {
    required: [],
    optional: [],
  },

  run: function(api, connection, next){    
    connection.response.documentation = api.documentation.documentation;
    next(connection, true);
  }
};