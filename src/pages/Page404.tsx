import React from 'react';
import {CATALOG_ROUTE} from "../utils/consts";

const Page404 = () => {
  return (
    <div style={{minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
      <p style={{color: "#ff0000"}}>ERROR page</p>
      <a href={CATALOG_ROUTE}>Back to catalog</a>
    </div>
  );
};

export default Page404 ;
