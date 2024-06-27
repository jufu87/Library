// let title = document.querySelector("#title").value;
// let author = document.querySelector("#author").value;
// let pages = document.querySelector("#pages").value;
// let release = document.querySelector("#release").value;
// let read = document.querySelector("#read").value;
let newBookBtn = document.querySelector("#newbook-button");
document.querySelector("#form").style.visibility = "hidden";
let right = document.querySelector(".right");

// will hold an array of book objects
const myLibrary = [];

// constructor that builds new book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// function that pushes book to the array
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("Night Watch", "Terry Pratchett", 464, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
// addBookToLibrary(title, author, pages, read);


// function that display the books on cards
function createCard(library) {
    library.forEach(function (book) {
        let card = document.createElement("div");
        let cardUl = document.createElement("ul")
        let cardLiTitle = document.createElement("li")
        let cardLiAuthor = document.createElement("li")
        let cardLiPages = document.createElement("li")
        let cardLiRead = document.createElement("li")

        card.classList.add("card");

        right.appendChild(card);
        card.appendChild(cardUl);
        cardUl.appendChild(cardLiTitle);
        cardUl.appendChild(cardLiAuthor);
        cardUl.appendChild(cardLiPages);
        cardUl.appendChild(cardLiRead);

        cardLiTitle.textContent = "Title: " + book.title;
        cardLiAuthor.textContent = "Author: " + book.author;
        cardLiPages.textContent = "Page count: " + book.pages;
        cardLiRead.textContent = "Have read: " + book.read;
        // console.log(book.title);
        // console.log(book.author);
        // console.log(book.pages);
        // console.log(book.read);
    })
}

createCard(myLibrary);


// eventlistener below is to make form visible

newBookBtn.addEventListener('click', function () {
    document.querySelector("#form").style.visibility = "visible";
    console.log("clicked");
});