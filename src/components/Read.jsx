import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from 'react-router';
import { deleteUser } from "../features/userDetailsSlice";

export default function Read() {
    const dispatch = useDispatch();

    const [id , setId] = useState();
    const [showPopup , setShowPopup] = useState(false)

    const { users, loading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])
    
    if (loading) {
        return <h2>Please wait while we are loading...</h2>
    }
    return (
        <div className="container my-4">
          { showPopup &&  <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup}/>}
            <h2 className="text-center mb-4">All Users</h2>
            <div className="row g-4">
                {users && users.map((ele, index) => (
                    <div key={ele.id} className="col-12 col-sm-6 col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <p className="card-text">Email: {ele.email}</p>
                                <p className="card-text">Age: {ele.age}</p>
                                <p className="card-text">Gender: {ele.gender}</p>
                                <div className="d-flex flex-column gap-2">
                                    <button href="#" className="btn btn-outline-info" onClick={()=>[setId(ele.id) , setShowPopup(true)]}>View</button>
                                    <Link to={`/edit/${ele.id}`} href="#" className="btn btn-outline-warning">Edit</Link>
                                    <Link onClick={()=>{dispatch(deleteUser(ele.id))}} className="btn btn-outline-danger">Delete</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}      