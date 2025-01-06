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
import { PostWithAuth, DeleteWithAuth } from "../../services/HttpService";

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
  const { title, text, userId, userName, postId = 1, likes = [] } = props; // Varsayılan değer
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

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
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
    setIsLiked(!isLiked);
  };

  const saveLike = () => {
    PostWithAuth("/likes", {
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeId(data.id);
      })
      .catch((err) => console.log(err));
  };

  const deleteLike = () => {
    if (likeId) {
      DeleteWithAuth(`/likes/${likeId}`).catch((err) => console.log(err));
    }
  };

  const checkLikes = () => {
    const likeControl = likes.find(
      (like) => "" + like.userId === localStorage.getItem("currentUser")
    );
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  };

  useEffect(() => {
    checkLikes();
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
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleLike}
              disabled={disabled}
              aria-label="add to favorites"
            >
              <FavoriteIcon style={isLiked ? { color: "red" } : null} />
            </IconButton>
            <Typography variant="body2" sx={{ marginLeft: 0.005 }}>
              {likeCount}
            </Typography>
          </div>
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
            {!disabled && (
              <CommentForm
                userId={localStorage.getItem("currentUser")}
                userName={localStorage.getItem("userName")}
                postId={postId}
                setCommentRefresh={refreshComments} // Yorumları yenilemek için fonksiyonu geçiyoruz
              />
            )}
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
