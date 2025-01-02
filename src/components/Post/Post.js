import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; // Link bileşenini import edin
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from '@mui/icons-material/Comment';

// Link stilini düzenlemek için
const StyledLink = styled(Link)({
  textDecoration: 'none',  // Alt çizgiyi kaldırmak için
});

function Post(props) {
  const { title, text, userId, userName } = props; // userId ve userName'i props olarak alıyoruz
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);

  }

  return (
    <div className="postContainer" style={{ marginBottom: 20, width: "100%", display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "800px",  // Postların genişliği 800px olacak
          height: "auto",  // Yükseklik esnek olacak
          margin: "0 auto",  // Ortalanması için
        }}
      >
        <CardHeader
          avatar={
            <StyledLink to={`/users/${userId}`} className="link"> {/* Link bileşeni burada düzgün şekilde kullanıldı */}
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </StyledLink>
          }
          title={title}
          sx={{ textAlign: "left" }} // Başlıkları sola hizalamak için
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon style={liked? {color: "red"}:null}/>
          </IconButton>

          <IconButton 
            aria-label="comment" 
            onClick={handleExpandClick}
            sx={{ marginLeft: 'auto' }} // Yorum ikonunu sağa hizalamak için
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
