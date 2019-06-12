import React from 'react';
import {
  func,
} from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    color: '#fff',
  },
}));

const NewBook = ({
  onAddNewClick,
}) => {
  const classes = useStyles();
  return (
    <div className="flex justify-center new-book">
      <Button size="medium" className={classes.margin} onClick={onAddNewClick}>
        Add new
      </Button>
    </div>
  );
};

NewBook.propTypes = {
  onAddNewClick: func,
};

NewBook.defaultProps = {
  onAddNewClick: null,
};

export default NewBook;
