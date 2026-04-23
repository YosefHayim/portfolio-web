import type { CSSProperties, ComponentType } from "react";

export type TechIconComponent = ComponentType<{
 size?: number;
 style?: CSSProperties;
 className?: string;
}>;

export type NamedTech = {
 name: string;
 icon: TechIconComponent;
};

export type ColoredTech = NamedTech & {
 color: string;
};
