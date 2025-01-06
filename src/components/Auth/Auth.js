import {
    FormControl,
    InputLabel,
    Input,
    Button,
    FormHelperText,
    Box,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleUsername = (value) => {
      setUsername(value);
    };
  
    const handlePassword = (value) => {
      setPassword(value);
    };
  
const sendRequest = (path) => {
  fetch("/auth/" + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        // HTTP durum kodu kontrolü
        throw new Error(`HTTP Error: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      localStorage.setItem("tokenKey", result.message);
      localStorage.setItem("currentUser", result.userId);
      localStorage.setItem("userName", username);
    })
    .catch((err) => {
      console.error("Error:", err.message);
      // Hata mesajını ekranda göstermek için bir state ekleyebilirsiniz
    });
};

  
    const handleButton = (path) => {
      sendRequest(path);
      setUsername("");
      setPassword("");
      navigate("/auth");
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
      </Box>
    );
  }
  
  export default Auth;
  