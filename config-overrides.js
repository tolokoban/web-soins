const rewireYAML = require( 'react-app-rewire-yaml' );

module.exports = function override( config, env ) {
    console.log(JSON.stringify(config, null, '  '))
    // Allow YAML import at compile time.
    config = rewireYAML( config, env );
    return config;
}
