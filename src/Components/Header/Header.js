
import AppContext from "../../Context/context";
import { useContext } from "react";
import { getCurrentUser } from "../../Reducer/action";
import MyLink from "../Link/Link";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "@mui/material";
import { useMemo } from "react";




function Header({ children }) {
    const { state, dispatch } = useContext(AppContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const settings = useMemo(()=>{
      return [{
        name:'Profile',
        event:function(){
          console.log(this.name);
        } 
      }, {
        name:'Account',
        event:function(){
          console.log(this.name);
        } 
      }, {
        name:'Dashboard',
        event:function(){
          console.log(this.name);
        } 
      },  {
        name:'Logout',
        event: () => {
          dispatch(getCurrentUser(null));
          localStorage.clear("token");
        }
      }]
    },[]) 

    const pages = useMemo(()=>{
      return [{
        name:'Home',
        link:'/home',
        display:"block"
    }, {
        name:'Login',
        link:'/login',
        display:state.user ?'none' : 'block'
    }, {
        name:'Register',
        link:'/register',
        display:state.user ?'none' : 'block'
    }]
    },[state])
  
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name}
                            sx={{
                              display: page.display
                            }}
                  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <MyLink href={page.link}>{page.name}</MyLink>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display:page.display }}
                >
                    <MyLink style={{color:'white'}} underline="none" href={page.link}>{page.name}</MyLink>
                 
                </Button>
              ))}
            </Box>

           {state.user && (<Box sx={{ flexGrow: 0 }}>
            <Typography 
              sx={{
                display: {xs: "none", md: "inline-block"} ,
                marginRight:5,
                fontFamily:'Roboto',
              }}
              variant="span" >Hello {state.user.name}</Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={state.user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={()=>{
                    handleCloseUserMenu()
                    setting.event()
                  }}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>)
            }
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{marginTop:'100px'}}>{children}</div>
    </>
  );
}

export default Header;

{
  /* <div style={{backgroundColor:'#ccc', height:50}}>
            <Link to='/home'>Home</Link>
         {!state.user &&(
         <span>  
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </span>
        
        )}
        </div>
        {
            state.user&&<div>
                <span>Hello {state.user.name}</span>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        }
        */
}
