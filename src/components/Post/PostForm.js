import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  InputAdornment,
  Button,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

// Link stilini düzenlemek için
const StyledLink = styled(Link)({
  textDecoration: "none", // Alt çizgiyi kaldırmak için
});

// CSS sınıfı
const postContainerStyle = {
  marginBottom: "50px",
  marginTop: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

function PostForm(props) {
  const {  userId, userName, refreshPosts } = props; 
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  
  const savePost = () => {
    fetch("/posts",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),
        },            
            body: JSON.stringify({
            title: title,
            userId: userId,
            text: text,
        }),
    })
    .then((res) => res.json())
    .catch((err) => console.log("error"))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);

  }

  const handleText = (value) => {
    setText(value);
    setIsSent(false);

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setIsSent(false);
  };
  
  return (
    <div className="postContainer" style={postContainerStyle}>
        <Snackbar open={isSent} autoHideDuration={5000} onClose={handleClose}> 
            <Alert onClose={handleClose} severity="success">
                Your post is sent!
            </Alert>
        </Snackbar>
      <Card
        sx={{
          width: "800px",
          height: "auto",
          margin: "0 auto",
        }}
      >
        <CardHeader
          avatar={
            <StyledLink to={`/users/${userId}`} className="link">
              <Avatar
                sx={{
                  background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                  color: "white",
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </StyledLink>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-title"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            >
            </OutlinedInput>
          }
          sx={{ textAlign: "left" }}
        />
        <CardContent>
          <OutlinedInput
            id="outlined-adornment-text"
            multiline
            placeholder="Text"
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(i) => handleText(i.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  style={{
                    background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                    color: "white",
                  }}
                  onClick={handleSubmit}
                >
                  Post
                </Button>
              </InputAdornment>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
