class Library {
    constructor(...books) {
        this.books = books;
    }

    addBook(book) {
        if(!(book instanceof Book)) throw new TypeError ("You can only add books to the library");
        this.books.push(book);
    }

    displayBook(book) {
        if(!(book instanceof Book)) throw new TypeError ("You can only display books");

        const library = document.querySelector(".library");

        const display = document.createElement("div");
        display.classList.add("book");
        
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = book.title;
        display.appendChild(title);

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = book.author;
        display.appendChild(author);

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = book.pages + " pages";
        display.appendChild(pages);

        const isRead = document.createElement("button");
        isRead.classList.add("is-read");
        const img = document.createElement("img");
        if(book.isRead) {
            img.src = "img/check-circle-outline.svg";
        }
        else {
            img.src = "img/checkbox-blank-circle-outline.svg";
        }
        isRead.appendChild(img);
        display.appendChild(isRead);

        library.appendChild(display);
    }

    displayAllBooks() {
        this.books.forEach(this.displayBook);
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
    }
}

const myLibrary = new Library();
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, false));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, true));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, false));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, true));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, false));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, true));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, false));
myLibrary.addBook(new Book("Monkey King", "Wu Kong", 1000, true));
myLibrary.displayAllBooks();

setUpNewBookButton();

function setUpNewBookButton() {
    document.querySelector("#new-book").addEventListener("click", openForm);
}

function openForm() {
    document.getElementById("form-popup").style.display = "block";
}

function closeForm() {
    document.getElementById("form-popup").style.display = "none";
}

function submitForm() {
    const formData = new FormData(document.querySelector("#form-popup form"));

    const book = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), document.querySelector("form #read").checked);

    myLibrary.addBook(book);
    myLibrary.displayBook(book);
    closeForm();
}

