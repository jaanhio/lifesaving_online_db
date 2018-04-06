import React from "react";

import Typography from "material-ui/Typography";
import SadFaceIcon from "material-ui-icons/SentimentDissatisfied";
import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="display3">
        404 <SadFaceIcon style={{ fontSize: 45 }} />
      </Typography>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
