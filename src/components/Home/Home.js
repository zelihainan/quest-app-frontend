import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import { Container } from "@mui/material";
import PostForm from "../Post/PostForm";
import { OutlinedInput } from '@mui/material';


function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  
  const refreshPosts = () => {
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
      )
  }

  useEffect(() => {
    refreshPosts()
  }, [postList]);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        fixed
        sx={{
          display: "flex",
          flexDirection: "column",  // Postları alt alta sıralamak için
          alignItems: "center",     // Ortalamak için
          backgroundColor: "#f0f5ff",
          height: "100vh",
          paddingTop: 5,
        }}
      >
        <PostForm userId= {1} userName= {"ddd"}  refreshPosts = {refreshPosts} />
        {postList.map((post) => (
          <Post userId= {post.userId} userName= {post.userName} 
          title={post.title} text={post.text}></Post>
        ))}
      </div>
    );
  }
}

export default Home;
