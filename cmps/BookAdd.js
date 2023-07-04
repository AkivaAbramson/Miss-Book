import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
  template: `
  <section>
  <form @submit="onSearchBook">
        <input 
            v-model="search" 

            type="text" 
            placeholder="Search Book">

          <button >Search</button>  
    </form>

    <ul v-if="books">
        <li v-for="book in books">
            <span>{{ book.title }}</span>
            <button @click="onAddBook(book)">+</button>
        </li>
    </ul>
  </section>
  
    `,
  data() {
    return {
      books: null,
      search: '',
      bookToAdd: bookService.getEmptyBook(),
    }
  },

  created() {
    const { bookId } = this.$route.params
    if (!bookId) return
    bookService
      .get(bookId)
      .then((book) => {
        this.bookToAdd = book
      })
      .catch((err) => {
        showErrorMsg('Cannot load book for add')
        this.$router.push('/book')
      })
  },

  methods: {
    onAddBook(book) {
      bookService.addGoogleBook(book)

      bookService
        .save(this.bookToAdd)
        .then((addedBook) => {
          console.log('Added Book', addedBook)
          showSuccessMsg('Book added')
          this.$router.push('/book')
        })
        .catch((err) => {
          showErrorMsg('Cannot add book')
        })
    },
    onSearchBook() {
      bookService.getBooks(this.searchTerm).then((books) => (this.books = books))
    },
  },
}
