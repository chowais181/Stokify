import { Icon } from "@iconify/react";
import { useState } from "react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Stack,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
} from "@mui/material";

// ----------------------------------------------------------------------
//navigate to search something
import { useNavigate } from "react-router-dom";

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const Searchbar = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/dashboard/inventoryitems/${keyword}`);
    } else {
      navigate("/dashboard/inventoryitems");
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 0.5, sm: 1.5 }}
              >
                <Input
                  type="text"
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: "text.disabled", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                {/* <Input type="submit" value="Search"/> */}
                <Button variant="contained" type="submit" onClick={handleClose}>
                  Search
                </Button>
              </Stack>
            </form>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};
export default Searchbar;
