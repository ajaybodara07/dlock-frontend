import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  listCompartments,
  registerCompartment,
  editCompartment,
  deleteCompartment,
} from "../../actions/site";
import MainLayout from "../layout/MainLayout";
import Spinner from "../layout/Spinner";
import CabinetTable from "./CabinetTable";
import CompartmentGraphics from "./CompartmentGraphics";

const Cabinet = ({
  auth,
  site: { items, currentSiteID, compartments, cabinets, loading },
  listCompartments,
  registerCompartment,
  editCompartment,
  deleteCompartment,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [cabinetName, setCabinetName] = useState("");

  const aircraftHeadCells = [
    {
      id: "compartmentID",
      numeric: false,
      disablePadding: false,
      label: "Compartment ID",
    },
    {
      id: "compartmentType",
      numeric: false,
      disablePadding: false,
      label: "Type",
    },
    {
      id: "compartmentState",
      numeric: false,
      disablePadding: false,
      label: "State",
    },
    {
      id: "itemID",
      numeric: false,
      disablePadding: false,
      label: "Item ID",
    },
  ];
  useEffect(() => {
    if (!currentSiteID) history.push("/");

    if (!auth.loading) {
      listCompartments(currentSiteID, id);
    }
    // eslint-disable-next-line
  }, [id, auth.loading]);

  useEffect(() => {
    if (!loading) {
      const currentCabinet = cabinets[currentSiteID].find(
        (c) => c.cabinetID === id
      );
      setCabinetName(currentCabinet?.cabinetName);
    }
    // eslint-disable-next-line
  }, [id, loading]);

  return (
    <MainLayout title={cabinetName}>
      {compartments && compartments[id] ? (
        <>
          <CompartmentGraphics compartments={compartments[id]} />
          <CabinetTable
            id={id}
            rows={compartments[id]}
            headCells={aircraftHeadCells}
            items={items[currentSiteID]}
            siteID={currentSiteID}
            registerCompartment={registerCompartment}
            editCompartment={editCompartment}
            deleteCompartment={deleteCompartment}
          />
        </>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  listCompartments,
  registerCompartment,
  editCompartment,
  deleteCompartment,
})(Cabinet);
