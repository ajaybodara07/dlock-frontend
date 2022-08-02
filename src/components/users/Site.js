import React, { useState } from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
  list: {},
  nested: {
    width: "95%",
    margin: "auto",
  },
  listItem: {
    background: "#29394D",
  },
  collapseItem: {
    marginTop: theme.spacing(0.5),
  },
}));

const Site = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [siteExpand, setSiteExpand] = useState(true);

  const siteExpandHandler = () => {
    setSiteExpand(!siteExpand);
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem} button onClick={siteExpandHandler}>
        <ListItemText primary="Learjet 35" />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <EditIcon style={{ color: "#fff" }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={siteExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            className={clsx(
              classes.collapseItem,
              classes.nested,
              classes.listItem
            )}
          >
            <ListItemText primary={`Line item ${1}`} />
            <ListItemSecondaryAction>
              <IconButton style={{ marginRight: theme.spacing(2) }}>
                <EditIcon style={{ color: "#fff" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            className={clsx(
              classes.collapseItem,
              classes.nested,
              classes.listItem
            )}
          >
            <ListItemText primary={`Line item ${2}`} />
            <ListItemSecondaryAction>
              <IconButton style={{ marginRight: theme.spacing(2) }}>
                <EditIcon style={{ color: "#fff" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            className={clsx(
              classes.collapseItem,
              classes.nested,
              classes.listItem
            )}
          >
            <ListItemText primary={`Line item ${3}`} />
            <ListItemSecondaryAction>
              <IconButton style={{ marginRight: theme.spacing(2) }}>
                <EditIcon style={{ color: "#fff" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default Site;
