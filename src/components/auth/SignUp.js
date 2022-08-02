import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    background: "#1D2938",
    minHeight: "100vh",
    padding: "40px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  formControl: {
    width: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
    borderRadius: 30,
    width: 600,
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

const Home = ({ register }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Fade in={true}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Sign Up</h2>
          <p id="transition-modal-description">
            {isSignUp ? (
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                  organisation_id: "",
                  site_id: "",
                  name: "",
                  role: "manager",
                  phone_number: "+",
                  confirmCode: "",
                }}
                validate={(values) => {
                  let errors = {};

                  const valid_phone_number =
                    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
                  if (
                    values.phone_number.trim() !== "" &&
                    !valid_phone_number.test(values.phone_number)
                  ) {
                    errors.phone_number = "must be number";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await register({
                      email: values.email,
                      username: values.username,
                      password: values.password,
                      site_id: values.site_id,
                      name: values.name,
                      role: values.role,
                      phone_number: values.phone_number,
                      organisation_id: values.organisation_id,
                    });
                    setIsSignUp(false);
                  } catch (err) {
                    console.log(err);
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, errors, handleChange, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2} direction="column">
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
                        <FormControl
                          variant="filled"
                          required
                          className={classes.formControl}
                        >
                          <InputLabel id="organisation_id">
                            Organisation
                          </InputLabel>
                          <Select
                            name="organisation_id"
                            labelId="organisation"
                            onChange={handleChange}
                            value={values.organisation_id}
                            required
                          >
                            <MenuItem value={values.organisation_id}>
                              Organisation
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl
                          variant="filled"
                          required
                          className={classes.formControl}
                        >
                          <InputLabel id="site_id">Site</InputLabel>
                          <Select
                            name="site_id"
                            labelId="site"
                            onChange={handleChange}
                            value={values.site_id}
                            required
                          >
                            <MenuItem value={values.site_id}>Site</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl
                          variant="filled"
                          required
                          className={classes.formControl}
                        >
                          <InputLabel id="role">Role</InputLabel>
                          <Select
                            name="role"
                            labelId="role"
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
                        <TextField
                          name="phone_number"
                          style={{ width: "100%" }}
                          id="filled-basic"
                          label="Phone Number"
                          onChange={handleChange}
                          variant="filled"
                          value={values.phone_number}
                          helperText="e.g. +12015550123"
                          error={errors.phone_number}
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
                          variant="filled"
                          type="password"
                          value={values.password}
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
                            "Sign Up"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container justify="center">
                      <Grid item>
                        <p
                          onClick={() => history.push("/login")}
                          style={{ padding: "0 20px", cursor: "pointer" }}
                        >
                          Login
                        </p>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                onSubmit={async (values, { setSubmitting }) => {
                  setIsSignUp(false);

                  setTimeout(async () => {
                    setSubmitting(false);
                    history.push("/login");
                  }, 500);
                }}
              >
                {({ values, handleChange, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2} direction="column">
                      <Grid item>
                        <TextField
                          name="confirmCode"
                          style={{ width: "100%" }}
                          id="filled-basic"
                          label="Code"
                          onChange={handleChange}
                          variant="filled"
                          type="confirmCode"
                          value={values.confirmCode}
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
                          style={{ width: 240 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <CircularProgress
                              className={classes.loader}
                              size={25}
                              thickness={4}
                            />
                          ) : (
                            "Confirm Sign Up"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            )}
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default connect(null, { register })(Home);
