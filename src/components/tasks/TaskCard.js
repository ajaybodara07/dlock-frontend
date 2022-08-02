import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

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

const UserCard = ({ title, setAssignMemberModal }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.card} spacing={2}>
      <Grid item>
        <Typography style={{ textTransform: "capitalize" }} variant="h5">
          {title === "undefined" ? "Unassigned" : title}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => setAssignMemberModal(true)}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Add Group Member
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCard;
