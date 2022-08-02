import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import RoomIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { getSiteStats } from "../../actions/site";
import Spinner from "../layout/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 0,
  },
  stats: {
    margin: 25,
    marginTop: 10,
    background: "#253344",
    borderRadius: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
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

const SiteStats = ({ s, site: { siteStats, loading, cabinets, aircrafts, compartments }, item: { items }, user: { users }, getSiteStats, key }) => {
  const classes = useStyles();

  useEffect(() => {
    getSiteStats(s.siteID);
    // eslint-disable-next-line
  }, []);
  const getcompartmentscount = () => {
    let count = 0
    Object.keys(compartments)?.map(key => {
      count = count + compartments[key].length
    })
    return count
  }
  return (
    <React.Fragment key={Math.random()}>
      <Grid
        container
        style={{ marginTop: 10, marginLeft: 10 }}
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <RoomIcon color="primary" />
        </Grid>
        <Grid item>{s.siteName}</Grid>
      </Grid>
      <Card className={classes.stats}>
        {siteStats[s.siteID] && !loading ? (
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-around"
            >
              <Grid item>
                <Grid container justify="center">
                  <Typography variant="h2">
                    {/* {siteStats[s.siteID].AircraftsCount} */}
                    {aircrafts[s.siteID]?.length}
                  </Typography>
                  <Grid container justify="center">
                    <RoomIcon color="primary" />
                    {/* <Typography>Service Lines</Typography> */}
                    <Typography>Aircraft</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography variant="h2">
                    {/* {siteStats[s.siteID].UsersCount} */}
                    {users.length}
                  </Typography>
                  <Grid container justify="center">
                    <RoomIcon color="primary" />
                    <Typography>Users</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography variant="h2">
                    {/* {siteStats[s.siteID].CabinetsCount} */}
                    {cabinets[s.siteID]?.length}
                  </Typography>
                  <Grid container justify="center">
                    <RoomIcon color="primary" />
                    <Typography>Cabinets</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography variant="h2">
                    {getcompartmentscount()}
                    {/* {cabinets[s.siteID]?.length} */}
                  </Typography>
                  <Grid container justify="center">
                    <RoomIcon color="primary" />
                    <Typography>Compartments</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="center">
                  <Typography variant="h2">
                    {/* {getcompartmentscount()} */}
                    {/* {siteStats[s.siteID].ItemsCount} */}
                    {items?.items?.length}
                  </Typography>
                  <Grid container justify="center">
                    <RoomIcon color="primary" />
                    <Typography>Items</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <Spinner />
        )}
      </Card>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  site: state.site,
  item: state.item,
  user: state.user
});

export default connect(mapStateToProps, { getSiteStats })(SiteStats);
