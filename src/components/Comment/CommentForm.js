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
    const {userId, userName, postId } = props;
    const [text, setText] = useState("");
    const saveComment = () => {
        fetch("/comments",
        {
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
        .catch((err) => console.log("error"))
    }


    const handleSubmit = () => {
        saveComment();
        setText("");
    }
    
    const handleChange = (value) => {
        setText(value);
    }
    return (
    <CommentContainer>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 250 }}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment={
          <InputAdornment position="start">
                      <StyledLink to={`/users/${userId}`}>
                          <Avatar
                          sx={{
                            background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                            color: "white",
                          }}
                        >
                          {userName.charAt(0).toUpperCase()}
                        </Avatar>            
                        </StyledLink>
                    </InputAdornment>
        }
        endAdornment = {
            <InputAdornment position="end">
                <Button
                  variant="contained"
                  style={{
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
