import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import useStyles from "./ModalStyle";

const ModalComponent = ({ open, setOpen, title, modalStyle, children }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      style={modalStyle}
      className={classes.modal}
      open={open}
      onClose={() => setOpen(!open)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{title}</h2>
          <p id="transition-modal-description">{children}</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
