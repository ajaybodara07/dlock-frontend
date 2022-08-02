import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 40,
  },
  item: {
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -3,
    marginBottom: -3,
    background: "#2B3E59",
    padding: 10,
    boxShadow: "inset 0 0 0 3px #4D72A1",
  },
  container: {
    marginLeft: 3,
    display: "grid",
    gridTemplateColumns: "repeat(8, 80px)",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

const CompartmentGraphics = ({ compartments }) => {
  const classes = useStyles();

  // <div
  //   className={classes.item}
  //   style={{
  //     background:
  //       c.compartmentState === "occupied" ? "#8E6F38" : "#2B3E59",
  //     boxShadow:
  //       c.compartmentState === "occupied"
  //         ? "inset 0 0 0 3px #F5A623"
  //         : "inset 0 0 0 3px #4D72A1",
  //   }}
  // >
  //   {/* {c.compartmentID} */}
  //   A1
  // </div>

  const itemBorder = (c) => {
    return {
      background: c.compartmentState === "occupied" ? "#F5A623" : c.compartmentState === "withdrawn" ? "red":"green",
      boxShadow:
        // c.compartmentState === "occupied"
        //   ? "inset 0 0 0 3px #F5A623"
          // :
           "inset 0 0 0 2px #253344 ",
    };
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* A */}
        <div className={classes.column}>
          {compartments.slice(0, 20).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              A{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* B */}
        <div className={classes.column}>
          {compartments.slice(20, 40).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              B{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* C */}
        <div className={classes.column}>
          {compartments.slice(40, 53).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              C{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* D */}
        <div className={classes.column}>
          {compartments.slice(53, 66).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              D{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* E */}
        <div className={classes.column}>
          {compartments.slice(66, 79).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              E{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* F */}
        <div className={classes.column}>
          {compartments.slice(79, 92).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              F{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* G */}
        <div className={classes.column}>
          {compartments.slice(92, 112).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              G{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
        {/* H */}
        <div className={classes.column}>
          {compartments.slice(112, 132).map((c, i) => (
            <div style={itemBorder(c)} className={classes.item}>
              H{i + 1 < 10 ? "0" + (i + 1) : i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompartmentGraphics;
