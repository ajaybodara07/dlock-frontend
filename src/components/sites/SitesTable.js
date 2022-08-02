import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Modal from "../modal/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import UserCard from "./SiteCard";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchBar from "material-ui-search-bar";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    borderRadius: 30,
    padding: "10px 20px",
  },
  formControl: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
  table: {
    minWidth: 750,
  },
  tableCell: {
    border: "none",
  },
  select: {
    background: "#29394d !important",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const EnhancedTable = ({
  id,
  title,
  rows,
  aircrafts,
  headCells,
  editItem,
  deleteItem,
  editAircraft,
  registerItem,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const [editItemModal, setEditItemModal] = useState(false);
  const [addItemAircraftModal, setAddItemModal] = useState(false);
  const [addNewItemAircraftModal, setAddNewItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);

  const [currentRow, setCurrentRow] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);

  const [searched, setSearched] = useState("");
  const [searchColumn, setSearchColumn] = useState("all_col");

  useEffect(() => {
    setFilteredRows(rows);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setFilteredRows(rows);
    // eslint-disable-next-line
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const requestSearch = () => {
    if (!searchColumn) return;
    if (searchColumn === "all_col") {
      let filtereddata = []
      rows.forEach(element => {
        let found = false
        Object.keys(element).map(a => {
          if (found === false)
            if (element[a].toLowerCase().includes(searched.toLowerCase())) {
              filtereddata.push(element);
              found = true
            }
        })
      });
      setFilteredRows(filtereddata);

    } else {
    const filtered = rows.filter((row) => {
      return row[searchColumn]?.toLowerCase()?.includes(searched?.toLowerCase());
    });

    setFilteredRows(filtered);
  }
  };

  const cancelSearch = () => {
    requestSearch("");
    setSearched("");
  };

  const getColor = (status) => {
    if (status?.toLowerCase() === "within_stockroom") {
      return "green";
    } else if (status?.toLowerCase() === "within_compartment") {
      return "orange";
    } else {
      return "red";
    }
  };

  const getItemStatus = (status) => {
    if (status === "within_stockroom") {
      return "Avionics Shop";
    } else if (status === "within_compartment") {
      return "Within Compartment";
    } else {
      return "Withdrawn";
    }
  };

  const format_date = (datestring) =>{
    // let d = "31_12_2021" //date string comming from API
    let d = datestring
    d = d.split("_")
    d= d.length <=3 && `${d[2]}-${d[1]}-${d[0]}`
    d=d.toString();
    return d
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserCard
          title={title}
          setAddItemModal={setAddItemModal}
          setAddNewItemModal={setAddNewItemModal}
        />
        <EnhancedTableToolbar
          searched={searched}
          setSearched={setSearched}
          requestSearch={requestSearch}
          cancelSearch={cancelSearch}
          searchColumn={searchColumn}
          setSearchColumn={setSearchColumn}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const border = i === filteredRows.length - 1 ? 0 : 2;
                  return (
                    <TableRow
                      hover
                      onClick={() => {
                        setCurrentRow(row);
                        if (aircrafts.find((a) => a.itemID === row.itemID)) {
                          setIsAssigned(true);
                        } else {
                          setIsAssigned(false);
                        }
                      }}
                      role="checkbox"
                      tabIndex={-1}
                      key={Math.random()}
                      style={{
                        borderBottom: `${border}px solid #253344`,
                        background:
                          currentRow?.itemID === row.itemID && "#3A495B",
                      }}
                    >
                      <TableCell className={classes.tableCell} component="th">
                        {row.itemName}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {row.itemID}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.itemType}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.itemMaintenanceDate}
                      </TableCell>
                      <TableCell
                        align="left"
                        component="div"
                        style={{
                          padding: "0 0 0 16px",
                          display: "flex",
                          border: "none",
                        }}
                      >
                        <div
                          style={{
                            borderLeft: `3px solid ${getColor(row.itemStatus)}`,
                            height: "80px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="span" style={{ marginLeft: 10 }}>
                            {getItemStatus(row.itemStatus)}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="right">
                        <Grid
                          style={{ marginLeft: -5, minWidth: 100 }}
                          container
                          justify="flex-end"
                        >
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setCurrentRow(row);
                              setEditItemModal(true);
                            }}
                          >
                            <EditIcon
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                pointerEvents: "none",
                              }}
                            />
                          </IconButton>
                          <IconButton
                            edge="end"
                            style={{
                              marginLeft: 5,
                            }}
                            onClick={() => {
                              setCurrentRow(row);
                              setDeleteItemModal(true);
                            }}
                          >
                            <DeleteIcon
                              style={{
                                color: "#fff",
                                fontSize: 18,
                                pointerEvents: "none",
                              }}
                            />
                          </IconButton>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Add Item to Aircraft */}
      <Modal
        title={
          currentRow?.itemID
            ? isAssigned
              ? "Item is assigned to another aircraft"
              : `Add ${currentRow?.itemID} to Aircraft`
            : "Item not selected"
        }
        open={addItemAircraftModal}
        setOpen={setAddItemModal}
      >
        <Formik
          initialValues={{ aircraftReg: "" }}
          onSubmit={async (values) => {
            const aircraft = aircrafts.find(
              (a) => a.aircraftReg === values.aircraftReg
            );

            await editAircraft({
              reg: aircraft.aircraftReg,
              customer: aircraft.customer,
              manufacturer: aircraft.aircraftManufacturer,
              model: aircraft.aircraftModel,
              status: aircraft.aircraftStatus,
              siteID: aircraft.siteID,
              itemID: currentRow?.itemID || "",
            });

            setAddItemModal(false);

            setIsAssigned(true);
          }}
        >
          {({ handleChange, isSubmitting }) => {
            const filteredAircrafts = aircrafts.filter(
              (a) => a.itemID === "0" || a.itemID === ""
            );

            return (
              <Form>
                <Grid container spacing={2} direction="column">
                  {!isAssigned && (
                    <Grid item>
                      <FormControl
                        variant="filled"
                        required
                        className={classes.formControl}
                      >
                        <InputLabel id="itemType">Aircraft Reg</InputLabel>
                        <Select
                          name="aircraftReg"
                          labelId="aircraftReg"
                          onChange={handleChange}
                          required
                        >
                          {filteredAircrafts.length > 0 ? (
                            filteredAircrafts.map((a) => (
                              <MenuItem value={a.aircraftReg}>
                                {a.aircraftReg}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem>No aircrafts</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: 20 }}
                  justify="flex-end"
                >
                  <Grid item>
                    <Button
                      onClick={() => setAddItemModal(false)}
                      className={classes.button}
                      variant="contained"
                      color="default"
                      style={{ width: 120 }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      style={{ width: 120 }}
                      disabled={
                        isSubmitting ||
                        !currentRow ||
                        isAssigned ||
                        filteredAircrafts.length === 0
                      }
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          className={classes.loader}
                          size={25}
                          thickness={4}
                        />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      {/* Add New Item */}
      <Modal
        title="Add New Item"
        open={addNewItemAircraftModal}
        setOpen={setAddNewItemModal}
      >
        <Formik
          initialValues={{
            itemID: "",
            itemName: "",
            itemType: "",
            itemStatus: "",
            itemMaintenanceDate: "",
          }}
          onSubmit={async (values) => {
            await registerItem({
              itemID: values.itemID,
              itemName: values.itemName,
              itemType: values.itemType,
              itemStatus: values.itemStatus,
              itemMaintenanceDate: values.itemMaintenanceDate,
              siteID: id,
            });
            setAddNewItemModal(false);
            console.log(values);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="itemID"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Item ID"
                    onChange={handleChange}
                    variant="filled"
                    value={values.itemID}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="itemName"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Item Name"
                    onChange={handleChange}
                    variant="filled"
                    value={values.itemName}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="itemType">Item Type</InputLabel>
                    <Select
                      name="itemType"
                      labelId="itemType"
                      onChange={handleChange}
                      value={values.itemType}
                      required
                    >
                      <MenuItem value="tool">Tool</MenuItem>
                      <MenuItem value="part">Part</MenuItem>
                      <MenuItem value="consumable">Consumable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="itemStatus">Item Status</InputLabel>
                    <Select
                      name="itemStatus"
                      labelId="itemStatus"
                      onChange={handleChange}
                      value={values.itemStatus}
                      required
                    >
                      <MenuItem value="within_compartment">
                        Within compartment
                      </MenuItem>
                      <MenuItem value="within_stockroom">
                        Within stockroom
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    id="itemMaintenanceDate"
                    name="itemMaintenanceDate"
                    label="Maintenance Date"
                    style={{ width: "100%" }}
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    variant="filled"
                    onChange={handleChange}
                    value={values.itemMaintenanceDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    onClick={() => setAddNewItemModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ width: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.loader}
                        size={25}
                        thickness={4}
                      />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* Edit Item */}
      <Modal title="Edit Item" open={editItemModal} setOpen={setEditItemModal}>
        <Formik
          initialValues={{
            itemName: currentRow?.itemName || "",
            itemType: currentRow?.itemType || "",
            itemMaintenanceDate:
              currentRow?.itemMaintenanceDate.split("_").reverse().join("-") ||
              "",
          }}
          onSubmit={async (values) => {
            await editItem({
              itemID: currentRow?.itemID || "",
              itemMaintenanceDate: values.itemMaintenanceDate,
              itemType: values.itemType,
              itemName: values.itemName,
              itemStatus: currentRow?.itemStatus || "",
              siteID: id,
            });
            setEditItemModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="itemName"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Item Name"
                    onChange={handleChange}
                    variant="filled"
                    value={values.itemName}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="itemType">Item Type</InputLabel>
                    <Select
                      name="itemType"
                      labelId="itemType"
                      onChange={handleChange}
                      value={values.itemType}
                      required
                    >
                      <MenuItem value="tool">Tool</MenuItem>
                      <MenuItem value="part">Part</MenuItem>
                      <MenuItem value="consumable">Consumable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    id="itemMaintenanceDate"
                    name="itemMaintenanceDate"
                    label="Maintenance Date"
                    style={{ width: "100%" }}
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    variant="filled"
                    onChange={handleChange}
                    value={values.itemMaintenanceDate}  //previous code
                    // value={format_date(values.itemMaintenanceDate)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="flex-end"
              >
                <Grid item>
                  <Button
                    onClick={() => setEditItemModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ width: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.loader}
                        size={25}
                        thickness={4}
                      />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* Delete Item Modal */}
      <Modal open={deleteItemModal} setOpen={setDeleteItemModal}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            await deleteItem({
              itemID: currentRow?.itemID || "",
              siteID: id,
            });
            setDeleteItemModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Typography variant="h6" align="center">
                {`Are you sure you want to delete Item ${currentRow?.itemID}`}
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="center"
              >
                <Grid item>
                  <Button
                    onClick={() => setDeleteItemModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    style={{ width: 120 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        className={classes.loader}
                        size={25}
                        thickness={4}
                      />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { headCells, classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        style={{
          borderBottom: "10px solid #253344",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={Math.random()}
            // align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#9D9D94" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({
  searched,
  setSearched,
  requestSearch,
  cancelSearch,
  searchColumn,
  setSearchColumn,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root)}>
      <FormControl
        variant="standard"
        required
        style={{
          width: 300,
          marginTop: 20,
          background: "#29394d",
        }}
      >
        <Select
          className={{ select: classes.select }}
          style={{
            marginTop: -5,
            height: 45,
            background: "#29394d",
            borderRadius: 0,
          }}
          value={searchColumn}
          name="status"
          labelId="aircraft-model"
          onChange={(e) => {
            setSearchColumn(e.target.value);
          }}
          required
        >
          <MenuItem value="all_col">All Columns</MenuItem>
          <MenuItem value="itemName">Item Name</MenuItem>
          <MenuItem value="itemID">Item ID</MenuItem>
          <MenuItem value="itemType">Item Type</MenuItem>
          <MenuItem value="itemMaintenanceDate">Item Maintenance Date</MenuItem>
          <MenuItem value="itemStatus">Item Status</MenuItem>
        </Select>
      </FormControl>
      <SearchBar
        searchIcon={<SearchIcon style={{ height: 40, width: 16 }} />}
        closeIcon={<CloseIcon style={{ height: 40, width: 16 }} />}
        style={{
          width: "100%",
          marginTop: 20,
          background: "#253344",
          height: 40,
          borderRadius: 0,
          boxShadow:
            "0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 0px 2px 0px rgba(0,0,0,0.12)",
        }}
        value={searched}
        onChange={(searchVal) => setSearched(searchVal)}
        onRequestSearch={() => requestSearch()}
        onCancelSearch={() => cancelSearch()}
      />
      {/* <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
};

export default EnhancedTable;
