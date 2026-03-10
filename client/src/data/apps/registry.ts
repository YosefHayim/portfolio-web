import type { AppConfig } from "./types";
import { gqminiConfig } from "./gqmini";
import { quickApplyConfig } from "./quickapply";
import { sorqaConfig } from "./sorqa";

export const appRegistry: Record<string, AppConfig> = {
  "prompt-queue": gqminiConfig,
  "quick-apply": quickApplyConfig,
  sorqa: sorqaConfig,
};

export const getAppConfig = (appId: string): AppConfig | undefined => {
  return appRegistry[appId.toLowerCase()];
};

export const getAllAppIds = (): string[] => {
  return Object.keys(appRegistry);
};

export const getAllApps = (): AppConfig[] => {
  return Object.values(appRegistry);
};
