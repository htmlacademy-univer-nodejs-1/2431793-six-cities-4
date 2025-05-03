export const CreateLoginUserMessage = {
  email: {
    invalidFormat:
      'Поле "email" должно содержать корректный адрес электронной почты.',
  },
  password: {
    invalidFormat: 'Пароль обязателен и должен быть строкой.',
  },
} as const;
