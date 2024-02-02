import JobBuddy from "./JobBuddy";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <JobBuddy />
      </QueryClientProvider>
    </>
  );
}

export default App;
