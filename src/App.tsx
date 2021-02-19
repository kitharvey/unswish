import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./page/MainPage";
import './scss/style.scss'
import { DiGithubBadge } from 'react-icons/di';

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
      <div className='heading container' >
          <a href='/' ><h1>Unswish.</h1></a>
          <a href='https://github.com/kitharvey/unswish/' target='_blank'  rel="noreferrer" ><DiGithubBadge/></a>
      </div>
      <MainPage/>
    </QueryClientProvider>
  );
}

export default App;
