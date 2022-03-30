import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import { useState } from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
// ----------------------------------------------------------------------
//navigate to search something
import { useNavigate } from "react-router-dom";

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "block",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

const SearchToolBar = () => {
  const { department } = useParams();
  const [name, setKeyword] = useState("");

  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(
        `/dashboard/requestinventory/inventoryitems/${department}/${name}`
      );
    } else {
      navigate(`/dashboard/requestinventory/inventoryitems/${department}`);
    }
  };

  return (
    <RootStyle>
      <SearchStyle
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search product..."
        startAdornment={
          <InputAdornment position="end">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: "text.disabled" }}
            />
          </InputAdornment>
        }
      />
      <Button onClick={searchSubmitHandler}>
        <Icon icon="dashicons:search" color="blue" width="30" />
      </Button>
    </RootStyle>
  );
};
export default SearchToolBar;
