import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router";

export default function Read() {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, loading, searchData } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleViewClick = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users?.filter((user) =>
    searchData.length === 0
      ? true
      : user.name.toLowerCase().includes(searchData.toLowerCase())
  );

  if (loading) {
    return <h2 className="text-center my-5">Loading users, please wait...</h2>;
  }

  return (
    <div className="container my-4">
      {isModalOpen && (
        <CustomModal
          id={selectedUserId}
          showPopup={isModalOpen}
          setShowPopup={setIsModalOpen}
        />
      )}

      <h2 className="text-center mb-4">All Users</h2>

      <div className="mb-4 d-flex gap-3 justify-content-center">
        {["All", "Male", "Female"].map((gender) => (
          <div className="form-check form-check-inline" key={gender}>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id={`gender-${gender.toLowerCase()}`}
              value={gender}
            />
            <label
              className="form-check-label"
              htmlFor={`gender-${gender.toLowerCase()}`}
            >
              {gender}
            </label>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center">
            <p>No users found matching your search.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Age: {user.age}</p>
                    <p className="card-text">Gender: {user.gender}</p>
                  </div>
                  <div className="d-flex flex-column gap-2 mt-3">
                    <button
                      className="btn btn-outline-info"
                      onClick={() => handleViewClick(user.id)}
                    >
                      View
                    </button>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
