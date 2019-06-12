import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { func, shape, array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import BookList from '../../Components/BookList';
import Header from '../../Components/Header';

import { fetchBooks, setFilteredBooks } from '../../actions/book';

class Home extends Component {
  static propTypes = {
    fetchBooks: func.isRequired,
    setFilteredBooks: func.isRequired,
    book: shape({
      list: array,
      filteredBooks: array,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isFiltering: false,
    };
  }

  componentDidMount() {
    this.props.fetchBooks();
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
    }));

    return useStyles;
  }

  onSearch = (e) => {
    const { value } = e.target;

    if (value) {
      this.setState({ isFiltering: true });
      this.props.setFilteredBooks(value);
    } else this.setState({ isFiltering: false });
  }

  render = () => {
    const { list, filteredBooks } = this.props.book;
    const { isFiltering } = this.state;
    const classes = this.getStyles();
    const books = isFiltering ? filteredBooks : list;

    return (
      <Fragment>
        <Header title="Books" onSearch={this.onSearch} />
        <div className="main container">
          <BookList list={books} classes={classes} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
