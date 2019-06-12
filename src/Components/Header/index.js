import React from 'react';
import {
  string, func,
} from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import NewBook from '../NewBook';

import { useStyles } from './utils/styles';

const Header = ({
  title, onSearch, onAddNewClick,
}) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          {title}
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'Search' }}
            onChange={onSearch}
          />
        </div>
        <NewBook onAddNewClick={onAddNewClick} />

      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: string,
  onSearch: func,
  onAddNewClick: func,
};

Header.defaultProps = {
  title: '',
  onSearch: null,
  onAddNewClick: null,
};

export default Header;
