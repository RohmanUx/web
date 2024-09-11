'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserContext';
import { useMutation } from '@tanstack/react-query';
import apiCall from '@/helper/apiCall';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar as MUIAvatar,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, Logout } from '@mui/icons-material';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useContext(UserContext);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiCall.post('/api/auth/logout');
      return data;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      setUser(null);
      router.replace('/login');
    },
    onError: (error) => {
      console.log('Logout failed:', error);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setIsOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        p: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} href="/eventSearch">
          <ListItemText primary="Explore" />
        </ListItem>
        <ListItem component={Link} href="/event">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} href="/event">
          <ListItemText primary="Helper" />
        </ListItem>
      </List>
      <Divider />
      {user?.email && (
        <List>
          <ListItem>
            <ListItemText primary={`Points: ${user.points ?? 'N/A'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Balance: ${user.balance ?? 'N/A'}`} />
          </ListItem>
          <ListItem 
            onClick={() => {
              router.push(user.role === 'ADMIN' ? '/admin/profile' : '/user/profile');
              handleMenuClose();
            }}
          >
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={2}
      sx={{
        backdropFilter: 'blur(20px)',
        paddingInline: { xs: 2, md: 9.4 },
        backgroundColor: pathname === '/login' || pathname === '/register'
          ? 'transparent'
          : 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'medium',
            fontSize: { xs: 20, md: 30 },
            opacity: 0.7,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder', fontSize: 32,  }}>
            LunoEvent 
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 , }}>
          <Button color="inherit" component={Link} href="/eventSearch">
            Explore
          </Button>
          <Button color="inherit" component={Link} href="/event">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} href="/event">
            Helper
          </Button>
        </Box>
        {user?.email ? (
          <div
            className="relative flex items-end lg:xl:w-44 justify-end"
            onMouseEnter={handleMenuOpen}
            onMouseLeave={handleMenuClose}
          >
            <IconButton onClick={handleMenuOpen} className='flex'>
              <MUIAvatar
                src={user.image ? `http://localhost:8000${user.image}` : '/pngegg.png'}
              />
            </IconButton>
            {isOpen && (
              <Menu
                anchorEl={menuAnchor}
                open={isOpen}
                onClose={handleMenuClose}
                sx={{ mt: 2, minWidth: 200 }}
              >
                <MenuItem>
                  <Typography variant="body1">Points: {user.points ?? 'N/A'}</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant="body1">Balance: {user.balance ?? 'N/A'}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    router.push(user.role === 'ADMIN' ? '/admin/profile' : '/user/profile');
                    handleMenuClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            )}
          </div>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => router.replace('/login')}>
              Login
            </Button>
            <Button variant="outlined" onClick={() => router.replace('/register')}>
              Register
            </Button>
          </Box>
        )}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ '& .MuiDrawer-paper': { width: 250 } }}
        >
          {drawerContent}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};
