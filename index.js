const library = [
  {
    title: "The Wealth of Nations",
    author: "A. Smith",
    pages: 295,
    read: false,
  },
  { title: "On Liberty", author: "J.S. Mill", pages: 295, read: false },
  {
    title: "What Is Seen and What Is Not Seen",
    author: "F. Bastiat",
    pages: 295,
    read: false,
  },
  { title: "Applied Economics", author: "T. Sowell", pages: 295, read: false },
  {
    title: "The Theory of Moral Sentiments",
    author: "A. Smith",
    pages: 295,
    read: false,
  },
  {
    title: "The Gulag Archipelago",
    author: "A. Solzhenitsyn",
    pages: 295,
    read: false,
  },
];

const formContainer = document.querySelector(".form-container");
const container = document.querySelector(".container");
const form = document.querySelector(".form");
form.addEventListener("submit", addBook);
formContainer.addEventListener("click", hideForm);

function renderLibrary() {
  container.innerHTML =
    library
      .map((item, index) => {
        return `<div class="card">
    <p><strong>${item.title}</strong></p>
    <p>by <strong>${item.author}</strong></p>
    <p><strong>${item.pages}</strong> pages</p>
    <p>${item.read ? "already read" : "not read yet"}</p>
    <button class="read-book card-btn" data-index="${index}">Mark as read</button>
    <button class="remove-book card-btn" data-index="${index}">Remove</button>
    </div>`;
      })
      .join("") +
    `<button class="card add-book-form">
    <span class="plus">+</span>
    <span>Add book</span>
    </button>`;
  const showFormButton = document.querySelector(".add-book-form");
  const readButtons = document.querySelectorAll(".read-book");
  const removeButtons = document.querySelectorAll(".remove-book");
  showFormButton.addEventListener("click", toggleFormVisibility);
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeBook);
  });
  readButtons.forEach((button) => {
    button.addEventListener("click", readBook);
  });
}
renderLibrary();

function addBook(event) {
  event.preventDefault();
  const formCollection = event.target.elements;
  const title = formCollection.title.value;
  const author = formCollection.author.value;
  const pages = formCollection.pages.value;
  const read = formCollection.read.checked;
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  renderLibrary();
  toggleFormVisibility();
  event.target.reset();
}
function removeBook(event) {
  const index = event.target.dataset.index;
  const readButtons = document.querySelectorAll(".read-book");
  const removeButtons = document.querySelectorAll(".remove-book");
  removeButtons.forEach((button) => {
    button.removeEventListener("click", removeBook);
  });
  readButtons.forEach((button) => {
    button.removeEventListener("click", readBook);
  });
  library.splice(index, 1);
  renderLibrary();
}

function readBook(event) {
  const index = event.target.dataset.index;
  library[index].read = !library[index].read;
  renderLibrary();
}

function hideForm(event) {
  if (event.target === formContainer) {
    toggleFormVisibility();
  }
}

function toggleFormVisibility() {
  formContainer.classList.toggle("invisible");
}

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "already read" : "not read yet"
  }.`;
};
