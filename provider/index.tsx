"use client";

import { Toaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "next-ws/client";

function Provider({ children }: React.PropsWithChildren) {
  return (
    <>
      <WebSocketProvider url="ws://localhost:3000/api/socket">
        {children}
      </WebSocketProvider>
      <Toaster richColors position="bottom-center" />
    </>
  );
}

export default Provider;
