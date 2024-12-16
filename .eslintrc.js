// example .eslintrc.js 
module.exports = {
    // config 파일을 해당 package의 상위로 더 이상 찾지 않고 해당 config 파일을 적용
    root: true,
    // 전역 객체 접근을 위한 설정
    env: {
      browser: true,
      node: true,
    },
    // 사용하는 ESLint 관련 플러그인을 명시
    // 실제로 extends나 rule에 플러그인 내용을 명시해야 동작함
    plugins: ['@typescript-eslint'],
    // recommended을 사용할 경우 해당 플러그인에서 기본적으로 셋팅된 rule 적용
    // all 사용할 경우 해당 플러그인의 모든 rule 적용
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      // eslint-config-prettier 사용을 위해 추가
      'prettier',
    ],
    // ESLint에 사용할 parser 지정
    parser: '@typescript-eslint/parser',
    // ESLint 사용 지원을 하려는 자바스크립트 옵션 추가
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    // Lint 규칙 설정
    rules: {
      // 
      // example. no-unused-vars 사용하지 않는 변수가 있을 경우 error 표출
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        2,
        {
          allowString: false,
          allowNumber: false,
        },
      ],
    },
    // Lint 적용이 필요 없는 파일
    ignorePatterns: ['src/**/*.test.ts', 'src/**/*.d.ts'],
  };
