import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 30,
    padding: "10px 20px",
  },
  card: {
    padding: theme.spacing(1, 2, 0, 2),
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

const UserCard = ({ title, setAssignMemberModal,setAddUserModal }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.card} spacing={2}>
      <Grid item>
        <Typography style={{ textTransform: "capitalize" }} variant="h5">
          {title === "undefined" ? "Unassigned" : title}
        </Typography>
      </Grid>
    {setAddUserModal &&  <Grid item>
        <Button
          onClick={() => setAddUserModal(true)}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Add User
        </Button>
      </Grid>}
    </Grid>
  );
};

export default UserCard;
