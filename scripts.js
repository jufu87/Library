const bookModal = document.querySelector("#bookModal");
const openModalButton = document.querySelector("#openModalButton");
const bookForm = document.querySelector("#bookForm");
const libraryContainer = document.querySelector(".library-container");

const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readCheckbox = document.querySelector("#readCheckbox");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");

const library = [
    {
        id: crypto.randomUUID(),
        title: "Night Watch",
        author: "Terry Pratchett",
        pages: "464",
        read: true,
    },
    {
        id: crypto.randomUUID(),
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: "295",
        read: true,
    },
];

// Show the modal
openModalButton.addEventListener("click", () => {
    bookModal.show();
});

// Hide the modal
cancelButton.addEventListener("click", () => {
    bookModal.close();
});

// Submit the form
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readCheckbox.checked
    );
    bookForm.reset();
    bookModal.close();
});

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add a book and render it
function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.push(newBook);
    renderBookCard(newBook);
}

// Create a book card in the DOM
function renderBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const list = document.createElement("ul");

    const titleItem = document.createElement("li");
    const authorItem = document.createElement("li");
    const pagesItem = document.createElement("li");
    const readItem = document.createElement("li");

    titleItem.textContent = `Title: ${book.title}`;
    authorItem.textContent = `Author: ${book.author}`;
    pagesItem.textContent = `Page count: ${book.pages}`;
    readItem.textContent = `Have read: ${book.read ? "Yes" : "No"}`;

    list.append(titleItem, authorItem, pagesItem, readItem);
    card.appendChild(list);
    libraryContainer.appendChild(card);
}

// Initial render
library.forEach(renderBookCard);
