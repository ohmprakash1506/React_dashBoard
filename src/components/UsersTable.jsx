import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//slice
import {
  fetchUsers,
  setPage,
  setRowsPerPage,
  openModal,
  closeModal,
  setFormValue,
  createUser,
  deleteUser,
  editUser,
} from "../redux/userSlice";

//matireal UI
import {
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";

const UsersTable = () => {
  const dispatch = useDispatch();
  const {
    list: users,
    status,
    error,
    page,
    rows,
    open,
    formValue,
    edit,
  } = useSelector((state) => state.users);

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal(false));
  };

  const handleChangeForm = (field, value) => {
    dispatch(setFormValue({ field, value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Alert severity="error">{error}</Alert>;
  }

  const handleSubmit = () => {
    if (edit) {
      dispatch(editUser());
    } else {
      dispatch(createUser());
    }
  };

  const paginatedUsers = users.slice(page * rows, page * rows + rows);

  return (
    <div>
     <div>
     <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add User
      </Button>
     </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for number of rows per page
        component="div"
        count={users.length} // Total number of rows
        rowsPerPage={rows}
        page={page}
        onPageChange={handleChangePage} // Update the page when changed
        onRowsPerPageChange={handleChangeRowsPerPage} // Update rows per page when changed
      />

      {/* Modal for Add/Edit User */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{edit ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={formValue.name}
            onChange={(e) => handleChangeForm("name", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formValue.email}
            onChange={(e) => handleChangeForm("email", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {edit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;
