import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { setToast, removeToast } from "../../actions/toast";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Toast = ({ toast: { open, type, message }, setToast, removeToast }) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    removeToast();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  toast: state.toast,
});

export default connect(mapStateToProps, { setToast, removeToast })(Toast);

// import React from "react";
// import { connect } from "react-redux";

// const Toast = ({ toasts }) =>
//   toasts !== null &&
//   toasts.length > 0 &&
//   toasts.map((toast) => (
//     <div key={toast.id} className={`alert alert-${toast.alertType}`}>
//       {toast.msg}
//     </div>
//   ));

// const mapStateToProps = (state) => ({
//   toasts: state.toast,
// });

// export default connect(mapStateToProps)(Toast);
