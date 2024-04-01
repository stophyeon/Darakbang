"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import {NextUIProvider} from "@nextui-org/react";

function Providers({ children }) {
  const [client] = React.useState(new QueryClient());

  return (
    <NextUIProvider>
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {children}
        </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </NextUIProvider>
  );
}

export default Providers;