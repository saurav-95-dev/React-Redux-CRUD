import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";

export default function Read() {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])
    
    if (loading) {
        return <h2>lOADING</h2>
    }
    return (
        <div className="container my-4">
            <CustomModal/>
            <h2 className="text-center mb-4">All Users</h2>
            <div className="row g-4">
                {users && users.map((ele, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <p className="card-text">Email: {ele.email}</p>
                                <p className="card-text">Age: {ele.age}</p>
                                <p className="card-text">Gender: {ele.gender}</p>
                                <div className="d-flex flex-column gap-2">
                                    <a href="#" className="btn btn-outline-info">View</a>
                                    <a href="#" className="btn btn-outline-warning">Edit</a>
                                    <a href="#" className="btn btn-outline-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}      