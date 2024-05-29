import { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ConfirmationPrompt from './DeleteConfirm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserForm from './EditUserForm';
import { connect } from 'react-redux';

import databaseURL from 'database_url';
import Header from 'components/Header';

const Users = ({ access_token }) => {
  const [isPromptOpen, setPromptOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [refresher, setRefresher] = useState(1);

  // ------------------------------------------------------------------------------------------------
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [users, setUsers] = useState([]);

  // on load useEffect------------------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchUsers() {
      try {
        if (!access_token) {
          console.error('No token found in local storage.');
          return;
        }
        const response = await fetch(`${databaseURL}/api/users/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        console.log('Fetch response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error while fetching users:', error);
      }
    }

    fetchUsers();
  }, [refresher]);

  // Edit Form------------------------------------------------------------------------------------------------
  const handleOpenEditForm = (userId) => {
    console.log('Opening edit form for user ID:', userId);
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUserForEdit(userToEdit);
    setRefresher(refresher + 1);
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setSelectedUserForEdit(null);
    setRefresher(refresher + 1);
    setEditFormOpen(false);
  };

  const handleSaveEditForm = (editedUser) => {
    // Perform the update API call here and handle the response
    console.log('Saving edited user:', editedUser);
    setRefresher(refresher + 1);
    handleCloseEditForm();
  };

  const handleOpenPrompt = (userId) => {
    setSelectedUserId(userId);
    setPromptOpen(true);
  };

  const handleClosePrompt = () => {
    setSelectedUserId(null);
    setPromptOpen(false);
  };

  // Disable User ------------------------------------------------------------------------------------------------
  const handleDisableUser = async (userId) => {
    try {
      if (!access_token) {
        console.error('No token found in local storage.');
        return;
      }

      const response = await fetch(`${databaseURL}/users/${userId}/disable/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetch(`${databaseURL}/auth/users/me/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            const auditCreatePayload = {
              user: data.first_name + ' ' + data.last_name,
              action: 'Disabled a User'
            };
            fetch(`${databaseURL}/audit/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(auditCreatePayload)
            })
              .then((auditResponse) => auditResponse.json())
              .then((auditData) => {
                console.log('Audit creation response:', auditData);
              })
              .catch((auditError) => {
                console.error('Error creating audit:', auditError);
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
        toast.warning('Account has been DEACTIVATED!');
        setRefresher(refresher + 1);
      } else {
        console.error('Failed to disable user.');
      }
    } catch (error) {
      console.error('Error while disabling user:', error);
    }
  };

  // Enable User ------------------------------------------------------------------------------------------------
  const handleEnableUser = async (userId) => {
    try {
      if (!access_token) {
        console.error('No token found in local storage.');
        return;
      }

      const response = await fetch(`${databaseURL}/users/${userId}/enable/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        fetch(`${databaseURL}/auth/users/me/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            const auditCreatePayload = {
              user: data.first_name + ' ' + data.last_name,
              action: 'Enabled a user'
            };
            fetch(`${databaseURL}/audit/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(auditCreatePayload)
            })
              .then((auditResponse) => auditResponse.json())
              .then((auditData) => {
                console.log('Audit creation response:', auditData);
              })
              .catch((auditError) => {
                console.error('Error creating audit:', auditError);
              });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
        toast.warning('Account has been ACTIVATED!');

        setRefresher(refresher + 1);
      } else {
        console.error('Failed to enable user. Status:', response.status);
        const data = await response.json();
        console.error('Error details:', data);
      }
    } catch (error) {
      console.error('Error while enabling user:', error);
    }
  };

  const columns = [
    {
      field: 'first_name',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'barangay',
      headerName: 'Barangay',
      flex: 1,
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'phone_number',
      headerName: 'Phone No.',
      flex: 1,
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => (
        <Typography
          variant="body1"
          // align="center" // Align text to the center
          style={{
            color: row?.is_disabled ? '#832f2c' : '#2e7c67',
            display: 'flex',
            alignItems: 'center' // Center vertically
            // justifyContent: 'center' // Center horizontally
          }}
        >
          {row?.is_disabled ? 'Disabled' : 'Active'}
        </Typography>
      ),
      headerClassName: 'MuiDataGrid-columnHeaders'
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => handleOpenPrompt(row.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenPrompt(row.id);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <IconButton color={row.is_disabled ? 'secondary' : 'warning'} aria-label={row.is_disabled ? 'enable user' : 'disable user'}>
            {row.is_disabled ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
          </IconButton>
          <Typography variant="body2">{row.is_disabled ? 'Activate' : 'Deactivate '}</Typography>
        </div>
      ),
      headerClassName: 'MuiDataGrid-columnHeaders'
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      flex: 1,
      renderCell: ({ row }) => (
        <div
          style={{
            display: 'flex',
            // alignItems: 'center',
            cursor: 'pointer'
            // justifyContent: 'center'
          }}
          onClick={() => handleOpenEditForm(row.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenEditForm(row.id);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <Typography variant="body1" style={{ color: 'green' }}>
            Edit
          </Typography>
        </div>
      ),
      headerClassName: 'MuiDataGrid-columnHeaders'
    }
  ];

  return (
    <Box m="20px">
      <Header title="Registered System Users" />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: '#2e7c67'
          },

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#a4a9fc',
            borderBottom: 'none'
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: '#f2f0f0'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#a4a9fc'
          },
          '& .MuiCheckbox-root': {
            color: `#1e5245 !important`
          }
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>

      <ConfirmationPrompt
        open={isPromptOpen}
        onClose={handleClosePrompt}
        onConfirm={() => {
          if (selectedUserId !== null) {
            const selectedUser = users.find((user) => user.id === selectedUserId);
            if (selectedUser) {
              selectedUser.is_disabled ? handleEnableUser(selectedUserId) : handleDisableUser(selectedUserId);
              handleClosePrompt();
            }
          }
        }}
        message={
          selectedUserId !== null
            ? users.find((user) => user.id === selectedUserId).is_disabled
              ? 'Are you sure you want to enable this user?'
              : 'Are you sure you want to disable this user?'
            : ''
        }
      />

      {/* Add EditUserForm component */}
      <EditUserForm open={isEditFormOpen} onClose={handleCloseEditForm} onSave={handleSaveEditForm} user={selectedUserForEdit} />

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  access_token: state.auth.access
});

export default connect(mapStateToProps, {})(Users);
