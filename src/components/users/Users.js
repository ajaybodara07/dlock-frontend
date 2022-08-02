import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { listUsers, addUser, editUser, deleteUser } from "../../actions/user";
import MainLayout from "../layout/MainLayout";
import Spinner from "../layout/Spinner";

import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./UsersTable";
import Modal from "../modal/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "95%",
    margin: "auto",
  },
  formControl: {
    width: "100%",
  },
  listItem: {
    background: "#29394D",
  },
  collapseItem: {
    marginTop: theme.spacing(0.5),
  },
  card: {
    background: "#29394D",
    color: "#fff",
    borderRadius: 0,
  },
  button: {
    borderRadius: 30,
    padding: "10px 20px",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
    borderRadius: 30,
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      padding: theme.spacing(10, 10, 10),
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: theme.spacing(10, 5, 10, 5),
    },
  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  loader: {
    color: "#1a90ff",
    animationDuration: "550ms",
  },
}));

const Users = ({
  user: { users, loading },
  site: { sites },
  auth,
  listUsers,
  addUser,
  editUser,
  deleteUser
}) => {
  const classes = useStyles();

  const [assignMemberModal, setAssignMemberModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      listUsers();
    }
    // eslint-disable-next-line
  }, [auth.loading]);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "role",
      numeric: true,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "assignedSiteID",
      numeric: true,
      disablePadding: false,
      label: "Mobile Number",
    },
  ];

  return (
    <MainLayout title="Manage Users">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <Button
            type="submit"
            onClick={() => setAddUserModal(true)}
            className={classes.button}
            variant="contained"
            color="primary"
            style={{ width: 120, marginBottom: 30 }}
          >
            Add User
          </Button> */}
          <Table
            title="manager"
            rows={users.filter((u) => u?.role === "manager") || []}
            headCells={headCells}
            editUser={editUser}
            deleteUser={deleteUser}
            setAssignMemberModal={setAssignMemberModal}
            setAddUserModal={setAddUserModal}
          />
          <Table
            title="clerk"
            rows={users.filter((u) => u?.role === "clerk") || []}
            headCells={headCells}
            editUser={editUser}
            deleteUser={deleteUser}
            setAssignMemberModal={setAssignMemberModal}
          />
          <Table
            title="engineer"
            rows={users.filter((u) => u?.role === "engineer") || []}
            headCells={headCells}
            editUser={editUser}
            deleteUser={deleteUser}
            setAssignMemberModal={setAssignMemberModal}
          />
          <Table
            title="undefined"
            rows={users["undefined"] || []}
            headCells={headCells}
            editUser={editUser}
            deleteUser={deleteUser}
            setAssignMemberModal={setAssignMemberModal}
          />
          {/* {Object.keys(users).map((role) => {
            return (
              <Table
                title={role}
                rows={users[role]}
                headCells={headCells}
                setAssignMemberModal={setAssignMemberModal}
              />
            );
          })} */}
        </>
      )}
      {/* Assign Group User Modal */}
      <Modal
        open={assignMemberModal}
        setOpen={setAssignMemberModal}
        title="Assign Group Member"
      >
        <Formik
          initialValues={{ id: "", aircraftName: "" }}
          onSubmit={(values) => {
            setTimeout(() => {
              console.log("submitted");
              setAssignMemberModal(false);
            }, 500);
            console.log(values);
          }}
        >
          {({ handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="id"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Aircraft ID"
                    onChange={handleChange}
                    variant="filled"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="aircraftName"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Aircraft Name"
                    onChange={handleChange}
                    variant="filled"
                    required
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    onClick={() => setAssignMemberModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ width: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.loader}
                        size={25}
                        thickness={4}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* Add User Modal */}
      <Modal
        modalStyle={{ alignItems: "flex-start" }}
        open={addUserModal}
        setOpen={setAddUserModal}
        title="Add User"
      >
        <Formik
          initialValues={{
            userID: "",
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            siteID: "",
          }}
          validate={(values) => {
            let errors = {};

            const hasSpace = /\s/;
            if (hasSpace.test(values.userID)) {
              errors.userID = "must have no spaces";
            }

            const validPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
            if (
              values.phoneNumber.trim() !== "" &&
              !validPhoneNumber.test(values.phoneNumber)
            ) {
              errors.phoneNumber = "must be number";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            await addUser({
              userID: values.userID,
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
              role: values.role,
              siteID: values.siteID,
            });
            setAddUserModal(false);
          }}
        >
          {({ values, errors, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="userID"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="User ID"
                    onChange={handleChange}
                    variant="filled"
                    helperText="Must be no spaces"
                    error={errors.userID}
                    value={values.userID}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="name"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Name"
                    onChange={handleChange}
                    variant="filled"
                    value={values.name}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="email"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Email"
                    onChange={handleChange}
                    variant="filled"
                    value={values.email}
                    required
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    id="phoneNumber"
                    name="phoneNumber"
                    style={{ width: "100%" }}
                    label="Phone Number"
                    helperText="e.g. +12015550123"
                    variant="filled"
                    error={errors.phoneNumber}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Password"
                    onChange={handleChange}
                    type="password"
                    variant="filled"
                    value={values.password}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="user-role">Role</InputLabel>
                    <Select
                      name="role"
                      labelId="user-role"
                      onChange={handleChange}
                      value={values.role}
                      required
                    >
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="engineer">Engineer</MenuItem>
                      <MenuItem value="clerk">Clerk</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="user-role">Site</InputLabel>
                    <Select
                      name="siteID"
                      labelId="siteID"
                      onChange={handleChange}
                      value={values.siteID}
                      required
                    >
                      {sites.map((s) => (
                        <MenuItem value={s.siteID}>{s.siteName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    onClick={() => setAddUserModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ width: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.loader}
                        size={25}
                        thickness={4}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, { listUsers, addUser, editUser, deleteUser })(
  Users
);
