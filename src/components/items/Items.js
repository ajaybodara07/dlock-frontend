import React from "react";
import { connect } from "react-redux";
import MainLayout from "../layout/MainLayout";
import Table from "../sites/SitesTable";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { editItem, editAircraft, registerItem ,  deleteItem } from "../../actions/site";

const headCells = [
  {
    id: "itemName",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "itemID",
    numeric: false,
    disablePadding: false,
    label: "Item ID",
  },
  {
    id: "itemType",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "itemMaintenanceDate",
    numeric: true,
    disablePadding: false,
    label: "Maintenance Date",
  },
  {
    id: "itemStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const Items = ({
  site: { currentSiteID, aircrafts, items },
  editItem,
  editAircraft,
  registerItem, deleteItem
}) => {
  const classes = useStyles();

  return (
    <MainLayout title="Items">
      <Typography className={classes.heading} variant="h6">
        All Items
      </Typography>
      {/* Available Items */}
      {currentSiteID &&
      items &&
      items[currentSiteID] &&
      aircrafts &&
      aircrafts[currentSiteID] ? (
        <Table
          id={currentSiteID}
          rows={items[currentSiteID]}
          aircrafts={aircrafts[currentSiteID]}
          headCells={headCells}
          editItem={editItem}
          editAircraft={editAircraft}
          registerItem={registerItem}
          deleteItem={ deleteItem}
        />
      ) : (
        <p>No site selected</p>
      )}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  site: state.site,
});

export default connect(mapStateToProps, {
  editItem,
  editAircraft,
  deleteItem,
  registerItem,
})(Items);
