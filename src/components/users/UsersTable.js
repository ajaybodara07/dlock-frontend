import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import { Formik, Field, Form } from "formik";
import Modal from "../modal/Modal";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserCard from "./UserCard";
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
          value={searchColumn}
          name="status"
          labelId="aircraft-model"
          onChange={(e) => {
            setSearchColumn(e.target.value);
          }}
          required
        >
          <MenuItem value="all_col">All Columns</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="assignedSiteID">Assigned Site ID</MenuItem>
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

const EnhancedTable = ({
  title,
  rows,
  headCells,
  setAssignMemberModal,
  editUser,
  deleteUser,
  setAddUserModal
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const [currentRow, setCurrentRow] = useState(null);
  const [editUserModal, setEditUserModal] = useState(false);

  const [searched, setSearched] = useState("");
  const [searchColumn, setSearchColumn] = useState("all_col");

  useEffect(() => {
    setFilteredRows(rows);
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

  const handleClick = (event, name) => {
    console.log("row click");
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
        return row[searchColumn]?.toLowerCase().includes(searched.toLowerCase());
      });

      setFilteredRows(filtered);
    };
  }
  const cancelSearch = () => {
    requestSearch("");
    setSearched("");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <UserCard title={title} setAssignMemberModal={setAssignMemberModal} setAddUserModal={setAddUserModal} />
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
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.email}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.role}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {/* <IconButton
                          onClick={() => {
                            setCurrentRow(row);
                            console.log("row");
                            console.log(row);
                            setEditUserModal(true);
                          }}
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
                        </IconButton> */}

                        <IconButton
                          onClick={() => {
                            deleteUser({
                              userID: row?.userID
                            });
                          }}
                          edge="end"
                          style={{
                            marginLeft: 5,
                          }}
                        >
                          <DeleteIcon
                            style={{
                              color: "#fff",
                              fontSize: 18,
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={4} />
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
            userID: currentRow?.userID || "",
            name: currentRow?.name || "",
            email: currentRow?.email || "",
            phoneNumber: currentRow?.phoneNumber || "",
            password: "",
            role: currentRow?.role || "",
          }}
          validate={(values) => {
            let errors = {};

            const hasSpace = /\s/;
            if (hasSpace.test(values.userID)) {
              errors.userID = "must have no spaces";
            }

            const validPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
            if (
              values.phoneNumber.trim() !== "" &&
              !validPhoneNumber.test(values.phoneNumber)
            ) {
              errors.phoneNumber = "must be number";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            await editUser({
              userID: values.userID,
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
              role: values.role,
            });
            setEditUserModal(false);
          }}
        >
          {({ values, errors, handleChange, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <TextField
                    name="name"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Name"
                    onChange={handleChange}
                    variant="filled"
                    value={values.name}
                    required
                  />
                </Grid>
                {/* <Grid item>
                  <TextField
                    name="email"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Email"
                    onChange={handleChange}
                    variant="filled"
                    value={values.email}
                    required
                  />
                </Grid> */}
                <Grid item>
                  <Field
                    component={TextField}
                    id="phoneNumber"
                    name="phoneNumber"
                    style={{ width: "100%" }}
                    label="Phone Number"
                    helperText="e.g. +12015550123"
                    variant="filled"
                    error={errors.phoneNumber}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Password"
                    onChange={handleChange}
                    type="password"
                    variant="filled"
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="user-role">Role</InputLabel>
                    <Select
                      name="role"
                      labelId="user-role"
                      onChange={handleChange}
                      value={values.role}
                      required
                    >
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="clerk">Clerk</MenuItem>
                      <MenuItem value="engineer">Engineer</MenuItem>
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
    </div>
  );
};

export default EnhancedTable;
