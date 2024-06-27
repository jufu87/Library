// let title = document.querySelector("#title").value;
// let author = document.querySelector("#author").value;
// let pages = document.querySelector("#pages").value;
// let release = document.querySelector("#release").value;
// let read = document.querySelector("#read").value;
let newBookBtn = document.querySelector("#newbook-button");
document.querySelector("#form").style.visibility = "hidden";
let right = document.querySelector(".right");

// will hold an array of book objects
const myLibrary = [{
    title: "Night Watch",
    author: "Terry Pratchett",
    pages: "464",
    read: true
},
{
    title: "The Hobbit",
    author: "J.R.R. Tolkie",
    pages: "295",
    read: true
}];

// temporary to update display with initial objects:
createCard(myLibrary[0].title, myLibrary[0].author, myLibrary[0].pages, myLibrary[0].read);
createCard(myLibrary[1].title, myLibrary[1].author, myLibrary[1].pages, myLibrary[1].read);


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
    createCard(title, author, pages, read);
}

// temporary:
addBookToLibrary("The Wizard of Earthsea", "Le Guin", 364, true);

// addBookToLibrary(title, author, pages, read);


// function that display the books on cards
function createCard(title, author, pages, read) {
    // library.forEach(function (book) {
    console.log(title);
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

        cardLiTitle.textContent = "Title: " + title;
        cardLiAuthor.textContent = "Author: " + author;
        cardLiPages.textContent = "Page count: " + pages;
        cardLiRead.textContent = "Have read: " + read;
        // console.log(book.title);
        // console.log(book.author);
        // console.log(book.pages);
        // console.log(book.read);
    // })
}


// eventlistener below is to make form visible

newBookBtn.addEventListener('click', function () {
    document.querySelector("#form").style.visibility = "visible";
    console.log("clicked");
});



// getting values from the form
const titleDom=document.querySelector('#title');
const authorDom= document.querySelector('#author');
const pagesDom=document.querySelector('#pages');
const readDom=document.querySelector('#read');
const confirmBtn=document.querySelector('#confirm-btn');

confirmBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    addBookToLibrary(titleDom.value, authorDom.value, pagesDom.value, readDom.value);
});