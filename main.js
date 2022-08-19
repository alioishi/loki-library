class Library {
    constructor(...books) {
        this.books = books;
    }

    addBook(book) {
        if(!(book instanceof Book)) throw new TypeError ("You can only add books to the library");
        this.books.push(book);
    }
}

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    
    toString() {
        return this.title + " by " +
            this.author + ", " +
            this.pages + " pages, " +
            (this.isRead) ? "read" : "not read";
    };
};

const myLibrary = new Library();