export default {
  common: {
    password: {
      text: "Password",
      tip:
        "Only latins and at least 8 characters, one digit, one upper case and lower case characters"
    },
    password_confirmation: {
      text: "Password confirmation",
      tip: "The confirmation field must be match to password field"
    },
    identity: {
      text: "E-mail address or username"
    },
    email: {
      text: "E-mail address"
    },
    login: {
      text: "Username"
    },
    remember: {
      text: "Remember me"
    },
    rules: {
      required: "Required.",
      min: "Min {0} characters",
      invalid: "{0} must be valid"
    }
  },
  login: {
    authRequired: "Authorization required",
    enter: "Log In"
  },
  registration: {
    title: "Registering a new account",
    do: "register"
  },

  sidebar: {
    login: "Log In to account",
    logout: "Log Out of account",
    play: "Play",
    cash: "Add cash",
    home: "Go to home",
    tasks: "Everyday tasks",
    events: "Events",
    settings: "Settings",
    registration: "Registration"
  },
  home: {
    title: "Home page"
  },
  settings: {
    title: "Settings",
    "other-title": "Other settings",
    "other-subtitle": "A few more settings for you",
    notification: "Enable notifications",
    "notification-title": "System notifications",
    "notification-subtitle": "Customization the system notifications",
    size: "Fixed game size",
    meter: "A meter line under game window",
    game: {
      title: "Game",
      subtitle: "Game settings",
      music: "Music",
      sound: "Sound"
    }
  },
  payment: {
    title: "Payment",
    purchase: {
      title: "The game wallet refilling",
      label: "A value to purchase",
      method: "Payment methods",
      methods: {
        yandex: "YooMoney",
        payeer: "Payeer eWallet"
      },
      pay: "Go to payment"
    },
    transfer: {
      title: "Payment transfer to game",
      text: "Your balance: {0} RUB",
      payLabel: "To pay",
      label: "In game currency",
      pay: "transfer"
    }
  },

  routes: {
    home: "Home",
    login: "LogIn",
    registration: "Registration",
    settings: "Settings",
    payment: "Payment"
  }
};
