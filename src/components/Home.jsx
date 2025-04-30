import React  , {useEffect, useState} from "react";
import MemeCard from "./Card";
import { getAllMemes } from "../api/meme";

export default function Home(){
    
    const [data , setData] = useState([]);

    useEffect(()=>{
       getAllMemes().then((memes)=>{return setData(memes.data.memes)})
    },[]);


    return(
        <>
          <div className="row">
          {
            data.map((el , index)=>{
                return <MemeCard image = {el.url} name = {el.name}/>
            })
        }
          </div>
        </>
    )
}