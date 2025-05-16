import React, { useEffect } from "react";
import "./CustomModal.css";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const allUsers = useSelector((state) => state.userDetail.users);
  const singleUser = allUsers.find((user) => user.id === id);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowPopup(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setShowPopup]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle background click to close modal
  const handleBackgroundClick = (e) => {
    if (e.target.className === "modal-background") {
      setShowPopup(false);
    }
  };

  if (!singleUser) return null;

  return (
    <div className="modal-background" onClick={handleBackgroundClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">User Profile</h2>
          <button className="modal-close-btn" onClick={() => setShowPopup(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="user-avatar">
            {singleUser.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="user-info">
            <div className="info-group">
              <label>Name</label>
              <p className="info-value">{singleUser.name}</p>
            </div>
            
            <div className="info-group">
              <label>Email</label>
              <p className="info-value">{singleUser.email}</p>
            </div>
            
            <div className="info-row">
              <div className="info-group">
                <label>Age</label>
                <p className="info-value">{singleUser.age}</p>
              </div>
              
              <div className="info-group">
                <label>Gender</label>
                <p className="info-value">{singleUser.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;