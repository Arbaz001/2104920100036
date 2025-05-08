// src/components/Layout/Sidebar.jsx
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Feed, People, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Feed /></ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItem>
        <ListItem button component={Link} to="/top-users">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Top Users" />
        </ListItem>
        <ListItem button component={Link} to="/trending-posts">
          <ListItemIcon><TrendingUp /></ListItemIcon>
          <ListItemText primary="Trending Posts" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;