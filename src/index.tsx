import App from "App/App";


import { createRoot } from 'react-dom/client';

import { store } from "App/ReduxStore/store";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript


import { Provider } from 'react-redux'

root.render(

        <Provider store={store}>
            <App />
        </Provider>,

);

