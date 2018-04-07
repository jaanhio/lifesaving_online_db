import React from "react";

const links = ["Terms", "Privacy", "Legal", "Contact SLSS"];

const renderLinks = links.map(link => {
  return (
    <li style={{ margin: "0 30px" }}>
      <a
        href="#"
        style={{ textDecoration: "none", color: "#878787", fontWeight: 100 }}
      >
        {link}
      </a>
    </li>
  );
});

const Footer = () => {
  return (
    <div style={{ position: "absolute", bottom: "10%" }}>
      <ul style={{ listStyleType: "none", display: "inline-flex", padding: 0 }}>
        {renderLinks}
      </ul>
      <h5
        style={{
          textAlign: "center",
          fontWeight: 100,
          color: "#878787",
          fontSize: "1em"
        }}
      >
        &copy; Copyright 2018
      </h5>
    </div>
  );
};

export default Footer;
