import JobBuddy from "./JobBuddy";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
