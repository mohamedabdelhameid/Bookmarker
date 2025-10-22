// inputs and btn
let bookName = document.getElementById("exampleInputName1");
let bookUrl = document.getElementById("exampleInputUrl1");
let addBtn = document.getElementById("btnAddBook");
// table data
let tableData = document.getElementById("tableData");

let books = localStorage.Books ? JSON.parse(localStorage.Books) : [];

let addBook = () => {
  if (
    validationName() &&
    validationUrl() &&
    bookName.value != "" &&
    bookUrl.value != ""
  ) {
    let bookData = { name: bookName.value, url: bookUrl.value };

    books.push(bookData);

    localStorage.setItem("Books", JSON.stringify(books));
    clearData();
    showData();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please read the line under the input!",
    });
  }
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
});

let clearData = () => {
  bookName.value = "";
  bookUrl.value = "";
};

let showData = () => {
  tableData.innerHTML = "";

  if (books.length > 0) {
    for (let i = 0; i < books.length; i++) {
      tableData.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${books[i].name}</td>
          <td>
            <a href="${books[i].url}" target="_Blank">
              <button class="btn btn-success">
                <span><i class="fa-solid fa-eye"></i></span>
                visit
              </button>
            </a>
          </td>
          <td>
            <button class="btn btn-danger" onclick="deleteBook(${i})">
              <span><i class="fa-solid fa-trash"></i></span>
              delete
            </button>
          </td>
        </tr>`;
    }
  }
};

showData();

let deleteBook = (i) => {
  books.splice(i, 1);
  localStorage.setItem("Books", JSON.stringify(books));
  showData();
};

// validation
let validationName = () => {
  const bookNameRegex = /^[A-Z][\sa-z0-9_\-\']{2,}$/;

  if (bookNameRegex.test(bookName.value)) {
    bookName.classList.add("is-valid");
    bookName.classList.remove("is-invalid");
    document
      .getElementById("nameNotValid")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    bookName.classList.add("is-invalid");
    bookName.classList.remove("is-valid");
    document
      .getElementById("nameNotValid")
      .classList.replace("d-none", "d-block");
    return false;
  }
};

let validationUrl = () => {
  const bookUrlRegex = /^https:\\\\[A-Za-z0-9_\\]{2,}\.[a-z]{2,}\\[A-Za-z0-9_\\\-\']{2,}$/;

  if (bookUrlRegex.test(bookUrl.value)) {
    bookUrl.classList.add("is-valid");
    bookUrl.classList.remove("is-invalid");
    document
      .getElementById("urlNotValid")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    bookUrl.classList.add("is-invalid");
    bookUrl.classList.remove("is-valid");
    document
      .getElementById("urlNotValid")
      .classList.replace("d-none", "d-block");
    return false;
  }

};

