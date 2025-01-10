import React from 'react'

// material UI
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material'

//routes
import { Link } from 'react-router-dom'

const SideBar = () => {

  const drawerWidth = 240
  return (
    <Box sx={{display: 'flex'}}>
        <Drawer variant='permanent' sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}>
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
  )
}

export default SideBar