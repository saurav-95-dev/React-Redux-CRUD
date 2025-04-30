import React from "react";
import { useNavigate } from "react-router-dom";

export default function MemeCard(props){

    const navigate  = useNavigate();

    return(
   
        <div className="card"  style={{width : "20rem" , margin :"25px"}}>
        <img src={props.image}/>
        <div className="card-body">
            <h3>{props.name}</h3>
          <button onClick={(e)=>{navigate(`/edit?url=${props.image}`)}}   href="#" className="btn btn-primary">Edit</button>
        </div>
      </div>

    )
}