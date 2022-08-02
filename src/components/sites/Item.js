import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "95%",
    margin: "auto",
  },
  listItem: {
    background: "#29394D",
  },
}));

const Item = () => {
  const classes = useStyles();

  return (
    <List>
      <ListItem className={classes.listItem} button>
        <Grid container>
          <Grid item md={4} xs={6}>
            <ListItemText primary="Learjet 35" />
          </Grid>
          <Grid item md={4} xs={6}>
            <ListItemText primary="Learjet 35" />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <EditIcon style={{ color: "#fff" }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default Item;
