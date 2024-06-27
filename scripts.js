// let title = document.querySelector("#title").value;
// let author = document.querySelector("#author").value;
// let pages = document.querySelector("#pages").value;
// let release = document.querySelector("#release").value;
// let read = document.querySelector("#read").value;


const myLibrary = [];

function Book(title, author, pages, release, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.release = release;
    this.read = read;
}

function addBookToLibrary(title, author, pages, release, read) {
    const newBook = new Book(title, author, pages, release, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Night Watch", "Terry Pratchett", 464, 2002, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, 1937, true);
// addBookToLibrary(title, author, pages, release, read);

function loopThroughLibrary(library){
    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
    }
}

loopThroughLibrary(myLibrary);