import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    Box,
    Typography,
    Snackbar,
    Alert,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Hata mesajı için state
    const [success, setSuccess] = useState(false); // Başarı mesajı için state
    const [open, setOpen] = useState(false); // Snackbar için state
    const navigate = useNavigate();
  
    const handleUsername = (value) => {
      setUsername(value);
    };
  
    const handlePassword = (value) => {
      setPassword(value);
    };
  
    const sendRequest = async (path) => {
      try {
        const response = await fetch("http://localhost:3000/auth/" + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
  
        const result = await response.json();
  
        if (path === "register") {
          console.log("Register successful:", result.message);
          setSuccess(true); // Başarı durumunu göster
        } else if (path === "login") {
          localStorage.setItem("tokenKey", result.message);
          localStorage.setItem("currentUser", result.userId);
          localStorage.setItem("userName", username);
          navigate("/"); // Başarılı login sonrası anasayfaya yönlendir
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message); // Hata durumunu göster
        setOpen(true); // Snackbar'ı aç
      }
    };
  
    const handleButton = (path) => {
      sendRequest(path);
      setUsername("");
      setPassword("");
    };
  
    const handleCloseError = () => {
      setOpen(false); // Hata Snackbar'ını kapat
    };
  
    const handleCloseSuccess = () => {
      setSuccess(false); // Başarı Snackbar'ını kapat
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #E3F2FD 30%, #BBDEFB 90%)",
          padding: 2,
          paddingTop: 8,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            padding: 3,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            background: "white",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            Welcome to the QuestApp 🚀
          </Typography>
  
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              onChange={(i) => handleUsername(i.target.value)}
              id="username"
              value={username}
            />
          </FormControl>
  
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={(i) => handlePassword(i.target.value)}
              id="password"
              type="password"
              value={password}
            />
          </FormControl>
  
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              onClick={() => handleButton("register")}
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                color: "white",
                marginBottom: 2,
              }}
            >
              Register
            </Button>
  
            <FormHelperText sx={{ marginBottom: 2 }}>
              Already registered?
            </FormHelperText>
  
            <Button
              onClick={() => handleButton("login")}
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                color: "white",
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
  
        {/* Başarı Snackbar'ı */}
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            User successfully registered!
          </Alert>
        </Snackbar>
  
        {/* Hata Snackbar'ı */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  
  export default Auth;
  