import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { Box } from "@mui/material";

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    fetch("/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },      
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {user ? (
        <Avatar avatarId={user.avatarId} userId={userId} userName={user.userName} />
      ) : null}
    </Box>
  );
}

export default User;
