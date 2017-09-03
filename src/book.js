import React, {Component} from 'react'

class Book extends Component {
    render(){
        let book = this.props.book;
        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf ?book.shelf : 'none'} onChange={(e) => this.props.changeShelf(book,e.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors? book.authors[0]:"N/A" }</div>
            </div>
        )
    }
}


export default Book