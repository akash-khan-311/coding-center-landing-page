import { paymentConfig } from "./paymentConfig";


export const paymentMethods = {
  BKASH: {
    name: "bKash",
    number: paymentConfig.bkash.number,
    logo: "https://your-bkash-logo-url.com/bkash.png",
    color: "pink",
    instruction: "bKash Send Money করুন",
  },

  NAGAD: {
    name: "Nagad",
    number: paymentConfig.nagad.number,
    logo: "https://your-nagad-logo-url.com/nagad.png",
    color: "orange",
    instruction: "Nagad Send Money করুন",
  },

  ROCKET: {
    name: "Rocket",
    number: paymentConfig.rocket.number,
    logo: "https://your-rocket-logo-url.com/rocket.png",
    color: "purple",
    instruction: "Rocket Send Money করুন",
  },
} as const;

export type PaymentMethod = keyof typeof paymentMethods;