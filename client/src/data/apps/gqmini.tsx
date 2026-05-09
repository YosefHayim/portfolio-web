import { Layers } from "lucide-react";
import { appCatalog } from "./catalog";
import { createAppConfig } from "./catalogBuilder";
import type { AppConfig } from "./types";

const layersFeatureIcon = <Layers className="h-6 w-6" />;

export const gqminiConfig: AppConfig = createAppConfig(
  appCatalog["prompt-queue"],
  {
    logoIcon: <Layers className="h-5 w-5 text-[#0a0a0b]" />,
    featureIcons: appCatalog["prompt-queue"].features.map(
      () => layersFeatureIcon,
    ),
    fallbackFeatureIcon: layersFeatureIcon,
  },
);
