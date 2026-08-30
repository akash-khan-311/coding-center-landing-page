import { paymentConfig } from "./paymentConfig";

export const paymentMethods = {
  BKASH: {
    name: "bKash",
    number: paymentConfig.bkash.number,
    logo: "https://res.cloudinary.com/dtvnmf35l/image/upload/v1787682667/bKash-Logo_z3hkbu.png",
    color: "pink",
    instruction: "bKash Send Money করুন",
  },

  NAGAD: {
    name: "Nagad",
    number: paymentConfig.nagad.number,
    logo: "https://res.cloudinary.com/dtvnmf35l/image/upload/v1787682667/1679248828Nagad-Logo-PNG_j34cws.png",
    color: "orange",
    instruction: "Nagad Send Money করুন",
  },

  ROCKET: {
    name: "Rocket",
    number: paymentConfig.rocket.number,
    logo: "https://res.cloudinary.com/dtvnmf35l/image/upload/v1788111244/rocket_bmqtvi.webp",
    color: "purple",
    instruction: "Rocket Send Money করুন",
  },
} as const;

export type PaymentMethod = keyof typeof paymentMethods;
