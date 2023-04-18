import React from 'react';
import AppRouter from './components/AppRouter';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


function App() {
    return (
        <>
            <Header/>
            <AppRouter/>
            <Footer/>
        </>
    );
}

export default App;
