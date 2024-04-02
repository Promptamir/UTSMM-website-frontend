let SERVER_URL = 'https://utsmm.liara.run/';

console.log(SERVER_URL);
export const CLIENT = {
  BASE_URL: window.location.origin,
};

export const SERVER = {
  BASE_URL: SERVER_URL,
  API_URL: SERVER_URL + "api/",
  ADMIN_PANEL_API_URL: SERVER_URL + "/api/admin/dashboard/",
};

export const API = {
  BLOGS: {
    GET: SERVER.API_URL + "blogs/",
  },
  FAQS: {
    POST: SERVER.API_URL + "faqs/",
  },
  PLATFORM: {
    GET: SERVER.API_URL + "platforms/",
  },
  COUNTRIES: {
    GET: SERVER.API_URL + "countries/",
  },
  AUTH: {
    LOGIN: SERVER.API_URL + "auth/login",
    SIGNUP: SERVER.API_URL + "auth/register",
  },
  DASHBOARD: {
    QUICK_VIEW: {
      GET: SERVER.API_URL + "user/dashboard/statistics/overview",
    },
    USER_INFO: {
      GET: SERVER.API_URL + "user/dashboard/statistics/user",
    },
    USER_ACTIVE_ORDERS: {
      GET: SERVER.API_URL + "user/dashboard/statistics/user-active-orders",
    },
    USER_SAVED_SERVICES: {
      GET: SERVER.API_URL + "user/dashboard/statistics/saved-services",
    },
    USER_EVENTS: {
      GET: SERVER.API_URL + "user/dashboard/statistics/events",
    },
    USER_PAYMENT_METHODS: {
      GET: SERVER.API_URL + "user/dashboard/add-found/methods",
    },
    USER_PAYMENT_CHECKOUT: {
      POST: SERVER.API_URL + "user/dashboard/add-found/create-checkout",
    },
    USER_ORDERS_HISTORY: {
      GET: SERVER.API_URL + "user/dashboard/order",
    },
    USER_ORDER_SUBMIT: {
      POST: SERVER.API_URL + "user/dashboard/order",
    },
    USER_TICKET_SUBMIT: {
      POST: SERVER.API_URL + "user/dashboard/tickets",
    },
    USER_TICKET_HISTORY: {
      GET: SERVER.API_URL + "user/dashboard/tickets",
    },
    USER_EMAIL_VERIFY: {
      CODE: { GET: SERVER.API_URL + "user/dashboard/email-verify/code" },
      STATUS: { GET: SERVER.API_URL + "user/dashboard/email-verify/status" },
      SUBMIT_CODE: {
        POST: SERVER.API_URL + "user/dashboard/email-verify/submit-code",
      },
    },
    GIFTS: {
      EMAIL: {
        STATUS: {
          GET: SERVER.API_URL + "user/dashboard/gift/email/status",
        },
        CLAIM: {
          POST: SERVER.API_URL + "user/dashboard/gift/email/claim",
        },
      },
      TRSUT_PILOT: {
        STATUS: {
          GET: SERVER.API_URL + "user/dashboard/gift/trust-pilot/status",
        },
        CLAIM: {
          POST: SERVER.API_URL + "user/dashboard/gift/trust-pilot/submit-proof",
        },
      },
      RETWEET: {
        STATUS: {
          GET: SERVER.API_URL + "user/dashboard/gift/retweet/status",
        },
        CLAIM: {
          POST: SERVER.API_URL + "user/dashboard/gift/retweet/submit-proof",
        },
      },
    },
    AFFILIATES: {
      STATUS: {
        GET: SERVER.API_URL + "user/dashboard/affliates",
      },
    },
  },
  ADMIN_DASHBOARD: {
    NEW_ORDERS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/orders/new",
    },
    QUICK_VIEW: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/quick-view",
    },
    ORDER_STATUS: {
      WEEKLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/order-status/weekly",
      },
      MONTHLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/order-status/monthly",
      },
      YEARLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/order-status/yearly",
      },
    },
    ORDERS_COUNTRY: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/orders-country",
    },
    RECENT_CUSTOMERS_ACTIVITY: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/recent-customers-activity",
    },
    POPULAR_PLATFORMS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/popular-platforms",
    },
    TODO_LIST: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/todo-list",
      PUT: SERVER.ADMIN_PANEL_API_URL + "/statistics/todo-list",
      POST: SERVER.ADMIN_PANEL_API_URL + "/statistics/todo-list",
      DELETE: SERVER.ADMIN_PANEL_API_URL + "/statistics/todo-list",
    },
    MESSAGE_ALL: {
      GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/message-all",
      POST: SERVER.ADMIN_PANEL_API_URL + "/statistics/message-all",
      DELETE: SERVER.ADMIN_PANEL_API_URL + "/statistics/message-all",
    },
    ECONOMY_SUMMARY: {
      WEEKLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/economy-summary/weekly",
      },
      MONTHLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/economy-summary/weekly",
      },
      YEARLY: {
        GET: SERVER.ADMIN_PANEL_API_URL + "/statistics/economy-summary/weekly",
      },
    },
    ORDERS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "orders/",
    },
    TICKETS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "tickets/",
      ANSWER: {
        PUT: SERVER.ADMIN_PANEL_API_URL + "tickets/answer/",
      },
      SOLVED: {
        PUT: SERVER.ADMIN_PANEL_API_URL + "tickets/solved/",
      },
    },
    USERS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "users/",
      USER: {
        EDIT_INFO: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "/users/user/edit",
        },
        BLOCK_FREE: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "/users/user/edit/block-free",
        },
        VERIFY: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "/users/user/edit/verify",
        },
      },
    },
    BLOGS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "blogs/",
      POST: SERVER.ADMIN_PANEL_API_URL + "blogs/",
      BLOG: {
        EDIT: { PUT: SERVER.ADMIN_PANEL_API_URL + "blogs/blog/edit" },
        DELETE: { DELETE: SERVER.ADMIN_PANEL_API_URL + "blogs/blog/delete" },
        PUBLISHED: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "blogs/blog/edit/published",
        },
      },
    },
    SELECTED_FAQS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "selected-faqs/",
      POST: SERVER.ADMIN_PANEL_API_URL + "selected-faqs/",
      FAQ: {
        DELETE: SERVER.ADMIN_PANEL_API_URL + "selected-faqs/faq/delete",
        EDIT: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "selected-faqs/faq/edit",
        },
      },
    },
    FAQS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "faqs/",
      FAQ: {
        ANSWERD: {
          CHANGE_ANSWERED: { PUT: SERVER.ADMIN_PANEL_API_URL + "faqs/faq/" },
          EMAIL: { POST: SERVER.ADMIN_PANEL_API_URL + "faqs/faq/answer/email" },
          PHONE: { POST: SERVER.ADMIN_PANEL_API_URL + "faqs/faq/answer/phone" },
        },
      },
    },
    CONTACT_US: {
      GET: SERVER.ADMIN_PANEL_API_URL + "contact-us/",
      ANSWERD: {
        CHANGE_ANSWERED: {
          PUT: SERVER.ADMIN_PANEL_API_URL + "contact-us/record/answerd",
        },
        EMAIL: {
          POST: SERVER.ADMIN_PANEL_API_URL + "contact-us/record/answer/email",
        },
        PHONE: {
          POST: SERVER.ADMIN_PANEL_API_URL + "contact-us/record/answer/phone",
        },
      },
    },
    SERVICES: {
      GET: SERVER.ADMIN_PANEL_API_URL + "services",
    },
    PLATFORMS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "platforms",
      POST: SERVER.ADMIN_PANEL_API_URL + "platforms",
      DELETE: SERVER.ADMIN_PANEL_API_URL + "platforms",
      PUT: SERVER.ADMIN_PANEL_API_URL + "platforms",
    },
    METHODS: {
      GET: SERVER.ADMIN_PANEL_API_URL + "payment-methods",
      POST: SERVER.ADMIN_PANEL_API_URL + "payment-methods",
    },
  },
  PUBLIC: {
    SERVICES: {
      GET: SERVER.API_URL + "services",
    },
    CONTACT_US: {
      POST: SERVER.API_URL + "contact-us/",
    },
    FAQS: {
      GET: SERVER.API_URL + "faqs",
    },
    BLOGS: {
      GET: SERVER.API_URL + "blogs",
      BLOG: {
        GET: SERVER.API_URL + "blogs/blog/",
        LIKE: {
          PUT: SERVER.API_URL + "blogs/blog/like/",
        },
      },
    },
    SERVICES: {
      GET: SERVER.API_URL + "services",
      POPULAR: {
        GET: SERVER.API_URL + "services/popular-services",
      },
    },
    PLATFORMS: {
      GET: SERVER.API_URL + "platforms",
    },
  },
};
