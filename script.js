const apiUrl = 'https://openlibrary.org/search.json?q=';

// Function to fetch books from the API based on a search query
async function fetchBooks(query) {
    try {
        const response = await fetch(`${apiUrl}${encodeURIComponent(query)}`);
        const data = await response.json();
        displayBooks(data.docs); // Display the books using the data fetched
    } catch (error) {
        console.error('Error fetching books:', error); // Log any errors encountered during the fetch
    }
}

// Function to display the books in the DOM
function displayBooks(books) {
    const bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.innerHTML = ''; // Clear previous book entries

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book');

        // Generate URL for book cover image, or use a default image if cover is not available
        const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : 'default-cover.jpg';
        const title = book.title || 'No title available';
        const author = book.author_name ? book.author_name.join(', ') : 'Unknown author';
        const genre = book.subject ? book.subject.join(', ') : 'Genre not available';

        bookCard.innerHTML = `
            <img src="${coverUrl}" alt="Book cover" class="book-cover" style="width: 100px; height: auto;"> <!-- Set image width and automatic height -->
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Genre:</strong> ${genre}</p>
        `;
        bookDisplay.appendChild(bookCard); // Append the book card to the display container
    });
}

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchBar').value;
    fetchBooks(query);
});

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('searchBar').addEventListener('input', debounce(function() {
    const query = this.value;
    if (query.trim()) {
        fetchBooks(query);
    }
}, 1000));
