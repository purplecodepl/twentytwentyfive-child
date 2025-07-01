document.addEventListener('DOMContentLoaded', function () {
  const loadRelatedBooks = async () => {
    const loadingElement = document.querySelector('.loading');
    const bookBlock = document.querySelector('.related-books');
    const booksListElement = document.querySelector('.related-books-list');

    if (!bookBlock || !booksListElement) return;

    try {
      // create url
      const url = new URL(bookAjax.rest_url);

      // add params to filter books
      url.searchParams.append('per_page', 20);
      url.searchParams.append('exclude', bookAjax.current_book_id || 0);
      url.searchParams.append('orderby', 'date');
      url.searchParams.append('order', 'desc');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const books = await response.json();

      // hide loading element
      loadingElement.style.display = 'none';

      if (books.length > 0) {
        books.forEach((book) => {
          const li = document.createElement('li');
          const h3 = document.createElement('h3');
          const a = document.createElement('a');
          const pubDate = document.createElement('p');
          const genre = document.createElement('p');
          const excerpt = document.createElement('p');
          const date = new Date(book.date);

          a.href = book.link;
          a.textContent = book.title.rendered;

          pubDate.innerHTML = `<strong>Publication Date:</strong> ${date.toLocaleDateString() || 'N/A'}`;
          genre.innerHTML = `<strong>Genre:</strong> ${book.genre_details.map((el) => el.name) || 'N/A'}`;

          excerpt.innerHTML = book.excerpt.rendered;

          // append all elements
          h3.appendChild(a);
          li.appendChild(h3);
          li.appendChild(pubDate);
          li.appendChild(genre);
          li.appendChild(excerpt);
          booksListElement.appendChild(li);
        });
      } else {
        // no books
        bookBlock.style.display = 'none';
      }
    } catch (error) {
      bookBlock.style.display = 'none';
      console.error('Error:', error);
    }
  };

  loadRelatedBooks();
});
