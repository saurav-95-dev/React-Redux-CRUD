import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../features/userDetailsSlice";

export default function Navbar() {

  const allUsers = useSelector((state)=>state.userDetail.users);
  const [searchData , setSearchData] = useState("");
  console.log(allUsers)
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link">All Posts({allUsers.length})</Link>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" 

             onChange={(e)=>dispatch(searchUser(setSearchData(e.target.value)))}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
