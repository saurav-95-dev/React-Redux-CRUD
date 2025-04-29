import React from "react";
import { useParams } from "react-router-dom";

export default function Home(){
    const params = useParams();
    console.log(params);

    return(

        <>
        <h2>This is my home page</h2>
        <h3>You name is : {params.userId}</h3>
        </>

    )

}