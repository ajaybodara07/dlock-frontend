import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RoomIcon from "@material-ui/icons/Room";
import PeopleIcon from "@material-ui/icons/People";
import ViewListIcon from "@material-ui/icons/ViewList";
import StorageIcon from "@material-ui/icons/Storage";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import CircularProgress from "@material-ui/core/CircularProgress";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

// const drawerWidth = 240;
const drawerWidth = "auto";
const appBarHeight = 80;

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
    height: appBarHeight,
  },
  list: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  logo: {
    width: 60,
  },
  logoText: {
    fontSize: 18,
  },
  loader: {
    color: "#1a90ff",
    animationDuration: "550ms",
  },
}));

const Navbar = ({ site: { sites, cabinets, currentSiteID, loading } }) => {
  const history = useHistory();
  const classes = useStyles();

  const [siteExpand, setSiteExpand] = useState(true);
  const [lockerExpand, setLockerExpand] = useState(true);

  const siteExpandHandler = () => {
    setSiteExpand(!siteExpand);
  };

  const lockerExpandHandler = () => {
    setLockerExpand(!lockerExpand);
  };

  return (
    <>
      <div className={clsx(classes.drawerHeader, classes.list)}>
        <img src="/favicon.ico" className={classes.logo} alt="logo" />
        <span style={{ color: "#019AE8" }} className={classes.logoText}>
          MRO-
        </span>
        <span className={classes.logoText}>ELOCKER</span>
      </div>
      <List>
        {/* Dashboard */}
        <ListItem button onClick={() => history.push("/")} key={1}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider style={{ background: "#019AE8" }} />
        {/* Site  */}
        <ListItem
          className={classes.subItem}
          button
          key={2}
          onClick={siteExpandHandler}
        >
          <ListItemIcon>
            <RoomIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Sites" />
          {siteExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* Site Items */}
        <Collapse in={siteExpand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loading ? (
              <ListItem className={classes.nested}>
                <CircularProgress
                  className={classes.loader}
                  size={25}
                  thickness={4}
                  key={3}
                />
              </ListItem>
            ) : (
              sites.map((s) => {
                // const currentSite = window.location.href
                //   .split("/")
                //   .reverse()[0];
                return (
                  <ListItem
                    button
                    key={Math.random()}
                    selected={s.siteID === currentSiteID}
                    className={classes.nested}
                    onClick={() => {
                      history.push(`/sites/${s.siteID}`);
                    }}
                  >
                    <ListItemIcon>
                      <RoomIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={s.siteName} />
                  </ListItem>
                );
              })
            )}
          </List>
        </Collapse>
      </List>
      <List>
        <ListItem button onClick={() => history.push("/users")}>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItem>
        <Divider style={{ background: "#019AE8" }} />
        <ListItem button onClick={() => history.push("/items")}>
          <ListItemIcon>
            <ViewListIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Item List" />
        </ListItem>
        <ListItem button onClick={lockerExpandHandler}>
          <ListItemIcon>
            <StorageIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Lockers" />
          {lockerExpand ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* Site Items */}
        <Collapse in={lockerExpand} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {cabinets[currentSiteID] &&
              cabinets[currentSiteID].map((c) => {
                const currentCabinet = window.location.href
                  .split("/")
                  .reverse()[0];

                return (
                  <ListItem
                    button
                    selected={c.cabinetID === currentCabinet}
                    className={classes.nested}
                    onClick={() => {
                      history.push(`/cabinets/${c.cabinetID}`);
                    }}
                  >
                    <ListItemIcon>
                      <RoomIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={c.cabinetName} />
                  </ListItem>
                );
              })}
          </List>
        </Collapse>
        <ListItem button onClick={() => history.push("/tasks")}>
          <ListItemIcon>
            <FormatListNumberedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={() => history.push("/reports")}>
          <ListItemIcon>
            <AssessmentIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        {/* <ListItem button>
          <ListItemIcon>
            <SearchIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem> */}
      </List>
    </>
  );
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps)(Navbar);
