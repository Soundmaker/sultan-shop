import React from 'react';
import Header from "./components/Header/Header";
import {Provider} from "react-redux";
import {store} from "./store";


function App() {
    return (
        <Provider store={store}>
            <Header/>
        </Provider>

    );
}

export default App;
