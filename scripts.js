const bookDialog = document.querySelector("#bookDialog");
const showButton = document.querySelector("#showButton");
const form = document.querySelector("#form");
const right = document.querySelector(".right");

const titleDom = document.querySelector('#title');
const authorDom = document.querySelector('#author');
const pagesDom = document.querySelector('#pages');
const readDom = document.querySelector('#read');
const confirmBtn = document.querySelector('#confirm-btn');
const cancelBtn = document.querySelector("#cancel-btn");

const myLibrary = [
  {
    id: crypto.randomUUID(),
    title: "Night Watch",
    author: "Terry Pratchett",
    pages: "464",
    read: true
  },
  {
    id: crypto.randomUUID(),
    title: "The Hobbit",
    author: "J.R.R. Tolkie",
    pages: "295",
    read: true
  }
];

// Show the modal
showButton.addEventListener("click", () => {
  bookDialog.show();
});

// Close the modal
cancelBtn.addEventListener("click", () => {
  bookDialog.close();
});

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(
    titleDom.value,
    authorDom.value,
    pagesDom.value,
    readDom.checked
  );
  form.reset();
  bookDialog.close();
});

// Book constructor with UUID
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // ✅ Unique identifier
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add new book and render it
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createCard(newBook);
}

// Create and display a book card
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = book.id; // Link DOM to book

  const cardUl = document.createElement("ul");

  const cardLiTitle = document.createElement("li");
  const cardLiAuthor = document.createElement("li");
  const cardLiPages = document.createElement("li");
  const cardLiRead = document.createElement("li");

  cardLiTitle.textContent = "Title: " + book.title;
  cardLiAuthor.textContent = "Author: " + book.author;
  cardLiPages.textContent = "Page count: " + book.pages;
  cardLiRead.textContent = "Have read: " + book.read;

  cardUl.append(cardLiTitle, cardLiAuthor, cardLiPages, cardLiRead);
  card.appendChild(cardUl);
  right.appendChild(card);
}

// Render all initial books
myLibrary.forEach(book => createCard(book));
