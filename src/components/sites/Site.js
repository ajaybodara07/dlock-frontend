import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Spinner from "../layout/Spinner";
import Table from "./SitesTable";
import AircraftTable from "./AircraftTable";
import {
  switchSite,
  listAircrafts,
  listItems,
  editAircraft,
  editItem,
  deleteItem,
  registerItem,
  registerAircraft,
  deleteAircraft,
} from "../../actions/site";

const Sites = ({
  auth,
  site: { sites, aircrafts, items, loading },
  switchSite,
  listItems,
  listAircrafts,
  editAircraft,
  editItem,
  deleteItem,
  registerItem,
  registerAircraft,
  deleteAircraft,
}) => {
  const { id } = useParams();
  const [siteName, setSiteName] = useState("");

  const aircraftHeadCells = [
    {
      id: "customer",
      numeric: false,
      disablePadding: false,
      label: "Customer",
    },
    {
      id: "aircraftManufacturer",
      numeric: false,
      disablePadding: false,
      label: "Aircraft Manufacturer",
    },
    {
      id: "aircraftModel",
      numeric: false,
      disablePadding: false,
      label: "Aircraft Model",
    },
    {
      id: "aircraftReg",
      numeric: false,
      disablePadding: false,
      label: "Aircraft Reg",
    },
    {
      id: "aircraftStatus",
      numeric: false,
      disablePadding: false,
      label: "Aircraft Status",
    },
  ];

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

  useEffect(() => {
    if (!auth.loading) {
      switchSite(id);
      listAircrafts(id);
      listItems(id);
    }
    // eslint-disable-next-line
  }, [id, auth.loading]);

  useEffect(() => {
    if (!loading) {
      const currentSite = sites.find((s) => s.siteID === id);
      setSiteName(currentSite?.siteName);
    }
    // eslint-disable-next-line
  }, [id, loading]);

  return (
    <MainLayout title={siteName}>
      {items && items[id] && aircrafts && aircrafts[id] ? (
        <>
          {/* Available Aircrafts at Site */}
          <AircraftTable
            rows={aircrafts[id]}
            headCells={aircraftHeadCells}
            editAircraft={editAircraft}
            registerAircraft={registerAircraft}
            deleteAircraft={deleteAircraft}
            items={items[id]}
            id={id}
          />

          {/* Available Items */}
          <Table
            id={id}
            rows={items[id]}
            aircrafts={aircrafts[id]}
            headCells={headCells}
            editItem={editItem}
            editAircraft={editAircraft}
            registerItem={registerItem}
            deleteItem={deleteItem}
          />
        </>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  site: state.site,
});

export default connect(mapStateToProps, {
  listAircrafts,
  listItems,
  editAircraft,
  editItem,
  deleteItem,
  registerItem,
  registerAircraft,
  deleteAircraft,
  switchSite,
})(Sites);
