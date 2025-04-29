import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams , NavLink } from "react-router-dom";

export default function Home(){
    const params = useParams();
    console.log(params);

    const [post , setPost] = useState([]);


    useEffect(()=>{
       fetch('https://jsonplaceholder.typicode.com/posts')
       .then((data)=>{return data.json()})
       .then((data)=>{return setPost(data)})
    },[])

    return(

        <>
        <h2>This is a small blogging site</h2>
        {
            post.map((post , index)=>{return <NavLink to={`/post/${post.id}`} style={{display : "block"}} key={index}>{post.title}</NavLink>})
        }
        </>

    )

}