module.exports = [
    {
      ignores: ["ist",
        "coverage",
        "doc"],  // Заменяет .eslintignore
    },
    {
      files: ['src/*.js'],
      rules: {
        // Здесь ваши правила
        'no-unused-vars': 'error',
        'semi': ['error', 'always'],
      },
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
  ];