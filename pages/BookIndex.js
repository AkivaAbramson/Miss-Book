import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'
import BookAdd from '../cmps/BookAdd.js'


export default {
    template: `
        <section class="book-index" v-if="books">
        <!-- <RouterLink to="/book/edit">Add Book</RouterLink> -->
            <BookAdd></BookAdd>
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                v-if="books"
                :books="filteredBooks"
                @remove="removeBook" /> 
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: {}
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)    
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    showErrorMsg('Cannot remove book')
                })
        },
      
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')

            return this.books.filter((book) => {
                const filterTitle = !this.filterBy.title || regex.test(book.title)
                const filterPrice = !this.filterBy.price  || (Number(book.listPrice.amount) <= Number(this.filterBy.price))
                return filterTitle && filterPrice
            })
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookFilter,
        BookList,
        BookAdd,
    }
}