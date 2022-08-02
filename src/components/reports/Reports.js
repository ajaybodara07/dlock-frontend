import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { listUsers } from "../../actions/user";

import {
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  listReports,
} from "../../actions/site";
import MainLayout from "../layout/MainLayout";
import Spinner from "../layout/Spinner";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./ReportsTable";
import Modal from "../modal/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import XLSX from "xlsx";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as AWS from "aws-sdk";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import PrintIcon from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { useReactToPrint } from "react-to-print";
import GetAppIcon from "@material-ui/icons/GetApp";
// import FileDownloadIcon from '@material-ui/icons/FileDownload';
// import FileDownloadOutlinedIcon from '@material-ui/icons/FileDownloadOutlined';
// AWS.config.update({
//   region: "us-east-1",
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
//   accessSecretKey: process.env.REACT_APP_AWS_SECRET_KEY,
// });
// console.log({ process: process.env });
// const client = new AWS.CloudWatchLogs({ apiVersion: "2014-03-28" });

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "95%",
    margin: "auto",
  },
  formControl: {
    width: "100%",
  },
  listItem: {
    background: "#29394D",
  },
  collapseItem: {
    marginTop: theme.spacing(0.5),
  },
  card: {
    background: "#29394D",
    color: "#fff",
    borderRadius: 0,
  },
  button: {
    borderRadius: 30,
    padding: "10px 20px",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10, 10, 10),
    borderRadius: 30,
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      padding: theme.spacing(10, 10, 10),
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      padding: theme.spacing(10, 5, 10, 5),
    },
  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  loader: {
    color: "#1a90ff",
    animationDuration: "550ms",
  },
}));

const Reports = ({
  site: { currentSiteID, tasks, loading, report },
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  listReports,
  user,
  auth,
  listUsers,
}) => {
  const classes = useStyles();
  console.log({ report });
  const componentRef = useRef();

  const [assignMemberModal, setAssignMemberModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);
  const [targetUser, settargetUser] = useState("");

  const inputRef = useRef(null);

  const lowercaseKeys = (data) => {
    return data.map((obj) => {
      var key,
        keys = Object.keys(obj);
      var n = keys.length;
      var newobj = {};
      while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = obj[key];
      }

      return newobj;
    });
  };

  useEffect(() => {
    if (!loading) {
      listUsers();
      // listTasks(currentSiteID)
      // window.print();
      const body = {
        beforeDate: selectedbeforeDate.getTime(),
        afterDate: selectedafterDate.getTime(),
        currentSiteID,
        user: auth?.user.name,
      };
      settargetUser(auth?.user.name);
      listReports(body);
    }
    // eslint-disable-next-line
  }, [loading]);

  const headCells = [
    // {
    //   id: "cabinet",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "Locker Operations Report",
    // },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Date",
    },
    {
      id: "time",
      numeric: false,
      disablePadding: false,
      label: "Time",
    },
    {
      id: "compartment",
      numeric: true,
      disablePadding: false,
      label: "Compartment",
    },
    {
      id: "item_id",
      numeric: true,
      disablePadding: false,
      label: "Item",
    },
    {
      id: "operation",
      numeric: true,
      disablePadding: false,
      label: "Operation",
    },
    {
      id: "userName",
      numeric: true,
      disablePadding: false,
      label: "User name",
    },
    {
      id: "user",
      numeric: true,
      disablePadding: false,
      label: "userID",
    },
  ];
  const [selectedbeforeDate, setSelectedbeforeDate] = React.useState(
    new Date()
  );
  const [selectedafterDate, setSelectedafterDate] = React.useState(new Date());

  const handleDateBeforeChange = (date) => {
    console.log(date.getTime());
    setSelectedbeforeDate(date);
  };
  const handleDateAfterChange = (date) => {
    console.log(date.getTime());
    setSelectedafterDate(date);
  };
  const GenerateReports = () => {
    console.log({ selectedafterDate, selectedbeforeDate });
    const body = {
      beforeDate: selectedbeforeDate.getTime(),
      afterDate: selectedafterDate.getTime(),
      currentSiteID,
      user: targetUser,
    };
    listReports(body);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <MainLayout title="Reports">
      {currentSiteID ? (
        !loadingTask && !loading && report ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <FormControl
                  variant="filled"
                  required
                  style={{ marginTop: "10px" }}
                  className={classes.formControl}
                >
                  <InputLabel id="targetUserID">Target User</InputLabel>
                  <Select
                    name="targetUserID"
                    labelId="targetUserID"
                    value={targetUser}
                    onChange={(e) => {
                      settargetUser(e.target.value);
                    }}
                    required
                  >
                    {user?.users.map((data) => (
                      <MenuItem value={data.userID}>{data.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl
                  variant="filled"
                  required
                  className={classes.formControl}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="From"
                      value={selectedbeforeDate}
                      onChange={handleDateBeforeChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <FormControl
                    variant=""
                    required
                    className={classes.formControl}
                  >
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="To"
                      value={selectedafterDate}
                      onChange={handleDateAfterChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </FormControl>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6} sm={5}>
                <Tooltip title="Generate Reports">
                  <Button
                    type="submit"
                    onClick={() => {
                      GenerateReports();
                    }}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginLeft: 20 }}
                  >
                    <InsertDriveFileOutlinedIcon /> Generate Report
                    {/* <AssessmentRoundedIcon /> */}
                  </Button>
                </Tooltip>
                <Tooltip title="Print reports">
                  <Button
                    onClick={() => {
                      handlePrint();
                    }}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, marginLeft: 20 }}
                  >
                    <GetAppIcon /> Download PDF
                    {/* <PrintIcon /> */}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>

            <Table
              users={user.users}
              rows={report}
              headCells={headCells}
              setAssignMemberModal={setAssignMemberModal}
              id={currentSiteID}
              editTask={editTask}
              deleteTask={deleteTask}
              prinfref={componentRef}
            />
          </>
        ) : (
          <Spinner />
        )
      ) : (
        <p>No site selected</p>
      )}
      {/* Assign Group User Modal */}
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  site: state.site,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  listTasks,
  loadTasks,
  registerTask,
  editTask,
  deleteTask,
  listReports,
  listUsers,
})(Reports);
