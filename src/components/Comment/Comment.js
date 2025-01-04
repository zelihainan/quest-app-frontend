import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CardContent, InputAdornment, OutlinedInput, Avatar } from "@mui/material";

// Stil bileşenleri
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

function Comment(props) {
  const { text = "No comment", userId = 0, userName = "Anonymous" } = props;

  return (
    <CommentContainer>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <StyledLink to={`/users/${userId}`}>
              <SmallAvatar
                sx={{
                  background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)",
                  color: "white",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </SmallAvatar>
            </StyledLink>
          </InputAdornment>
        }
        sx={{ color: "black", backgroundColor: "white" }}
      />
    </CommentContainer>
  );
}

export default Comment;
