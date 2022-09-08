// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
		"standard",
    // Airbnb style guide 적용
		"airbnb",
		"airbnb/hooks",
    // TypeScript ESLint recommanded style 적용
    "plugin:@typescript-eslint/eslint-recommended"
  ],
    rules: {
        indent: ['error', 4],
				'no-console':process.env.NODE_ENV==='production'?'error':'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                json: 'never',
            },
        ],
				"semi": [
					"error",
					"always"
				],
				"no-trailing-spaces": 0,
        "keyword-spacing": 0,
        "no-unused-vars": 1,
        "no-multiple-empty-lines": 0,
        "space-before-function-paren": 0,
        "eol-last": 0
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        }
    },
};

