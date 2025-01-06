import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { LockOpen } from "@mui/icons-material";

function Navbar() {
  let navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate("/"); // Anasayfaya yönlendir
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Typography>
          {localStorage.getItem("currentUser") == null ? (
            <Link
              to="/auth"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "1rem",
              }}
            >
              Login/Register
            </Link>
          ) : (
            <div key="unique-profile-key">
              <IconButton onClick={onClick} color="inherit">
                <LockOpen />
              </IconButton>
              <Link
                to={"/users/" + localStorage.getItem("currentUser")}
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "0.5rem",
                }}
              >
                Profile
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
