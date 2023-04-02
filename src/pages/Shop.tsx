import React, {useEffect} from "react";

const Shop = () => {
    useEffect(() => {
        document.title = `Султан`;
    }, []);
    return <div style={{minHeight: "55vh"}}>Главная страница магазина</div>;
};

export default Shop;
