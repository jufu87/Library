const myLibrary = [];

function Book(title, author, release, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.release = release;
    this.read = read;
}

function addBookToLibrary(title, author, release, pages, read) {
    const newBook = new Book(title, author, release, pages, read);
    myLibrary.push(newBook);
    console.log(newBook);
}

addBookToLibrary("Night Watch", "Terry Pratchett", "2002", 464, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "1937", 295, true);