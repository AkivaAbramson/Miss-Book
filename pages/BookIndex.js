import { bookService } from '../services/book.service.js'

import BookDetails from '../cmps/BookDetails.js'
import BookEdit from '../cmps/BookEdit.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'


export default {
    template: `
        <section class="book-index">
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                v-if="books"
                :books="filteredBooks"
                @select="selectBook" 
                @remove="removeBook" /> 
            <BookDetails 
                v-if="selectedBook" 
                :book="selectedBook" 
                @close="selectedBook = null"/>
            <BookEdit @save="saveBook" />
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)    
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        saveBook(bookToSave) {
            bookService.save(bookToSave)
                .then(savedBook => this.books.push(savedBook))
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.books.filter(book => regex.test(book.vendor))
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookDetails,
        BookEdit,
        BookFilter,
        BookList,
    }
}