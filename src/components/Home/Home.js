import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

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
        sx={{
          display: "flex",
          flexDirection: "column",  // Postları alt alta sıralamak için
          alignItems: "center",     // Ortalamak için
          backgroundColor: "#f0f5ff",
          height: "100vh",
          paddingTop: 5,
        }}
      >
        {localStorage.getItem("currentUser") == null ? "": <PostForm userId= {localStorage.getItem("currentUser")} userName= {localStorage.getItem("userName")}  refreshPosts = {refreshPosts} />}
        {postList.map((post, index) => (
        <Post 
          key={index}  // Benzersiz bir anahtar ekledim
          likes={post.postLikes} 
          postId={post.postId} 
          userId={post.userId} 
          userName={post.userName} 
          title={post.title} 
          text={post.text} 
        />
      ))}
      </div>
    );
  }
}

export default Home;
