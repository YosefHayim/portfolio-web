import type { ReactNode } from "react";

export const DEVELOPER_INFO = {
  name: "Yosef Hayim Sabag",
  email: "yosefisabag@gmail.com",
  website: "https://yosefhayimsabag.com",
} as const;

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type AppConfig = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  brandColor: string;
  logoBgColor: string;
  logoIcon: ReactNode;
  chromeStoreUrl?: string;
  features: FeatureItem[];
  privacyPolicy: {
    lastUpdated: string;
    intro: string;
    googleApiDisclosure: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  termsOfService: {
    lastUpdated: string;
    intro: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
};
