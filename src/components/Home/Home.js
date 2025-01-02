import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import { Container } from "@mui/material";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  
  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "column",  // Postları alt alta sıralamak için
          alignItems: "center",     // Ortalamak için
          backgroundColor: "#cfe8fc",
          height: "100vh",
          paddingTop: 5,
        }}
      >
        {postList.map((post) => (
          <Post userId= {post.userId} userName= {post.userName} key={post.id} title={post.title} text={post.text} />
        ))}
      </Container>
    );
  }
}

export default Home;
