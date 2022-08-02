import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nested: {
    width: "95%",
    margin: "auto",
  },
  listItem: {
    background: "#29394D",
  },
  collapseItem: {
    marginTop: theme.spacing(0.5),
  },
  card: {
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  cardHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
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
  loader: {
    color: "#1a90ff",
    animationDuration: "550ms",
  },
  formControl: {
    width: "100%",
  },
}));

export default useStyles;
