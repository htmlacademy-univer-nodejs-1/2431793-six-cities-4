export const CreateCommentMessages = {
  text: {
    invalidFormat: 'Поле "текст" обязательно и должно быть строкой',
    lengthField:
      'Минимальная длина текста — 5 символов, максимальная — 1024 символа',
  },
  rate: {
    invalidFormat: 'Рейтинг должен быть целым числом',
    min: 'Минимальное значение рейтинга — 1',
    max: 'Максимальное значение рейтинга — 5',
  },
  offerId: {
    invalidFormat: 'Поле offerId должно содержать корректный Mongo ID',
  },
  userId: {
    invalidFormat: 'Поле userId должно содержать корректный Mongo ID',
  },
} as const;
