import React, { useState } from "react";

// material UI
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//routes
import { Link } from "react-router-dom";

const SideBar = () => {
  const drawerWidth = 240;
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashborad
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
            width: open ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              display: open ? "block" : "none",
            },
          }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/users">
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/cards">
            <ListItemText primary="Cards" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
