import React from "react";

export default function MemeCard(props){

    return(
   
        <div className="card"  style={{width : "20rem"}}>
        <img src={props.image}/>
        <div className="card-body">
            <h3>{props.name}</h3>
          <a href="#" className="btn btn-primary">Edit</a>
        </div>
      </div>

    )
}