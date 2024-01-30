import App from "App/App";

import { createRoot } from 'react-dom/client';



const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>


                <App />


            <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

);

