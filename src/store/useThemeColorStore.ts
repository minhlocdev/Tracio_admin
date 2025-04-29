import { create } from "zustand";

const getCssVar = (variableName: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};

interface ThemeColorsState {
  colors: Record<string, string>;
  loadColors: () => void;
}

export const useThemeColorStore = create<ThemeColorsState>((set) => ({
  colors: {},
  loadColors: () => {
    const vars = [
      "--radius",
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--destructive",
      "--border",
      "--input",
      "--ring",
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
    ];

    const colors: Record<string, string> = {};

    vars.forEach((v) => {
      colors[v] = getCssVar(v);
    });

    set({ colors });
  },
}));
