import React, { useEffect } from "react";
import { Route } from "react-router-dom";

const Page = ({ title, ...rest }) => {
  useEffect(() => {
    document.title = title;
  });
  return <Route {...rest} />;
};

export default Page;
