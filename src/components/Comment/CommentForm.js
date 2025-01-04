import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CardContent, InputAdornment, OutlinedInput, Avatar, Button } from "@mui/material";

const CommentContainer = styled(CardContent)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
});

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  boxShadow: "none",
  color: "white",
});

function CommentForm(props) {
  const { userId, userName, postId, setCommentRefresh } = props;
  const [text, setText] = useState("");

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setCommentRefresh(); // Yorumları yenile
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    saveComment();
    setText(""); // Input'u temizle
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <CommentContainer>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(e) => handleChange(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <StyledLink to={`/users/${userId}`}>
              <SmallAvatar
                sx={{
                  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>
            </StyledLink>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </InputAdornment>
        }
        value={text}
        sx={{ color: "black", backgroundColor: "white" }}
      />
    </CommentContainer>
  );
}

export default CommentForm;
