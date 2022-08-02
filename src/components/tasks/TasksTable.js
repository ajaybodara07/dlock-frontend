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
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  const { headCells, classes, order, orderBy, onRequestSort,onSelectAllClick,numSelected, rowCount,showArchived,setshowArchived } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const handleChange = (event) => {
    setshowArchived(event.target.checked);
  };
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  return (
    <TableHead>
      <TableRow
        style={{
          borderBottom: "10px solid #253344",
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all Tasks' }}
          />
        </TableCell>
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
              ) :null}
            </TableSortLabel>
          </TableCell>
        ))}
          <TableCell>
          <FormControlLabel
              control={
                <Switch
                  checked={showArchived}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Archived"
            />   
          </TableCell>
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
  numSelected,deleteTask
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={clsx(classes.root,{
      [classes.highlight]: numSelected > 0,
    })}>
    {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) :  <FormControl
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
          <MenuItem value="taskCode">Task Code</MenuItem>
          <MenuItem value="aircraftReg">Aircraft Reg</MenuItem>
          <MenuItem value="description">Description</MenuItem>
          <MenuItem value="taskStatus">Task Status</MenuItem>
        </Select>
      </FormControl>}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={()=>{deleteTask()}} />
          </IconButton>
        </Tooltip>
      ) : <SearchBar
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
      />}
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

const EnhancedTable = ({ id, rows, headCells, editTask, deleteTask,archiveTask,user,aircrafts }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selected, setSelected] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [showArchived,setshowArchived] = useState(false);

  const [searched, setSearched] = useState("");
  const [searchColumn, setSearchColumn] = useState("all_col");

  useEffect(() => {
    setFilteredRows(rows);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    let _filter = rows.filter(tasks=>tasks.taskStatus==="not_complete");
    console.log(_filter,">>>>>>>>>>>>>")
    setFilteredRows(_filter);
    // setFilteredRows(rows);
    // eslint-disable-next-line
  }, [rows]);

  const changeTaskStatus = async () =>{
  let data =  rows.filter(tasks=>selected.some(taskid=>tasks.taskID==taskid)).map(c=>{return {...c,taskStatus:"completed"}});
  // filteredRows.findIndex(tasks=>selected.some(taskid=>tasks.taskID==taskid))
//  let _data = rows.map((tasks,i)=>{
//     data.map((task,index)=>{
//       if(tasks.taskID ===task.taskID){
//         rows[i] = data[index]
        
//       }
//     })
//   })
await archiveTask({  siteID: id,task:data})
setSelected([])
  // console.log(filteredRows.findIndex(tasks=>selected.some(taskid=>tasks.taskID==taskid)))
  // setFilteredRows(_data)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredRows.map((n) => n.taskID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;


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
  useEffect(()=>{
if(!showArchived){
 let _filter = rows.filter(tasks=>tasks.taskStatus!=="complete");
 console.log(_filter)
 setFilteredRows(_filter);
}else{
 setFilteredRows(rows);

}
  },[showArchived])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          searched={searched}
          setSearched={setSearched}
          requestSearch={requestSearch}
          cancelSearch={cancelSearch}
          searchColumn={searchColumn}
          setSearchColumn={setSearchColumn}
          numSelected={selected.length}
          deleteTask={()=>{changeTaskStatus()}}
         
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
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows?.length}
              headCells={headCells}
              showArchived={showArchived}
              setshowArchived={setshowArchived}
            />
            <TableBody>
              {stableSort(
                filteredRows ? filteredRows : [],
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  const isItemSelected = isSelected(row.taskID);
                  const labelId = `enhanced-table-checkbox-${i}`;
                  const border = i === filteredRows.length - 1 ? 0 : 5;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.taskID)}
                      role="checkbox"
                      tabIndex={-1}
                      aria-checked={isItemSelected}
                      key={row.taskID}
                      style={{
                        borderBottom: `${border}px solid #253344`,
                      }}
                      selected={isItemSelected}
                    >
                       <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {/* {"0000" + row.taskID.split("-").join("0000")} */}
                        {row.taskID}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.taskName}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {row.aircraftReg}
                      </TableCell>
                      {/* <TableCell className={classes.tableCell} align="left">
                        {row.description}
                      </TableCell> */}
                      <TableCell className={classes.tableCell} align="left">
                        {row.taskStatus}
                      </TableCell>

                      <TableCell className={classes.tableCell} align="left">
                        {/* <Grid
                          // style={{ marginLeft: -5, minWidth: 100 }}
                          container
                          justify="flex-end"
                        > */}
                          <IconButton
                            // edge="end"
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
                          {/* <IconButton
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
                          </IconButton> */}
                        {/* </Grid> */}
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
        title="Edit Task"
        modalStyle={{ alignItems: "flex-start" }}
      >
        <Formik
          initialValues={{
            taskCode: currentRow?.taskID || "",
            aircraftReg: currentRow?.aircraftReg || "",
            description: currentRow?.description || "",
            taskStatus: currentRow?.taskStatus || "",
            taskName: currentRow?.taskName || "",
            targetUserID: currentRow?.targetUser || "",
          }}
          onSubmit={async (values) => {
            await editTask({
              id: currentRow?.id || "",
              taskCode: values.taskCode,
              aircraftReg: values.aircraftReg,
              description: values.description,
              taskStatus: values.taskStatus,
              targetUser: values.targetUserID,
              siteID: id,
              taskName:  values.taskName,
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
                    disabled
                    value={values.taskCode}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="taskName"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Task Name"
                    onChange={handleChange}
                    variant="filled"
                    value={values.taskName}
                    required
                  />
                </Grid>
                <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="aircraftReg">Aircraft Reg</InputLabel>
                    <Select
                      name="aircraftReg"
                      labelId="aircraftReg"
                      onChange={handleChange}
                      required
                      value={values.aircraftReg}
                    >
                      {aircrafts?.map(data=>
                          <MenuItem value={data.aircraftReg}>
                          {data.aircraftReg}
                           </MenuItem>
                      )}
                    
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item>
                  <FormControl
                    variant="filled"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="targetUserID">Target User</InputLabel>
                    <Select
                      name="targetUserID"
                      labelId="targetUserID"
                      onChange={handleChange}
                      required
                      value={values.targetUserID}
                    >
                      {user?.users.map(data=>
                          <MenuItem value={data.userID}>
                          {data.name}
                           </MenuItem>
                      )}
                    
                    </Select>
                  </FormControl>
                </Grid> */}
                {/* <Grid item>
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
                    name="targetUser"
                    style={{ width: "100%" }}
                    id="filled-basic"
                    label="Target User"
                    value={values.targetUser}
                    onChange={handleChange}
                    variant="filled"
                    required
                  />
                </Grid> */}
                {/* <Grid item>
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
                </Grid> */}
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
                      <MenuItem value="complete">
                     Completed
                      </MenuItem>
                      <MenuItem value="active">
                     Active
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
      {/* Delete Task Modal */}
      <Modal open={deleteTaskModal} setOpen={setDeleteTaskModal}>
        <Formik
          initialValues={{}}
          onSubmit={async () => {
            await deleteTask({
              id: currentRow?.taskID || "",
              siteID: id,
            });
            setDeleteTaskModal(false);
          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Typography variant="h6" align="center">
                {`Are you sure you want to delete Task ${currentRow?.taskID}`}
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ marginTop: 20 }}
                justify="center"
              >
                <Grid item>
                  <Button
                    onClick={() => setDeleteTaskModal(false)}
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

export default EnhancedTable;
