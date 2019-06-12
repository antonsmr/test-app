import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { func, shape, array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popup from 'reactjs-popup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import checkValidations from '../../utils/validator';
import { validations } from './utils/validations';

import BookList from '../../Components/BookList';
import Header from '../../Components/Header';
import InputErrors from '../../Components/InputErrors';
import DialoguePopup from '../../Components/DialoguePopup';

import {
  fetchBooks, setFilteredBooks, updateBook, addBook, removeBook,
} from '../../actions/book';

class Home extends Component {
  static propTypes = {
    fetchBooks: func.isRequired,
    setFilteredBooks: func.isRequired,
    updateBook: func.isRequired,
    addBook: func.isRequired,
    removeBook: func.isRequired,
    book: shape({
      list: array,
      filteredBooks: array,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFiltering: false,
      popupIsOpen: false,
      removePopupIsOpen: false,
      activeItem: {},
      errors: {},
      itemToRemove: {},
    };
  }

  componentDidMount() {
    this.props.fetchBooks();
  }

  addBook = () => {
    const { activeItem } = this.state;
    const capitalizedItem = {
      ...activeItem,
      author: this.capitalize(activeItem.author),
      title: this.capitalize(activeItem.title),
    };

    const errors = checkValidations(validations, capitalizedItem);

    if (errors && Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.setState({ newBook: false });
      this.props.addBook(capitalizedItem);
      this.toggleModal();
    }
  }

  getStyles = () => {
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
  }

  toggleModal = () => {
    this.setState(prevState => ({
      popupIsOpen: !prevState.popupIsOpen,
      errors: {},
    }));
  }

  toggleRemovePopup = () => {
    this.setState(prevState => ({
      removePopupIsOpen: !prevState.removePopupIsOpen,
    }));
  }

  onSearch = (e) => {
    const { value } = e.target;

    if (value) {
      this.setState({ isFiltering: true });
      this.props.setFilteredBooks(value);
    } else this.setState({ isFiltering: false });
  }

  onExpand = (item) => {
    this.setState({ popupIsOpen: true, activeItem: item });
  }

  onAddNewClick = () => {
    this.setState({ popupIsOpen: true, activeItem: {}, newBook: true });
  }

  onRemoveClick = (item) => {
    this.setState({ removePopupIsOpen: true, itemToRemove: item });
  }

  onRemoveAccept = () => {
    const { id } = this.state.itemToRemove;

    this.props.removeBook(id);
    this.setState({ itemToRemove: {}, removePopupIsOpen: false });
  }

  onClose = () => {
    this.setState({ popupIsOpen: false, removePopupIsOpen: false });
  }

  capitalize = (str) => {
    if (!str) return '';
    const newStr = str.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    return newStr.replace(/[^0-9a-z-A-Z ]/g, '');
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      activeItem: {
        ...prevState.activeItem,
        [name]: value,
      },
    }));
  }

  updateBook = () => {
    const { list } = this.props.book;
    const { activeItem } = this.state;
    const capitalizedItem = {
      ...activeItem,
      author: this.capitalize(activeItem.author),
      title: this.capitalize(activeItem.title),
    };
    const listWithUpdatedBook = list.map((l) => {
      if (activeItem.id === l.id) l = capitalizedItem; // eslint-disable-line
      return l;
    });

    const errors = checkValidations(validations, capitalizedItem);

    if (errors && Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.props.updateBook(listWithUpdatedBook);
      this.toggleModal();
    }
  }

  render = () => {
    const { list, filteredBooks } = this.props.book;
    const {
      isFiltering, popupIsOpen, activeItem, newBook, errors, removePopupIsOpen, itemToRemove,
    } = this.state;
    const classes = this.getStyles();
    const books = isFiltering ? filteredBooks : list;

    return (
      <Fragment>
        <Header title="Books" onSearch={this.onSearch} onAddNewClick={this.onAddNewClick} />
        <Popup onClose={this.onClose} open={popupIsOpen} position="right center">
          <div className="popup-edit-container">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Author</InputLabel>
              <Input name="author" id="author" value={activeItem.author || ''} onChange={this.handleChange} />
              {errors.author && <InputErrors errors={errors.author} />}
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Title</InputLabel>
              <Input name="title" id="title" value={activeItem.title || ''} onChange={this.handleChange} />
              {errors.title && <InputErrors errors={errors.title} />}
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Date</InputLabel>
              <Input name="date" id="date" value={activeItem.date || ''} onChange={this.handleChange} />
              {errors.date && <InputErrors errors={errors.date} />}
            </FormControl>
            <div className="btns-wrapper">
              <Button variant="contained" className={classes.button} onClick={this.toggleModal}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={newBook ? this.addBook : this.updateBook}>
                Save
              </Button>
            </div>
          </div>
        </Popup>
        {
          // eslint-disable-next-line react/jsx-wrap-multilines
          removePopupIsOpen && (<DialoguePopup
            open={removePopupIsOpen}
            onRemoveClick={this.onRemoveAccept}
            toggleRemovePopup={this.toggleRemovePopup}
            itemToRemove={itemToRemove}
            onClose={this.onClose}
          />)
        }
        <div className="main container">
          <BookList
            list={books}
            classes={classes}
            onExpand={this.onExpand}
            onRemoveClick={this.onRemoveClick}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ book }) => ({
  book,
});

const mapDispatchToProps = {
  fetchBooks,
  setFilteredBooks,
  updateBook,
  addBook,
  removeBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
