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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import { Formik, Form } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Modal from "../modal/Modal";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserCard from "./CabinetCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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

const Row = (props) => {
  const {
    row,
    border,
    classes,
    setEditAircraftModal,
    setCurrentRow,
    items,
  } = props;
  const [open, setOpen] = React.useState(false);

  // console.log("items rowww");
  // console.log(items);
  // console.log(row);

  const rowClickHandler = (e) => {
    const classNames = ["MuiIconButton-label", "MuiIconButton-edgeEnd"];
    if (classNames.some((className) => e.target.classList.contains(className)))
      return;

    setOpen(!open);
  };

  const getColor = (status) => {
    if (status.toLowerCase() === "empty") {
      return "green";
    } else if (status.toLowerCase() === "occupied") {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={rowClickHandler}
        role="checkbox"
        tabIndex={-1}
        key={Math.random()}
        style={{
          borderBottom: `${border}px solid #253344`,
        }}
      >
        <TableCell className={classes.tableCell} style={{ width: 10 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tableCell} component="th">
          {row.compartmentID}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.compartmentType}
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
              borderLeft: `3px solid ${getColor(row.compartmentState)}`,
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="span" style={{ marginLeft: 10 }}>
              {row.compartmentState}
            </Typography>
          </div>
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.itemID === "0" ? "" : row.itemID}
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
                setEditAircraftModal(true);
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
            {/* <IconButton
              edge="end"
              style={{
                marginLeft: 5,
              }}
              onClick={() => {
                setCurrentRow(row);
                setDeleteAircraftModal(true);
              }}
            >
              <DeleteIcon
                style={{
                  color: "#fff",
                  fontSize: 18,
                  pointerEvents: "none",
                }}
              />
            </IconButton> */}
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ padding: 0, border: "none", background: "#253344" }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{
              width: "95%",
              margin: "auto",
              background: "#29394D",
              marginBottom: border,
            }}
          >
            <ItemTable items={items} itemID={row.itemID} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const ItemTable = ({ items, itemID }) => {
  const item =
    itemID === "0" || !itemID ? {} : items.find((i) => i.itemID === itemID);

  const getColor = (status) => {
    if (!status) return "green";
    if (status.toLowerCase() === "within_stockroom") {
      return "green";
    } else if (status.toLowerCase() === "within_compartment") {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <List>
      <ListItem style={{ color: "#9D9D94" }}>
        <Grid container>
          <Grid item md={3} xs={3}>
            Name
          </Grid>
          <Grid item md={2} xs={2}>
            ItemID
          </Grid>
          <Grid item md={2} xs={2}>
            Status
          </Grid>
          <Grid item md={3} xs={3}>
            Maintenance Date
          </Grid>
          <Grid item md={2} xs={2}>
            Status
          </Grid>
        </Grid>
      </ListItem>
      <ListItem style={{ borderTop: "3px solid #253344", paddingTop: 20 }}>
        <Grid container alignItems="center">
          <Grid item md={3} xs={3}>
            {item?.itemName || "empty"}
          </Grid>
          <Grid item md={2} xs={2}>
            {item?.itemID || "empty"}
          </Grid>
          <Grid item md={2} xs={2}>
            {item?.itemType || "empty"}
          </Grid>
          <Grid item md={3} xs={3}>
            {item?.itemMaintenanceDate || "empty"}
          </Grid>

          <Grid item md={2} xs={2} style={{ position: "relative" }}>
            <span
              style={{
                borderLeft: `3px solid ${getColor(item?.itemStatus)}`,
                height: 55,
                width: 2,
                marginTop: -20,
                position: "absolute",
              }}
            ></span>
            <span style={{ marginLeft: 10 }}>
              {item?.itemStatus || "empty"}
            </span>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

const EnhancedTable = ({
  title,
  rows,
  headCells,
  id,
  editCompartment,
  registerCompartment,
  deleteCompartment,
  items,
  siteID,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const [currentRow, setCurrentRow] = useState(null);
  const [addAircraftModal, setAddAircraftModal] = useState(false);
  const [editAircraftModal, setEditAircraftModal] = useState(false);
  const [deleteAircraftModal, setDeleteAircraftModal] = useState(false);

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

  const handleClick = (event, name) => {
    console.log("row click");
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
        return row[searchColumn].toLowerCase().includes(searched.toLowerCase());
      });

      setFilteredRows(filtered);
    }
  };

  const cancelSearch = () => {
    requestSearch("");
    setSearched("");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserCard title={title} setAddAircraftModal={setAddAircraftModal} />
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
                    <Row
                      setEditAircraftModal={setEditAircraftModal}
                      setDeleteAircraftModal={setDeleteAircraftModal}
                      setCurrentRow={setCurrentRow}
                      handleClick={handleClick}
                      border={border}
                      key={row.name}
                      row={row}
                      classes={classes}
                      items={items}
                    />
                  );
                })}
              {/* {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const border = i === rows.length - 1 ? 0 : 5;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      style={{
                        borderBottom: `${border}px solid #253344`,
                      }}
                    >
                      <TableCell className={classes.tableCell} component="th">
                        {row.itemName}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.itemType}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <IconButton
                          edge="end"
                          style={{
                            marginLeft: 5,
                          }}
                        >
                          <EditIcon
                            style={{
                              color: "#fff",
                              fontSize: 18,
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })} */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
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

      {/* Modal */}
      <Modal
        title="Add Compartment"
        open={addAircraftModal}
        setOpen={setAddAircraftModal}
      >
        <Formik
          initialValues={{ compartmentID: "", compartmentType: "" }}
          onSubmit={async (values) => {
            await registerCompartment({
              siteID,
              cabinetID: id,
              compartmentID: values.compartmentID,
              compartmentType: values.compartmentType,
            });
            setAddAircraftModal(false);
          }}
        >
          {({ handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="compartmentID"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Compartment ID"
                    onChange={handleChange}
                    variant="filled"
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="aircraft-model">
                      Compartment Type
                    </InputLabel>
                    <Select
                      name="compartmentType"
                      labelId="aircraft-model"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="medium">Medium</MenuItem>
                    </Select>
                  </FormControl>
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
                    onClick={() => setAddAircraftModal(false)}
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
      {/* Edit Aircraft Modal */}
      <Modal
        title="Edit Compartment"
        open={editAircraftModal}
        setOpen={setEditAircraftModal}
      >
        <Formik
          initialValues={{
            compartmentID: currentRow?.compartmentID || "",
            compartmentType: currentRow?.compartmentType || "",
          }}
          onSubmit={async (values) => {
            await editCompartment({
              id: currentRow?.id,
              siteID,
              cabinetID: id,
              compartmentID: values.compartmentID,
              compartmentType: values.compartmentType,
            });
            setEditAircraftModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="compartmentID"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Compartment ID"
                    onChange={handleChange}
                    variant="filled"
                    value={values.compartmentID}
                    disabled
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="aircraft-model">
                      Compartment Type
                    </InputLabel>
                    <Select
                      name="compartmentType"
                      labelId="aircraft-model"
                      onChange={handleChange}
                      value={values.compartmentType}
                      required
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                    </Select>
                  </FormControl>
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
                    onClick={() => setEditAircraftModal(false)}
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
      {/* Delete Aircraft Modal */}
      <Modal open={deleteAircraftModal} setOpen={setDeleteAircraftModal}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            await deleteCompartment({
              cabinetID: id,
              id: currentRow?.id || "",
            });
            setDeleteAircraftModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Typography variant="h6" align="center">
                {`Are you sure you want to delete Compartment ${currentRow?.compartmentID}`}
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="center"
              >
                <Grid item>
                  <Button
                    onClick={() => setDeleteAircraftModal(false)}
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
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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
          name="status"
          value={searchColumn}
          labelId="aircraft-model"
          onChange={(e) => {
            setSearchColumn(e.target.value);
          }}
          required
        >
          <MenuItem value="all_col">All Columns</MenuItem>
          <MenuItem value="compartmentID">Compartment ID</MenuItem>
          <MenuItem value="compartmentType">Compartment Type</MenuItem>
          <MenuItem value="compartmentState">Compartment State</MenuItem>
          <MenuItem value="itemID">Item ID</MenuItem>
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
