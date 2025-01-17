import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal, List, ListItem, Radio, Box } from "@mui/material"; // Güncel bileşenler
import { useState } from "react";

function Avatar(props) {
  const { avatarId, userId, userName } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const saveAvatar = () => {
    // Kullanıcı bilgilerini localStorage'dan alıyoruz
    const currentUserData = {
      id: localStorage.getItem("currentUser"), // Kullanıcı ID'si
      userName: localStorage.getItem("username"), // Kullanıcı adı
      password: localStorage.getItem("password"), // Şifre
      avatar: selectedValue, // Değiştirilen avatar
    };
  
    // Sunucuya güncelleme isteği gönder
    fetch(`/users/${localStorage.getItem("currentUser")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"), // Token bilgisi
      },
      body: JSON.stringify(currentUserData), // Güncel kullanıcı bilgileri
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sunucu isteği başarısız oldu.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Avatar başarıyla güncellendi:", data);
        // Kullanıcı bilgilerini tekrar almak (isteğe bağlı)
        return fetch(`/users/${localStorage.getItem("currentUser")}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("tokenKey"),
          },
        });
      })
      .then((res) => res.json())
      .then((updatedData) => {
        console.log("Güncel kullanıcı bilgileri:", updatedData);
      })
      .catch((err) => {
        console.error("Bir hata oluştu:", err);
      });
  };
  
  
  
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Card sx={{ maxWidth: 305, margin: 4 }}>
        <CardMedia
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          component={"img"}
          image={`/avatars/avatar${selectedValue}.png`}
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            User info
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem("currentUser") === userId ? (
            <Button size="small" onClick={handleOpen}>
              Change Avatar
            </Button>
          ) : (
            ""
          )}
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <List dense sx={style}>
          {[1, 2, 3, 4, 5, 6].map((key) => {
            const labelId = `checkbox-list-secondary-label-${key}`;
            return (
              <ListItem
                key={key}
                onClick={() => console.log("Clicked")}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    style={{ maxWidth: 100 }}
                    component="img"
                    alt={`Avatar n°${key}`}
                    image={`/avatars/avatar${key}.png`}
                    title="User Avatar"
                  />
                  <Radio
                    edge="end"
                    value={key}
                    onChange={handleChange}
                    checked={"" + selectedValue === "" + key}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
}

export default Avatar;
