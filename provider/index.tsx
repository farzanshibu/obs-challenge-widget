"use client";

import React from "react";
import { Toaster } from "../components/ui/sonner";

function Provider({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}

      <Toaster richColors position="bottom-center" />
    </>
  );
}

export default Provider;
