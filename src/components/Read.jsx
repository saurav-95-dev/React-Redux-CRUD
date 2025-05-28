import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router";

export default function Read() {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState("All");

  const { users, loading, searchData } = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleView = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      searchData.length === 0 ||
      user.name.toLowerCase().includes(searchData.toLowerCase());
    const matchesGender = genderFilter === "All" || user.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  if (loading) {
    return <h2 className="text-center my-5">Loading users, please wait...</h2>;
  }

  return (
    <div className="container my-5">
      {isModalOpen && (
        <CustomModal
          id={selectedUserId}
          showPopup={isModalOpen}
          setShowPopup={setIsModalOpen}
        />
      )}

      <div className="text-center mb-4">
        <h2 className="fw-bold">User Directory</h2>
        <p className="text-muted">Manage and explore all registered users</p>
      </div>

      {/* Gender Filter */}
      <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
        {["All", "Male", "Female"].map((gender) => (
          <div className="form-check form-check-inline" key={gender}>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id={`gender-${gender.toLowerCase()}`}
              value={gender}
              checked={genderFilter === gender}
              onChange={(e) => setGenderFilter(e.target.value)}
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

      {/* Users Grid */}
      <div className="row g-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center w-100">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No users found"
              width={120}
              className="mb-3"
            />
            <p className="text-muted">No users found. Try changing your filter or search.</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow border-0 rounded-4 p-2 user-card position-relative">
                {/* Avatar + Badge */}
                <div className="position-absolute top-0 end-0 m-2">
                  <span
                    className={`badge ${
                      user.gender === "Male" ? "bg-primary" : "bg-pink"
                    }`}
                  >
                    {user.gender}
                  </span>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="text-center mb-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt="Avatar"
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                    />
                    <h5 className="fw-semibold">{user.name}</h5>
                    <p className="text-muted small">{user.email}</p>
                  </div>
                  <div className="text-center mb-2">
                    <p className="mb-1">
                      <i className="fas fa-user me-2 text-secondary"></i>Age:{" "}
                      <span className="fw-semibold">{user.age}</span>
                    </p>
                  </div>
                  <div className="d-flex flex-column gap-2 mt-2">
                    <button
                      className="btn btn-outline-primary transition"
                      onClick={() => handleView(user.id)}
                    >
                      <i className="fas fa-eye me-2"></i>View
                    </button>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-outline-warning transition"
                    >
                      <i className="fas fa-edit me-2"></i>Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger transition"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="fas fa-trash me-2"></i>Delete
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
