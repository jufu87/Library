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
    new Book("A Wizard of Earthsea", "Ursula K. Le Guin", "205", true),
    new Book("The Left Hand of Darkness", "Ursula K. Le Guin", "304", false),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", "1178", true),
    new Book("Going Postal", "Terry Pratchett", "416", true),
    // new Book("The Count of Monte Cristo", "Alexandre Dumas", "1276", true),
    // new Book("Dune", "Frank Herbert", "412", true),

    // new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", "224", true),
    // new Book("The Name of the Wind", "Patrick Rothfuss", "662", true),
    // new Book("The Wise Man's Fear", "Patrick Rothfuss", "994", true),
    // new Book("The Lies of Locke Lamora", "Scott Lynch", "722", false),

];

// Show the modal
openModalButton.addEventListener("click", () => {
    bookModal.showModal();
    document.getElementById("siteContent").classList.add("blurred");
});

// Hide the modal
cancelButton.addEventListener("click", () => {
    bookModal.close();
    document.getElementById("siteContent").classList.remove("blurred");
});

bookModal.addEventListener("click", (event) => {
    const rect = bookModal.getBoundingClientRect();

    // If clicked outside the modal's bounding box, close it
    if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    ) {
        bookModal.close();
    }
});

// For pressing esc
bookModal.addEventListener("close", () => {
    document.getElementById("siteContent").classList.remove("blurred");
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
    const statusItem = document.createElement("li");
    const pagesItem = document.createElement("li");


    titleItem.textContent = `${book.title}`;
    authorItem.textContent = `By ${book.author}`;
    statusItem.textContent = `Status: ${book.read ? "Read" : "Not read"}`;
    pagesItem.textContent = `Pages: ${book.pages}`;


    list.append(titleItem, authorItem, statusItem, pagesItem);
    card.appendChild(list);

    // Button container (flex row)
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Toggle Read button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.setAttribute("aria-label", book.read ? "Mark as unread" : "Mark as read");



    const toggleIcon = document.createElement("img");
    toggleIcon.src = book.read ? "images/book-read.svg" : "images/book-not-read.svg";
    toggleIcon.alt = book.read ? "Read" : "Not read";
    toggleIcon.classList.add("icon");

    toggleButton.appendChild(toggleIcon);


    toggleButton.addEventListener("click", () => {
        book.toggleRead();
        toggleIcon.src = book.read ? "images/book-read.svg" : "images/book-not-read.svg";
        toggleIcon.alt = book.read ? "Read" : "Not read";
        toggleButton.setAttribute("aria-label", book.read ? "Mark as unread" : "Mark as read");
        statusItem.textContent = `Status: ${book.read ? "Read" : "Not read"}`;
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("aria-label", "Delete book");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete-cross.svg";
    deleteIcon.alt = "Delete";
    deleteIcon.classList.add("icon");

    deleteButton.appendChild(deleteIcon);

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