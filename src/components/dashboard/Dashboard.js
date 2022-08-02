import React,{useEffect} from "react";
import { connect } from "react-redux";
import MainLayout from "../layout/MainLayout";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SiteStats from "./SiteStats";
import { listUsers, addUser, editUser } from "../../actions/user";

import { makeStyles } from "@material-ui/core/styles";

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

const Dashboard = ({ site: { sites, loading } , listUsers }) => {
  const classes = useStyles();
useEffect(()=>{
  // listUsers();
},[])
  return (
    <MainLayout title="MRO Management">
      <Card className={classes.root}>
        <CardContent>
          <Typography style={{ marginLeft: 22 }} variant="h5">
            {sites?.length} Site{sites.length > 1 ? "s" : ""}
          </Typography>
          {sites.map((s,i) => {
            return <SiteStats s={s} key={i}/>;
          })}
        </CardContent>
      </Card>
      {/* <Grid container className={classes.card} spacing={2}>
        <Grid item>
          <Typography variant="h5">{"kkk"}</Typography>
        </Grid>
        <Grid item></Grid>
      </Grid> */}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps,{listUsers})(Dashboard);
