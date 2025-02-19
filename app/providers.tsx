"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <AntdRegistry>{children}</AntdRegistry>
    </ThemeProvider>
  );
}
