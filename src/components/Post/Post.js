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

  const refreshComments = () => {
    console.log("Fetching comments for postId:", postId);
    if (!postId) {
      console.error("postId is undefined");
      setLoading(false);
      return;
    }

    fetch(`/comments?postId=${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("Fetched comments:", result);
          setCommentList(Array.isArray(result) && result.length > 0 ? result : [
            {
              userId: 1,
              userName: "Dummy User",
              text: "This is a dummy comment.",
            },
          ]);
          setIsLoaded(true);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching comments:", error);
          setError(error);
          setLoading(false);
        }
      );
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
                <div key={index}>
                  <Comment
                    userId={comment.userId}
                    userName={comment.userName}
                    text={comment.text}
                  />
                  <CommentForm
                    userId={comment.userId}
                    userName={comment.userName}
                    postId={postId}
                  />
                </div>
              ))}
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
