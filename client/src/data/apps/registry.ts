import { gqminiConfig } from "./gqmini";
import { sorqaConfig } from "./sorqa";
import type { AppConfig } from "./types";

export const appRegistry: Record<string, AppConfig> = {
  gqmini: gqminiConfig,
  sorqa: sorqaConfig,
};

export const getAppConfig = (appId: string): AppConfig | undefined => {
  return appRegistry[appId.toLowerCase()];
};

export const getAllAppIds = (): string[] => {
  return Object.keys(appRegistry);
};
