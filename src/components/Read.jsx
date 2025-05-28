import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser, deleteUser } from '../features/userDetailsSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Avatar, Skeleton, Badge } from '@mui/material';
import { Person, Edit, Delete } from '@mui/icons-material';import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Read() {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genderFilter, setGenderFilter] = useState('All');

  const { users, loading, searchData } = useSelector(state => state.userDetail);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleView = id => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !searchData || user.name.toLowerCase().includes(searchData.toLowerCase());
    const matchesGender = genderFilter === 'All' || user.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  if (loading) {
    return (
      <div className="container my-5">
        <Skeleton variant="text" width={210} height={60} />
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="text" width={210} height={60} />
      </div>
    );
  }

  return (
    <div className="container my-5">
      {isModalOpen && <CustomModal id={selectedUserId} showPopup={isModalOpen} setShowPopup={setIsModalOpen} />}
      <Typography variant="h4" align="center" gutterBottom>
        User Directory
      </Typography>
      <div className="mb-4">
        <Button variant="outlined" onClick={() => setGenderFilter('All')} color={genderFilter === 'All' ? 'primary' : 'default'}>
          All
        </Button>
        <Button variant="outlined" onClick={() => setGenderFilter('Male')} color={genderFilter === 'Male' ? 'primary' : 'default'}>
          Male
        </Button>
        <Button variant="outlined" onClick={() => setGenderFilter('Female')} color={genderFilter === 'Female' ? 'primary' : 'default'}>
          Female
        </Button>
      </div>
      <div className="row g-4">
        {filteredUsers.length === 0 ? (
          <div className="col-12 text-center">
            <Typography variant="h6" color="textSecondary">
              No users found.
            </Typography>
          </div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="col-12 col-sm-6 col-md-4">
              <Card className="h-100">
                <CardContent>
                  <Badge
                    badgeContent={user.gender}
                    color={user.gender === 'Male' ? 'primary' : 'secondary'}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Avatar alt={user.name} src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} />
                  </Badge>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {user.age}
                  </Typography>
                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleView(user.id)}
                      startIcon={<Person />}
                      fullWidth
                    >
                      View
                    </Button>
                    <Link to={`/edit/${user.id}`}>
                      <Button variant="outlined" color="secondary" startIcon={<Edit />} fullWidth>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                      startIcon={<Delete />}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
