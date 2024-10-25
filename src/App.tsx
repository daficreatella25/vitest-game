import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/tanstackquery";
import { Router } from "./router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
