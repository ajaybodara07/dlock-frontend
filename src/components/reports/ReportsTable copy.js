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
import Modal from "../modal/Modal";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import SearchBar from "material-ui-search-bar";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

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
            // setSearched(e.target.value)
            setSearchColumn(e.target.value);
            requestSearch(e.target.value);
          }}
          required
        >
          <MenuItem value=" ">All Operation</MenuItem>
          <MenuItem value="depositItem">Deposit items</MenuItem>
          {/* <MenuItem value='all_col'>Wothdrawn items</MenuItem> */}
          {/* <MenuItem value='taskCode'>Task Code</MenuItem>
          <MenuItem value='aircraftReg'>Aircraft Reg</MenuItem>
          <MenuItem value='description'>Description</MenuItem>
          <MenuItem value='taskStatus'>Task Status</MenuItem> */}
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
        onRequestSearch={() => requestSearch(searched)}
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

const useStyles = makeStyles((theme) => ({
  root: {
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
  formControl: {
    width: "100%",
  },
  button: {
    borderRadius: 30,
    padding: "10px 20px",
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

const EnhancedTable = ({ id, rows, headCells, editTask, deleteTask }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const [currentRow, setCurrentRow] = useState(null);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);

  const [searched, setSearched] = useState("");
  const [searchColumn, setSearchColumn] = useState(" ");

  useEffect(() => {
    setFilteredRows(rows);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    setFilteredRows(rows);
    console.log("callllll", rows);
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

  const requestSearch = (value) => {
    if (!searchColumn) return;
    // if (searchColumn === 'all_col') {
    let filtereddata = [];
    rows.forEach((element) => {
      let found = false;
      Object.keys(element).map((a) => {
        if (found === false)
          if (element[a].toLowerCase().includes(value.toLowerCase())) {
            filtereddata.push(element);
            found = true;
          }
      });
    });
    setFilteredRows(value === " " ? rows : filtereddata);
    // } else {
    //   const filtered = rows.filter((row) => {
    //     return row[searchColumn].toLowerCase().includes(searched.toLowerCase())
    //   })

    //   setFilteredRows(filtered)
    // }
  };

  const cancelSearch = () => {
    requestSearch("");
    setSearched("");
  };
  const getFormatedDate = (datestring) => {
    let _date = Date(datestring);
    _date = new Date(_date);
    return _date.getDate() + "/" + _date.getMonth() + "/" + _date.getFullYear();
  };

  const [tableRows, setTableRows] = useState(rows);
  const [filterOption, setFilterOption] = useState("user_operation");

  const handleSearch = (value) => {
    setSearched(value);
    let filterNames;
    switch (filterOption) {
      case "user_operation":
        filterNames = rows.filter(
          (x) =>
            x.compartmentOperation.toLowerCase().includes(value) ||
            x.userID.toLowerCase().includes(value)
        );

        break;
      case "userID":
        filterNames = rows.filter((x) =>
          x.userID.toLowerCase().includes(value)
        );
        break;
      case "compartmentOperation":
        filterNames = rows.filter((x) =>
          x.compartmentOperation.toLowerCase().includes(value)
        );
        break;
    }
    setTableRows(value.length === 0 ? rows : filterNames);
  };

  const filterOptions = [
    {
      name: "User and compartment operation",
      value: "user_operation",
    },
    {
      name: "User ID",
      value: "userID",
    },
    {
      name: "Compartment Operations",
      value: "compartmentOperation",
    },
  ];

  return (
    <div className={classes.root}>
      {/* <Grid container style={{ margin: '24px 0' }}>
        <Grid item md={2}>
          <Select
            id='filters'
            select
            defaultValue='user_operation'
            onChange={(e) => setFilterOption(e.target.value)}
            label='Filter'
            style={{ width: '100%', marginTop: 8 }}
          >
            {filterOptions.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={10}>
          <SearchBar
            placeholder='Search user or operation...'
            searchIcon={<SearchIcon style={{ height: 40, width: 16 }} />}
            closeIcon={<CloseIcon style={{ height: 40, width: 16 }} />}
            style={{
              width: '100%',
              background: '#253344',
              height: 40,
              borderRadius: 0,
              boxShadow:
                '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 0px 2px 0px rgba(0,0,0,0.12)',
            }}
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => setTableRows(rows)}
          />
        </Grid>
      </Grid> */}
      <Paper className={classes.paper}>
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
              rowCount={filteredRows?.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(
                filteredRows ? filteredRows : [],
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const border = i === filteredRows.length - 1 ? 0 : 5;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={Math.random()}
                      style={{
                        borderBottom: `${border}px solid #253344`,
                      }}
                    >
                      <TableCell className={classes.tableCell} component="th">
                        {row.cabinetID}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {getFormatedDate(row.timestamp)}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.compartmentID}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.compartmentOperation}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.userID}
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
                              console.log("row");
                              console.log(row);
                              setEditUserModal(true);
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
                              setDeleteTaskModal(true);
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
                  <TableCell colSpan={5} />
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
      {/* Edit User Modal */}
      <Modal
        open={editUserModal}
        setOpen={setEditUserModal}
        title="Edit User"
        modalStyle={{ alignItems: "flex-start" }}
      >
        <Formik
          initialValues={{
            taskCode: currentRow?.taskCode || "",
            aircraftReg: currentRow?.aircraftReg || "",
            description: currentRow?.description || "",
            taskStatus: currentRow?.taskStatus || "",
          }}
          onSubmit={async (values) => {
            await editTask({
              id: currentRow?.id || "",
              taskCode: values.taskCode,
              aircraftReg: values.aircraftReg,
              description: values.description,
              taskStatus: values.taskStatus,
              siteID: id,
            });
            setEditUserModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="taskCode"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Task Code"
                    onChange={handleChange}
                    variant="filled"
                    value={values.taskCode}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="aircraftReg"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Aircraft Reg"
                    onChange={handleChange}
                    variant="filled"
                    value={values.aircraftReg}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="description"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Description"
                    onChange={handleChange}
                    variant="filled"
                    value={values.description}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="user-role">Task Status</InputLabel>
                    <Select
                      name="taskStatus"
                      labelId="taskStatus"
                      onChange={handleChange}
                      value={values.taskStatus}
                      required
                    >
                      <MenuItem value="WIP-READY: TO-WORK">
                        WIP-READY: TO-WORK
                      </MenuItem>
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
                    onClick={() => setEditUserModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid>
                {/* <Grid
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
                </Grid> */}
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      //Delete Task Modal
      <Modal open={deleteTaskModal} setOpen={setDeleteTaskModal}>
        <Formik
          initialValues={{}}
          onSubmit={async () => {
            await deleteTask({
              id: currentRow?.id || "",
              siteID: id,
            });
            setDeleteTaskModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Typography variant="h6" align="center">
                {`Are you sure you want to delete Task ${currentRow?.taskCode}`}
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="center"
              >
                {/* <Grid item>
                  <Button
                    onClick={() => setDeleteTaskModal(false)}
                    className={classes.button}
                    variant="contained"
                    color="default"
                    style={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Grid> */}
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <Button
                    type='submit'
                    className={classes.button}
                    variant='contained'
                    color='secondary'
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
                      'Delete'
                    )}
                  </Button> */}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EnhancedTable;
