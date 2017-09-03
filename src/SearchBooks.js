import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './book'


class SearchBooks extends Component {
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    state={
        query:'',
        books:[]
    }
    checkBook = (book) => {
        let foundInShelf = this.props.myBooks.filter(b => (b.id === book.id));
        if(foundInShelf.length > 0)
            return foundInShelf[0];
        else
            return book;
    }
    updateQuery = (query) => {
        // update query state, search in backend, if found then check if the book in shelf, and add all books to the books in the state.
        query = query.trim();        
        if(query){
            this.setState({ query: query })
            BooksAPI.search(query, 20).then(result => (
                this.setState({books: result.map(book => this.checkBook(book))})
            ));
        }
    }
    
    render(){
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(event) => (this.updateQuery(event.target.value))}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {this.state.books && this.state.books.map(book => (
                    <Book book={book} key={book.id} changeShelf={(book, newShelf) => {
                              this.props.changeShelf(book, newShelf);
                              this.updateQuery(this.state.query);
                          }}/>
                  ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks