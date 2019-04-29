class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

document.getElementById('book-form').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {

        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }

    else {

        // Add book to list
        ui.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
