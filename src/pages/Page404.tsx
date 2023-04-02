import React from "react";
import {CATALOG_ROUTE} from "../utils/consts";

const Page404 = () => {
    return (
        <div>
            <p>ERROR page</p>
            <a href={CATALOG_ROUTE}>Back to catalog</a>
        </div>
    );
};

export default Page404;
