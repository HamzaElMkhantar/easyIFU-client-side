import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Link, useLocation } from "react-router-dom";

function BarLinks({ pages }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState("");
  React.useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#021d41", marginBottom: "px", padding: "0" }}
    >
      <div className="container">
        <Toolbar disableGutters>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    style={
                      page.link === currentPage
                        ? { marginRight: "10px" }
                        : { color: "black" }
                    }
                    to={page.link}
                    textAlign="center"
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AccountTreeIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />

          <Box
            style={{ display: "flex", justifyContent: "" }}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Link
                to={page.link}
                className="mx-2"
                style={
                  page.link !== currentPage 
                    ? {
                        color: "#ecf0f3",
                        fontWeight: "500",
                        marginRight: "10px",
                        padding: "2px 2px",
                      }
                    : {
                        color: "#ecf0f3",
                        fontWeight: "500",
                        marginRight: "10px",
                        padding: "2px 2px",
                        borderBottom: "1px solid #fff",
                      }
                }
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default BarLinks;
