import React from 'react';
import {
  arrayOf, shape, func,
} from 'prop-types';
import List from '@material-ui/core/List';

import BookItem from '../BookItem';

const BookList = ({
  list, classes,
}) => (
  <List className={classes.root}>
    {list.map(item => (
      <li>
        <BookItem item={item} key={list.indexOf(item)} />
      </li>
    ))}
  </List>
);

BookList.propTypes = {
  list: arrayOf(shape()),
  classes: func,
};

BookList.defaultProps = {
  list: {},
  classes: null,
};

export default BookList;
