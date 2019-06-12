import React from 'react';
import {
  shape, func, bool,
} from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    margin: theme.spacing(1),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    margin: theme.spacing(1),
  },
  EditIcon: {
    width: '20px',
    height: '20px',
  },
}));

const BookItem = ({
  item, onExpand, onRemoveClick, hideBtns,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={null}
        action={!hideBtns && (
          <Fab onClick={() => onExpand(item)} size="small" color="primary" aria-label="Edit" className={classes.fab}>
            <EditIcon className={classes.EditIcon} />
          </Fab>
        )}
        title={item.title}
        subheader={`${item.author} - ${item.date}`}
      />
      <CardMedia
        className={classes.media}
        image={item.image || 'https://www.myfirestorm.com/l/img/placeholder-img.jpg'}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      {!hideBtns && (
        <CardActions disableSpacing>
          <Button
            onClick={() => onRemoveClick(item)}
            variant="outlined"
            size="small"
            color="primary"
            className={
            clsx(classes.expand, {
              [classes.expandOpen]: false,
            })}
          >
          Remove
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

BookItem.propTypes = {
  item: shape(),
  onExpand: func,
  onRemoveClick: func,
  hideBtns: bool,
};

BookItem.defaultProps = {
  item: {},
  onExpand: null,
  onRemoveClick: null,
  hideBtns: false,
};

export default BookItem;
