import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile(){

    const params = useParams();
    console.log("Params : ", params);
    const [data   , setData] = useState(null);

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then(data=>data.json()).then(data => setData(data));
    },[])


    console.log(data);

    if(data == null) return <p>Loading....</p>

    return(

        <>
      
        <h1>Your required post</h1>
            
                <h1>{data.title}</h1>
                <h3>{data.body}</h3>
            
          
        
         
        </>

    )

}