import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile(){
    
    const params = useParams();

    console.log("Params" ,params);

    const [data  , setData] = useState([]);

    
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).
        then ((data)=>data.json()).
        then((data)=>{return setData(data)})
    }, [] )

    return(
        <>
        <h1>Your required post</h1>
         <h3>{data.title}</h3>
         <h3>{data.body}</h3>
        </>
    )
}