"use client";

// import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    // <ThemeProvider attribute="class">
    <AntdRegistry>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
          <Toaster />
        </PersistGate>
      </Provider>
    </AntdRegistry>
    // </ThemeProvider>
  );
}
