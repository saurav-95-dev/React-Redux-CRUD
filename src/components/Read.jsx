import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";

export default function Read(){ 
    const dispatch = useDispatch();
    const {users , loading} = useSelector((state)=>state.userDetail);

    useEffect(()=>{
       dispatch(showUser())
    },[])
    
    if(loading)
    {
        return <h2>lOADING</h2>
    }
    return(

        <>
         <h2>All data </h2>
         {
            users && users.map((ele)=>{
                return   <div className="card" style={{ width: "18rem" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <p className="card-text">{ele.email}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                </div>
            })
           

         }
        

        </>

    )

}