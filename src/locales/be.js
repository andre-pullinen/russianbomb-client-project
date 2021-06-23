export default {
  common: {
    password: {
      text: "Пароль",
      tip:
        "Только латинские символы верхнего и нижнего регистра и как минимум 8 символов"
    },
    password_confirmation: {
      text: "Подтверждение пароля",
      tip: "Это поле должно полностью совпадать с полем Пароля"
    },
    identity: {
      text: "E-mail адресс или логин"
    },
    email: {
      text: "E-mail адресс"
    },
    login: {
      text: "Логин"
    },
    remember: {
      text: "Запомнить меня"
    },
    rules: {
      required: "Требуется.",
      min: "Минимум {0} сим.",
      invalid: "{0} должно быть правильно заполненым."
    }
  },
  login: {
    authRequired: "Требуется авторизация",
    enter: "Вход"
  },
  registration: {
    title: "Регистрация нового аккаунта",
    do: "Зарегистрироваться"
  },

  sidebar: {
    login: "Авторизация",
    logout: "Выход",
    play: "Играть",
    cash: "Пополнить счет",
    home: "Главная страница",
    tasks: "Ежедневные задания",
    events: "Акции и мероприятия",
    settings: "Настройки",
    registration: "Регистрация"
  },
  home: {
    title: "Главная страница"
  },
  settings: {
    title: "Настройки",
    "other-title": "Другие настройки",
    "other-subtitle": "Немного еще разнообразных настроек",
    notification: "Включить уведомления",
    "notification-title": "Уведомления",
    "notification-subtitle": "Настройки системных уведомлений",
    size: "Зафиксировать размер игры",
    meter: "Линейка под экраном с игрой",
    game: {
      title: "Игра",
      subtitle: "Игровые настройки",
      music: "Музыка",
      sound: "Звуки"
    }
  },
  payment: {
    title: "Пополнение",
    purchase: {
      title: "Пополнение игрового счета",
      label: "Сумма",
      method: "Метод оплаты",
      methods: {
        yandex: "ЮMoney",
        payeer: "Payeer"
      },
      pay: "Пополнить"
    },
    transfer: {
      title: "Перевод в игру",
      text: "Ваш баланс: {0} RUB",
      payLabel: "К переводу",
      label: "В игровой валюте",
      pay: "Перевести"
    }
  },

  routes: {
    home: "Главная",
    login: "Авторизация",
    registration: "Регистрация",
    settings: "Настройки",
    payment: "Пополнение"
  }
};
