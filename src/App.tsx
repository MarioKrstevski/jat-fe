import JobBuddy from "./JobBuddy";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryClient } from "./global/variables";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <JobBuddy />
        <ReactQueryDevtools
          initialIsOpen
          position="right"
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
