module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            "tab",
            { "SwitchCase": 1 }
        ],
        "no-tabs": 0,
        // "linebreak-style": [
        //     "error",
        //     "windows"
        // ],
        "quotes": [
            "error",
            "single"
        ],
        "import/no-duplicates": [0],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-indent": ["error", 'tab'],
        // "react/jsx-indent": 0
    },
    "extends": ["standard", "standard-react"],
    "plugins": ["react"]
};