import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    myBooks : [],
  }
  componentDidMount(){
      BooksAPI.getAll().then(books => 
          this.setState({myBooks: books})
      )
  }
  changeShelf(book, newShelf){
      // change the shelf of a book. check if the new shelf = to the preivous
      // if new shelf is not none, then add to myBooks with the right shelf.
      // if the shelf changed to the same shelf, no need to update
      if(book.shelf === newShelf){
          return;
      }
      BooksAPI.update(book, newShelf).then(data => {
          this.setState(function(prevState){
              // remove the book from myBooks
              let newBooks = prevState.myBooks.filter(b => (b.id !== book.id));
              // add the newBook back to the shelf or remove it if the shelf is none
              if(newShelf && newShelf !== "none"){
                  book.shelf=newShelf;
                  newBooks.push(book);
              }
              return {myBooks: newBooks}
          });
       })
  }
  render() {
    return (
        <div className="app">
            <Route path='/' exact render={() => (<BookList books={this.state.myBooks} changeShelf={(book, newShelf) => this.changeShelf(book, newShelf)}/>)}/>
            <Route path='/search' exact render={() => (<SearchBooks myBooks={this.state.myBooks} changeShelf={(book, newShelf) => this.changeShelf(book, newShelf)}/>)}/>
        </div>
    )
  }
}

export default BooksApp
