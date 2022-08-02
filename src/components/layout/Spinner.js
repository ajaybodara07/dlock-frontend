import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    height: 150,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    color: "#1a90ff",
    animationDuration: "550ms",
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loader} size={30} thickness={4} />
    </div>
  );
};

export default Spinner;
