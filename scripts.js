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
    new Book("Night Watch", "Terry Pratchett", "464", true),
    new Book("The Hobbit", "J.R.R. Tolkien", "295", true),
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

// Lets every book toggle its own .read status
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

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

    titleItem.textContent = `Title: ${book.title}`;
    authorItem.textContent = `Author: ${book.author}`;
    pagesItem.textContent = `Page count: ${book.pages}`;

    list.append(titleItem, authorItem, pagesItem);
    card.appendChild(list);

    // Button container (flex row)
    const buttonGroup = document.createElement("div");
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "10px";
    buttonGroup.style.padding = "0.5em 1em";

    // Toggle Read button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.read ? "Read" : "Not read";
    toggleButton.classList.add("toggle-button");

    toggleButton.addEventListener("click", () => {
        book.toggleRead();
        toggleButton.textContent = book.read ? "Read" : "Not read";
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        deleteBook(book.id);
    });

    buttonGroup.append(toggleButton, deleteButton);
    card.appendChild(buttonGroup);

    libraryContainer.appendChild(card);
}



function deleteBook(id) {
    // Remove book from the library array
    const index = library.findIndex(book => book.id === id);
    if (index !== -1) {
        library.splice(index, 1);
    }

    // Remove card from the DOM
    const card = document.querySelector(`.book-card[data-id="${id}"]`);
    if (card) {
        card.remove();
    }
}




// Initial render
library.forEach(renderBookCard);
