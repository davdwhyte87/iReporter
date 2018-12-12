module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "rules":{
        "valid-jsdoc": ["error", {
            "requireReturn": true,
            "requireReturnType": true,
            "requireParamDescription": false,
            "requireReturnDescription": true
          }],
          "require-jsdoc": ["error", {
              "require": {
                  "FunctionDeclaration": true,
                  "MethodDefinition": true,
                  "ClassDeclaration": true
              }
          }],
        "linebreak-style": ["error", "windows"],
        "consistent-return":["off"],
        "prefer-template": ["off"],
        "class-methods-use-this": ["off"]
    }
};
