import React from "react";

export type TabPosition = "left" | "right" | "top" | "bottom";

export interface ITabItem {
  icon?: React.ReactNode;
  label: string;
  id: string;
  key: string;
  children: React.ReactNode;
}
