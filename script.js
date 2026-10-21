const myLibrary = [];

function Book(id, title, author, pages, genre, hasRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.hasRead = hasRead;
}


function createBook(title, author, pages, genre, hasRead){
    const id = crypto.randomUUID();
    myLibrary.push(new Book(id, title, author, pages, genre, hasRead))
}


function showLibrary(){
    const bookLibrary = document.getElementsByClassName('bookLibrary');
    bookLibrary[0].innerText = '';
    
    for(book in myLibrary){
        const bookCard = document.createElement('div');
        bookCard.className = 'bookCard'
        bookCard.setAttribute('data-index',`${myLibrary[book].id}`)
        bookLibrary[0].appendChild(bookCard)

        const bookImage = document.createElement('div');
        bookImage.className = 'bookImage';
        bookImage.innerHTML = '<i class="fa-solid fa-book"></i>';

        const bookInfo = document.createElement('div');
        bookInfo.className = 'bookInfo';

        bookCard.append(bookImage, bookInfo);

        const bookTitle = document.createElement('h3');
        const bookAuthor = document.createElement('h4');
        const bookPagesAndGenre = document.createElement('p');
        const status = document.createElement('div');

        bookTitle.innerText = `${myLibrary[book].title}`;
        bookTitle.className = 'bookTitle';
        bookAuthor.innerText = `${myLibrary[book].author}`;
        bookAuthor.className = 'bookAuthor';
        bookPagesAndGenre.innerText = `${myLibrary[book].pages} pages · ${myLibrary[book].genre}`;
        bookPagesAndGenre.className = 'bookPagesAndGenre';
        status.className = 'status';

        bookInfo.append(bookTitle, bookAuthor, bookPagesAndGenre, status);

        const bookStatus = document.createElement('p');
        const markButton = document.createElement('button');

        if(myLibrary[book].hasRead){
            bookStatus.className = 'bookStatus readStatus';
            bookStatus.innerText = 'Read';
            markButton.className = 'markButton readStatus';
            markButton.innerText = 'Mark unread';
        }else{
            bookStatus.className = 'bookStatus unreadStatus';
            bookStatus.innerText = 'Unread';
            markButton.className = 'markButton unreadStatus';
            markButton.innerText = 'Mark read';
        }

        markButton.addEventListener('click', changeStatus)
        status.append(bookStatus, markButton);

        const deleteIcon = document.createElement("span");
        deleteIcon.className = 'deleteBook'
        deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can deleteBook"></i>'
        deleteIcon.addEventListener('click', deleteBook);

        bookCard.append(deleteIcon);
    }
}


function updateStatus(){
    const totalNum = document.querySelector('.totalNum');
    const readNum = document.querySelector('.readNum');
    const unreadNum = document.querySelector('.unreadNum');

    totalNum.innerText = `${myLibrary.length}`

    let read = 0;
    let unread = 0;

    myLibrary.forEach(book => {if(book.hasRead){read++}else{unread++}})

    readNum.innerText = `${read}`;
    unreadNum.innerText = `${unread}`;
}

function deleteBook(event){
    const index = event.target.closest('[data-index]').dataset.index;
    const arrIndex = myLibrary.findIndex(book => book.id === index);
    myLibrary.splice(arrIndex, 1);
    showLibrary();
    updateStatus();
}

function changeStatus(event){
    const status = event.target.classList;
    const index = event.target.closest('[data-index]').dataset.index;
    const arrIndex = myLibrary.findIndex(book => book.id === index);
    const bookStatus = event.target.previousElementSibling;
    const markButton = event.target;

    if(status.contains('unreadStatus')){
        bookStatus.className = 'bookStatus readStatus'
        bookStatus.innerText = 'Read';
        markButton.className = 'markButton readStatus'
        markButton.innerText = 'Mark unread';
        myLibrary[arrIndex].hasRead = true;
    }else{
        bookStatus.className = 'bookStatus unreadStatus'
        bookStatus.innerText = 'Unread';
        markButton.className = 'markButton unreadStatus'
        markButton.innerText = 'Mark read';
        myLibrary[arrIndex].hasRead = false;
    }

    updateStatus();
}

function openPopUp(){
    const dialog = document.getElementById('addBookPopUp');
    dialog.showModal();
}

function closePopUp(){
    const dialog = document.getElementById('addBookPopUp');
    dialog.close();
}

function getFormDetails(event){
    event.preventDefault();
    const form = document.getElementById('addBookForm');
    const bookTitle = document.getElementById('bookTitle').value;
    const bookGenre = document.getElementById('bookGenre').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookNumPages = document.getElementById('bookNumPages').value;
    const bookHasRead = document.querySelector('input[name="hasRead"]:checked').value;
    const bookStatus = bookHasRead === 'true'? true : false;

    createBook(bookTitle, bookAuthor, bookNumPages, bookGenre, bookStatus);
    showLibrary();
    updateStatus();
    form.reset();
    closePopUp();
}

const form = document.getElementById('addBookForm');
form.addEventListener('submit',(getFormDetails));

createBook('The Midnight Library','Matt Haig', 304, 'Fantasy', false)
createBook('Atomic Habits', 'James Clear', 320, 'Self-help', true)
createBook('Dune','Frank Herbert', 412, 'Science Fiction', true)

showLibrary();
updateStatus();