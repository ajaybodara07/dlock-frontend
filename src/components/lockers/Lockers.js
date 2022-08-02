import React from "react";
import MainLayout from "../layout/MainLayout";
import Table from "./LockersTable";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  { id: "type", numeric: true, disablePadding: false, label: "Type" },
  { id: "hanger", numeric: true, disablePadding: false, label: "Hanger" },
  { id: "line", numeric: true, disablePadding: false, label: "Line" },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const rows = [
  {
    name: "Cabinet 1",
    type: "Std",
    hanger: "Hanger 1",
    line: "Line 1",
    status: "Working",
  },
  {
    name: "Cabinet 2",
    type: "Cage",
    hanger: "Hanger 2",
    line: "Line 2",
    status: "Working",
  },
];

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const Lockers = () => {
  const classes = useStyles();

  return (
    <MainLayout title="Lockers">
      <Typography className={classes.heading} variant="h6">
        All Items
      </Typography>
      <Table rows={rows} headCells={headCells} />
    </MainLayout>
  );
};

export default Lockers;
