import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivatePage = ({
  auth: { isAuthenticated, loading, token },
  title,
  ...rest
}) => {
  useEffect(() => {
    document.title = title;
  }, [token, title]);
  return !isAuthenticated && !loading ? (
    <Redirect to="/login" />
  ) : (
    <Route {...rest} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivatePage);
