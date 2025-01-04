import React, { useState, useEffect } from "react";
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
  Container,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const StyledLink = styled(Link)({
  textDecoration: "none",
});

const postContainerStyle = {
  marginBottom: "50px",
  marginTop: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

function Post(props) {
  const { title, text, userId, userName, postId = 1 } = props; // Varsayılan değer
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Yorumları yenilemek için kullanılan fonksiyon
  const refreshComments = () => {
    fetch(`/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((result) => {
        setCommentList(result); // Sadece API'den gelen yorumları ayarla
        setIsLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError(error);
        setLoading(false);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded && !loading) {
      setLoading(true);
      refreshComments();
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    refreshComments(); // İlk yüklemede yorumları getir
  }, []);

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
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <FavoriteIcon style={liked ? { color: "red" } : null} />
          </IconButton>
          <IconButton
            aria-label="comment"
            onClick={handleExpandClick}
            disabled={loading}
          >
            <CommentIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <CircularProgress size={24} />
              </div>
            )}
            {error && <Typography color="error">Error loading comments</Typography>}
            {!loading &&
              isLoaded &&
              commentList.map((comment, index) => (
                <Comment
                  key={index}
                  userId={comment.userId}
                  userName={comment.userName}
                  text={comment.text}
                />
              ))}
            <CommentForm
              userId={userId}
              userName={userName}
              postId={postId}
              setCommentRefresh={refreshComments} // Yorumları yenilemek için fonksiyonu geçiyoruz
            />
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
