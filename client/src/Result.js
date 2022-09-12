import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
// import "./App.css";
const Result = ({ o_img, s_data }) => {
  return (
    <div className="result" id="result">
      <h2>Hurrah! Found your twin</h2>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          // "& > :not(style)": {
          //   m: 1,
          //   width: 228,
          //   height: 228,
          // },
        }}
      >
        {/* <Paper elevation={5}>
          <img
            src={o_img}
            className="original_img"
            style={{ height: "100%" }}
          />
        </Paper> */}
        <Paper sx={{ height: "fit-content" }}>
          <img
            src={s_data.imageSrc}
            className="search_img"
            style={{ width: "228px", height: "228px" }}
          />
        </Paper>

        <div>
          <List
            sx={{
              width: "100%",
              maxWidth: 470,
              bgcolor: "background.paper",
              marginTop: "20px",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={s_data.full_name} src={s_data.imageSrc} />
              </ListItemAvatar>
              <ListItemText primary={s_data.full_name} secondary="Name" />
            </ListItem>
            {/* <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FingerprintIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={s_data.roll} secondary="Roll no" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MailOutlineIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${s_data.roll}@kiit.ac.in`}
                secondary="Mail"
              />
            </ListItem> */}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LinkedInIcon />
                </Avatar>
              </ListItemAvatar>
              <a
                href={s_data.profile}
                target="_blank"
                style={{ all: "unset", cursor: "pointer" }}
              >
                <ListItemText
                  primary={s_data.profile}
                  secondary="LinkedIn Profile"
                />
              </a>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={s_data.school} secondary={s_data.branch} />
            </ListItem>
          </List>
        </div>
      </Box>
    </div>
  );
};

export default Result;
