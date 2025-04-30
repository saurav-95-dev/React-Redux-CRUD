import React , {useEffect , useState} from "react"
import { NavLink } from "react-router-dom";


export default function Home(){
    
    const [post , setPost] = useState([]);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts").
        then((data)=>{return data.json()}).
        then((data)=>{return setPost(data)
        })
    },[])

    return(
        <>
        <h2>This is home page of site</h2>
        <br />
       
        {
           post ?  post.map((post , index)=>{return <NavLink style={{display : "block"}} key={index} to= {`/post/${post.id}`} >{post.title}</NavLink>}) : <h3>Loading...</h3>
        }

                

        </>
    )
}