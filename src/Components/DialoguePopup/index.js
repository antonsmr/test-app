import React from 'react';
import {
  func, bool, shape,
} from 'prop-types';
import Popup from 'reactjs-popup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import BookItem from '../BookItem';

const RemovePopup = ({
  onRemoveClick, open, toggleRemovePopup, itemToRemove, onClose,
}) => {
  const getStyles = () => {
    const useStyles = makeStyles(theme => ({
      root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
      },
    }));

    return useStyles;
  };
  const classes = getStyles();

  return (
    <Popup onClose={onClose} open={open} position="right center">
      <div className="popup-edit-container">
        <h4>Are you sure you want to remove this book?</h4>
        <BookItem item={itemToRemove} hideBtns />
        <div className="btns-wrapper">
          <Button variant="contained" className={classes.button} onClick={toggleRemovePopup}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={onRemoveClick}>
            Remove
          </Button>
        </div>
      </div>
    </Popup>
  );
};

RemovePopup.propTypes = {
  onRemoveClick: func,
  open: bool,
  toggleRemovePopup: func,
  itemToRemove: shape(),
  onClose: func,
};

RemovePopup.defaultProps = {
  onRemoveClick: null,
  open: false,
  toggleRemovePopup: null,
  itemToRemove: {},
  onClose: null,
};

export default RemovePopup;
