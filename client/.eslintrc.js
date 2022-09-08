// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
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
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        }
    },
};

