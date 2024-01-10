import App from "App/App";

import { createRoot } from 'react-dom/client';

import { store } from "App/ReduxStore/store";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript


import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>

            <Provider store={store}>
                <App />
            </Provider>,

            <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

);

