class Library {
    constructor(...books) {
        this.books = books;
    }

    deleteBook(index) {
        if(index < 0 || index > this.books.length) throw new RangeError("The index is out of bounds");        
        this.books.splice(index, 1);
    }

    displayBook(book) {
        if(!(book instanceof Book)) throw new TypeError ("You can only display books");

        const library = document.querySelector(".library");

        const display = document.createElement("div");
        display.classList.add("book");
        display.dataset.index = this.books.length - 1;
        
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

        const buttons = document.createElement("div");
        buttons.classList.add("book-buttons");

        const readButton = document.createElement("button");
        readButton.classList.add("read");
        const readImg = document.createElement("img");
        if(book.isRead) {
            readImg.src = "img/check-circle-outline.svg";
        }
        else {
            readImg.src = "img/checkbox-blank-circle-outline.svg";
        }
        readButton.appendChild(readImg);
        buttons.appendChild(readButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.dataset.index = this.books.length - 1;

        deleteButton.addEventListener("click", (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            document.querySelector(`.book[data-index="${index}"]`).remove();
            this.deleteBook(index);

            for(let i = index; i < this.books.length; i++) {
                const book = document.querySelector(`.book[data-index="${i + 1}"]`);
                book.dataset.index = i;
                book.querySelector(".delete").dataset.index = i;
            }
        });

        const deleteImg = document.createElement("img");
        deleteImg.src = "img/delete-outline.svg";
        deleteButton.appendChild(deleteImg);

        buttons.appendChild(deleteButton);
        display.appendChild(buttons);

        library.appendChild(display);
    }

    addBook(book) {
        if(!(book instanceof Book)) throw new TypeError ("You can only add books to the library");
        this.books.push(book);
        this.displayBook(book);
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
    closeForm();
}

