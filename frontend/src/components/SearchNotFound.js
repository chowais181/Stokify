import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';
import { Icon } from "@iconify/react";
// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography
        gutterBottom
        align="center"
        variant="subtitle1"
        color="green"
        fontSize={42}
      >
        <Icon icon="ic:outline-search-off" width="50" color="red" />
        <br/>
        Not found
      </Typography>
      <Typography variant="body2" align="center" fontSize={20}>
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Paper>
  );
}
