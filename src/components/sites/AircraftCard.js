import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
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

const UserCard = ({ setAddAircraftModal }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.card} spacing={2}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <LocalAirportIcon
              style={{ transform: "rotate(45deg)", marginTop: 3 }}
              color="primary"
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Aircraft Available at Site</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              onClick={() => setAddAircraftModal(true)}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Add Aircraft
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserCard;
