import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Edit(){

    const [params] = useSearchParams();
    console.log(params.get("url"));
    

    return(

        <>
         <img src={params.get("url")} alt="Unable to load image" width="250px" />
        </>

    )

}