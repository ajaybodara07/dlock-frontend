import React, { useState, useEffect, useRef } from "react";
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
import { useReactToPrint } from "react-to-print";
import moment from "moment";
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
      {/* <h1 style={{color:"black",marginLeft:"20px"}}>Withdrawn Items Report</h1> */}
      <h1 style={{ color: "black", marginLeft: "20px" }}>
        Locker Operations Report
      </h1>
      <TableRow
        style={
          {
            // borderBottom: "10px solid #253344",
          }
        }
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
              style={{ color: "black" }}
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
  button: {
    borderRadius: 30,
    padding: "6px 12px",
  },
  table: {
    backgroundColor: "white",
    color: "white",
  },
  tableCell: {
    color: "#9D9D94",
  },
}));

const EnhancedTableToolbar = ({
  searched,
  setSearched,
  requestSearch,
  cancelSearch,
  searchColumn,
  setSearchColumn,
  converttoPDF,
}) => {
  const classes = useToolbarStyles();
  // const converttoPDF =()=>{
  //   // var printContents = document.getElementById('reportstable').innerHTML;
  //   //    var originalContents = document.body.innerHTML;

  //   //    document.body.innerHTML = printContents;

  //   //    window.print();
  //   // let w = window.open("","_self");
  //   // let dom = document.getElementById('reportstable').innerHTML
  //   // w.document.write(dom);
  //   // w.print();
  //   // w.close();

  //   useReactToPrint({
  //     content: () => componentRef.current,
  //   });
  //     //  document.body.innerHTML = originalContents;
  // }
  return (
    <Toolbar className={clsx(classes.root)} style={{ marginBottom: "15px" }}>
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
            width: "100%",
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
          <MenuItem value=" ">All Operations</MenuItem>
          <MenuItem value="depositItem">Deposit items</MenuItem>
          {/* <MenuItem value='all_col'>Withdrawn items</MenuItem> */}
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
    backgroundColor: "white",
  },
  tableCell: {
    borderBottom: "1px solid black",
    color: "#9D9D94",
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
  users = [],
  id,
  rows,
  headCells,
  editTask,
  deleteTask,
  prinfref,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const [currentRow, setCurrentRow] = useState(null);
  //const [editUserModal, setEditUserModal] = useState(false);
  //const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const componentRef = useRef();
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
    // console.log({datestring, ms : datestring * 60000})
    let _date = new Date().setTime(datestring * 1000);
    return moment(_date).format("DD/MM/YYYY");
    // return _date.getDate() + "/" + _date.getMonth() + "/" + _date.getFullYear();
  };

  const getFormatedTime = (datestring) => {
    // console.log({datestring, ms : datestring * 60000})
    let _date = new Date().setTime(datestring * 1000);
    return moment(_date).format("hh:mm A");
    // return _date.getDate() + "/" + _date.getMonth() + "/" + _date.getFullYear();
  };

  const getUserName = (id) => {
    let name = "";
    users.forEach((el) => {
      if (el.userID === id) return (name = el.name);
    });
    return name;
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.root} id="reportstable" ref={prinfref}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          searched={searched}
          setSearched={setSearched}
          requestSearch={requestSearch}
          cancelSearch={cancelSearch}
          searchColumn={searchColumn}
          setSearchColumn={setSearchColumn}
          converttoPDF={handlePrint}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            {/* <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows?.length}
              headCells={headCells}
            /> */}
            <TableHead>
              <TableRow>
                {headCells.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, color: "black" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(
                filteredRows ? filteredRows : [],
                getComparator(order, orderBy)
              ).map((row, i) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    key={Math.random()}
                    style={{
                      border: "none",
                      borderBottom: `1px solid #253344`,
                    }}
                  >
                    {/* <TableCell className={classes.tableCell} component="th">
                        {row.cabinetID}
                      </TableCell> */}
                    <TableCell className={classes.tableCell} align="left">
                      {getFormatedDate(parseInt(row.timestamp))}
                      {/* {new Date(parseInt(row.timestamp)).toString()} */}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {getFormatedTime(parseInt(row.timestamp))}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.compartmentID}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.itemID}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.compartmentOperation}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {getUserName(row.userID)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">
                      {row.userID}
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
    </div>
  );
};

export default EnhancedTable;
