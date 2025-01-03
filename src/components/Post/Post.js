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

function Post(props) {
  const { title, text, userId, userName } = props; // userId ve userName'i props olarak alıyoruz
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="postContainer" style={postContainerStyle}>
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
                  background: "linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)", // Gradient arka plan
                  color: "white", // Metin rengi (kontrast için)
                }}
                aria-label="recipe"
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </StyledLink>
          }
          title={title}
          sx={{ textAlign: "left" }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>

          <IconButton
            aria-label="comment"
            onClick={handleExpandClick}
            sx={{ marginLeft: "auto" }}
          >
            <CommentIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details...</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
