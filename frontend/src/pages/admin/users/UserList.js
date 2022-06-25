import React, { Fragment, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import Page from "../../../components/Page";
import { Link as RouterLink } from "react-router-dom";
import { Stack, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllUsers,
  deleteUser,
} from "../../../actions/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import { DELETE_USER_RESET } from "../../../constants/userConstants";
import { styled } from "@mui/material/styles";
import { Box, OutlinedInput, InputAdornment } from "@mui/material";
import searchFill from "@iconify/icons-eva/search-fill";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));
const UserList = () => {
  const dispatch = useDispatch();
  const [name, setKeyword] = useState("");

  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure to delete this User?")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, isDeleted, deleteError]);

  const columns = [
    { field: "index", headerName: "#No", minWidth: 100, flex: 0.5 },
    { field: "id", headerName: "User ID", minWidth: 300, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 90,
      flex: 0.5,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              to={`/dashboard/users/user/${params.getValue(params.id, "id")}`}
            >
              <Icon
                icon="clarity:edit-solid"
                color="blue"
                width="22"
                height="22"
              />
            </Link>
            <Button>
              <Icon
                onClick={() =>
                  deleteUserHandler(params.getValue(params.id, "id"))
                }
                icon="fluent:delete-24-filled"
                color="red"
                width="25"
                height="25"
              />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const [value, setValue] = React.useState("");
  console.log(value);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const rows = [];

  users &&
    users
      .filter(
        (filteredUsers) =>
          filteredUsers.name.includes(name) &&
          filteredUsers.role.includes(value)
      )
      .map((item, index) => {
        rows.push({
          index: index + 1,
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          phoneNumber: item.phoneNumber,
        });
        return 1;
      });

  return (
    <Fragment>
      <Page title={`ALL USER'S - Admin`}>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h4" gutterBottom>
              All Users
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/users/newUser"
              startIcon={<Icon icon={plusFill} />}
            >
              Add User
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <SearchStyle
              backgroundColor="black"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search product..."
              startAdornment={
                <InputAdornment position="end">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                <Typography> Roles</Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="Stock Manager"
                  control={<Radio />}
                  label="Stock Manager"
                />
                <FormControlLabel
                  value="Staff"
                  control={<Radio />}
                  label="Staff"
                />
                <FormControlLabel
                  value="Faculty"
                  control={<Radio />}
                  label="Faculty"
                />
                <FormControlLabel
                  value="Vendor"
                  control={<Radio />}
                  label="Vendor"
                />
                <FormControlLabel
                  value="Student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel value="" control={<Radio />} label="Reset" />
              </RadioGroup>
            </FormControl>
          </Stack>

          <br />

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={13}
            disableSelectionOnClick
            // className="productListTable"
            autoHeight
            sx={{
              m: 1,
              boxShadow: 2,
            }}
          />
        </Container>
      </Page>
    </Fragment>
  );
};

export default UserList;
