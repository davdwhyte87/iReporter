module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "rules":{
        "linebreak-style": ["error", "windows"],
        "import/newline-after-import":["off"],
        "space-infix-ops":["off"],
        "no-unused-vars":['off'],
        "indent":["off"],
        "prefer-template":["off"],
        "arrow-body-style":["off"],
        "object-curly-newline":["off"],
        "array-callback-return":["off"],
        "consistent-return":["off"],
        "prefer-destructuring": ["off", {
            "array": false,
            "object": true
          }
        ]
    }
};