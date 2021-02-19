import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./page/MainPage";
import './scss/style.scss'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage/>
    </QueryClientProvider>
  );
}

export default App;
