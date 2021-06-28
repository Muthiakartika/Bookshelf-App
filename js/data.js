const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

// mengecek ketersediaan storage dalam browser 
function isStorageExist(){

    if(typeof(Storage) === undefined)
    {
        alert("Maaf, browser kamu tidak mendukung local storage");
        return false;
    }

    return true;
}

// menyimpan data
function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// mengload data yang telah ditambahkan didalam storage
function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let bookData = JSON.parse(serializedData);

    if(bookData !== null)
    {
        books = bookData;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

// mengupdate data dalam storage
function updateDataToStorage(){

    if(isStorageExist())
    {
        saveData();
    }
}

//menulis data object buku baru
function composeBookObject(title, author, year, isCompleted){
    return{
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

// mencari data buku yang ada
function findBook(bookId){
    for (book of books){
        if(book.id === bookId)
        {
            return book;
        }
    }
    return null;
}

// mencari data buku yang ada sesuai index
function findBookIndex(bookId){
    let bookIndex = 0;
    for (book of books){
        if(book.id === bookId)
        {
            return bookIndex;
        }

        bookIndex++;
    }

    return -1;
}

// me-render data buku yang ada dalam array books
function refreshDataFromBookshelf(){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for(book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            listCompleted.append(newBook);
        }
        else{
            listUncompleted.append(newBook);
        }
    }
}