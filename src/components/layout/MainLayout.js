import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";
import { listSites } from "../../actions/site";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { useWindow } from "../../hooks/";

import Navbar from "./Navbar";
import Spinner from "./Spinner";

const MainLayout = ({
  auth: { user, loading: authLoading },
  site: { loading },
  listSites,
  logout,
  title,
  children,
}) => {
  const history = useHistory();
  const [width] = useWindow();
  const mobile = width < 992;

  const drawerWidth = mobile ? 0 : 260;
  const appBarHeight = 80;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      minWidth: 340,
      height: appBarHeight,
      justifyContent: "center",
      background: "#1177C0",
      transition: mobile
        ? {}
        : theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: mobile
        ? {}
        : theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
    },
    auth: {
      cursor: "pointer",
    },
    authText: {
      fontSize: 16,
      width: "100%",
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#1D2938",
      color: "#fff",
      scrollbarWidth: "thin",
    },
    swipableDrawerPaper: {
      width: 260,
      background: "#1D2938",
      color: "#fff",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
      height: appBarHeight,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: mobile
        ? theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
        : {},
      marginLeft: -drawerWidth,
      background: "#253344",
      color: "#fff",
      minHeight: "100vh",
      [theme.breakpoints.up("xs")]: mobile
        ? {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }
        : {},
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    loaderContainer: {
      background: "#1D2938",
      height: "100vh",
      display: "flex",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(mobile ? false : true);
  const [swipeableOpen, setSwipeableOpen] = React.useState({
    left: false,
  });

  const handleDrawerOpen = () => {
    if (mobile) setSwipeableOpen({ left: !swipeableOpen.left });
    else setOpen(!open);
  };

  const handleDrawerClose = () => {
    if (mobile) setSwipeableOpen({ left: false });
    else setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSwipeableOpen({ left: open });
  };

  useEffect(() => {
    if (!authLoading) {
      console.log("list sites kkkk");
      listSites();
    }
    // eslint-disable-next-line
  }, [authLoading]);

  return loading ? (
    <div className={classes.loaderContainer}>
      <Spinner />
    </div>
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  {title}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              onClick={() => history.push("/profile")}
              className={classes.auth}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="flex-end"
                  >
                    <Typography
                      className={classes.authText}
                      variant="span"
                      noWrap
                    >
                      {user?.name}
                    </Typography>
                    <Typography
                      className={classes.authText}
                      variant="span"
                      style={{ color: "#7BB4DC" }}
                      noWrap
                    >
                      <span style={{ textTransform: "capitalize" }}>
                        {user && user["custom:role"]} |{" "}
                        {user &&
                          user["cognito:groups"]
                            .filter((g) => g !== "Admin")[0]
                            .split("_")
                            .join(" ")}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <PlayArrowIcon
                    onClick={logout}
                    style={{
                      fontSize: 28,
                      transform: "rotate(90deg)",
                      height: 40,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Mobile */}
      <SwipeableDrawer
        anochor={"left"}
        open={swipeableOpen["left"]}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{
          paper: classes.swipableDrawerPaper,
        }}
      >
        <Navbar handleDrawerClose={handleDrawerClose} />
      </SwipeableDrawer>
      {/* Drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Navbar handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, { logout, listSites })(MainLayout);
