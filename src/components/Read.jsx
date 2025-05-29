import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
<<<<<<< HEAD
import { Link } from 'react-router';
import { deleteUser } from "../features/userDetailsSlice";
import { User, Edit, Trash2, Eye, Users, Filter } from "lucide-react";
=======
import { Link } from "react-router";
>>>>>>> 10ec2f9b2e98e825865098b3c4f5c6bcebcbb00a

export default function Read() {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState("All");

<<<<<<< HEAD
    const [id, setId] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [genderFilter, setGenderFilter] = useState('All');

    const { users, loading, searchData } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(showUser())
    }, [])

    const handleGenderChange = (gender) => {
        setGenderFilter(gender);
    };

    const filteredUsers = users?.filter((user) => {
        // Search filter
        const matchesSearch = searchData.length === 0 || 
            user.name.toLowerCase().includes(searchData.toLowerCase());
        
        // Gender filter
        const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
        
        return matchesSearch && matchesGender;
    }) || [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <h2 className="text-2xl font-semibold text-gray-700">Loading users...</h2>
                    <p className="text-gray-500 mt-2">Please wait while we fetch the data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
            
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage and view all registered users</p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Filter by Gender</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {['All', 'Male', 'Female'].map((gender) => (
                            <label key={gender} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={genderFilter === gender}
                                    onChange={() => handleGenderChange(gender)}
                                    className="sr-only"
                                />
                                <div className={`
                                    px-6 py-3 rounded-full font-medium transition-all duration-200
                                    ${genderFilter === gender 
                                        ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 group-hover:scale-105'
                                    }
                                `}>
                                    {gender}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Users Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold text-blue-600">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''}
                        {genderFilter !== 'All' && ` (${genderFilter})`}
                    </p>
                </div>

                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                <div className="p-6">
                                    {/* User Avatar */}
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4">
                                        <span className="text-white font-bold text-xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* User Info */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="flex items-center justify-center gap-2">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                                {user.email}
                                            </p>
                                            <p className="flex items-center justify-center gap-2">
                                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                                Age: {user.age}
                                            </p>
                                            <p className="flex items-center justify-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}></span>
                                                {user.gender}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => [setId(user.id), setShowPopup(true)]}
                                            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Details
                                        </button>
                                        
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/edit/${user.id}`}
                                                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium text-center"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this user?')) {
                                                        dispatch(deleteUser(user.id));
                                                    }
                                                }}
                                                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
=======
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

    const matchesGender =
      genderFilter === "All" || user.gender === genderFilter;

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

      <h2 className="text-center mb-4 fw-bold">User Directory</h2>

      {/* Gender Filter */}
      <div className="d-flex justify-content-center mb-4 gap-3">
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
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold">{user.name}</h5>
                    <p className="card-text mb-1">
                      <i className="fas fa-envelope me-2"></i>{user.email}
                    </p>
                    <p className="card-text mb-1">
                      <i className="fas fa-user me-2"></i>Age: {user.age}
                    </p>
                    <p className="card-text mb-2">
                      <i className="fas fa-venus-mars me-2"></i>Gender: {user.gender}
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-2 mt-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleView(user.id)}
                    >
                      <i className="fas fa-eye me-2"></i>View
                    </button>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-outline-warning"
                    >
                      <i className="fas fa-edit me-2"></i>Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger"
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
>>>>>>> 10ec2f9b2e98e825865098b3c4f5c6bcebcbb00a
