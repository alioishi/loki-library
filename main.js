let library = [];

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

function addBooktoLibrary(library, title, author, pages, isRead) {
    library.push(new Book(title, author, pages, isRead));
}