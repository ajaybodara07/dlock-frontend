import React from "react";
import { connect } from "react-redux";
import MainLayout from "../layout/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "95%",
    margin: "auto",
  },
  listItem: {
    background: "#29394D",
    marginBottom: 2,
    height: 60,
  },
}));

const Profile = ({ auth: { user, loading } }) => {
  const classes = useStyles();

  return loading ? (
    <Spinner />
  ) : (
    <MainLayout title="Profile">
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Welcome {user?.email}
      </Typography>
      <List>
        <ListItem className={classes.listItem} style={{ color: "#9D9D94" }}>
          <Grid container>
            <Grid item md={6} xs={6}>
              <ListItemText primary="Name" />
            </Grid>
            <Grid item md={6} xs={6}>
              <ListItemText primary="Value" />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Name */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Name" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user.name} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Username */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Username" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user.username} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Email */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Email" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user.email} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Role */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Role" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user["custom:role"]} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Email Verified */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Email Verified" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user.email_verified ? "true" : "false"} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Phone Number */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Phone Number" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user.phone_number} />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Organization */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Organization ID" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText
              primary={user["cognito:groups"].filter((g) => g !== "Admin")[0]}
            />
          </Grid>
        </ListItem>
        <ListItem className={classes.listItem}>
          {/* Site */}
          <Grid item md={6} xs={6}>
            <ListItemText primary="Site ID" />
          </Grid>
          <Grid item md={6} xs={6}>
            <ListItemText primary={user["custom:site_id"]} />
          </Grid>
        </ListItem>
      </List>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
