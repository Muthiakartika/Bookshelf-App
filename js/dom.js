const UNCOMPLETED_LIST_BOOK_ID = "unread";
const COMPLETED_LIST_BOOK_ID = "read";
const BOOK_ITEMID = "bookId";

// Membuat data baru untuk ditambahkan
function makeBook(title, author, year, isCompleted){

    const bookTitle = document.createElement("h2");
    bookTitle.innerText = title;
 
    const bookAuthor = document.createElement("h4");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookTitle, bookAuthor, bookYear);
 
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createDeleteButton()
        );
    }
    else{
        container.append(
            createCheckButton(),
            createDeleteButton()
        );
    }
 
    return container;
}

// membuat tombol undo untuk mengembalikan nilai data
function createUndoButton() {
    return createButton("undo-button", function(event){
        undoBookToCompleted(event.target.parentElement);
    });
}

// membuat tombol hapus untuk menghapus data
function createDeleteButton() {
    return createButton("trash-button", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

//membuat tombol check untuk mengecek data
function createCheckButton() {
    return createButton("check-button", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

// membuat tombol baru
function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event)
    });

    return button;
}

// menambahkan data buku  belum selesai dibaca
function addBook(){

    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookYear = document.getElementById("yearReleased").value;

    const book = makeBook(bookTitle, bookAuthor, bookYear, false);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
    
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    
    uncompletedBOOKList.append(book); 
    
    updateDataToStorage();
}

function addToCompletedList(){
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookYear = document.getElementById("yearReleased").value;

    const book = makeBook(bookTitle, bookAuthor, bookYear, true);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);
    
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    
    uncompletedBOOKList.append(book); 
    
    updateDataToStorage();
}

// menambahkan data buku yang telah selesai dibaca
function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h4").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

// menghapus data buku
function removeBookFromCompleted(taskElement){

    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

// mengembalikan nilai data buku
function undoBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".inner > h2").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h4").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

