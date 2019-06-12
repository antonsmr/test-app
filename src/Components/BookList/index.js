import React from 'react';
import {
  arrayOf, shape, func,
} from 'prop-types';
import List from '@material-ui/core/List';

import BookItem from '../BookItem';

const BookList = ({
  list, classes, onExpand, onRemoveClick,
}) => (
  <List className={classes.root}>
    {list.map(item => (
      <li key={list.indexOf(item)}>
        <BookItem item={item} onExpand={onExpand} onRemoveClick={onRemoveClick} />
      </li>
    ))}
  </List>
);

BookList.propTypes = {
  list: arrayOf(shape()),
  classes: func,
  onExpand: func,
  onRemoveClick: func,
};

BookList.defaultProps = {
  list: {},
  classes: null,
  onExpand: null,
  onRemoveClick: null,
};

export default BookList;
