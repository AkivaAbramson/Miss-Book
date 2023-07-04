import { bookService } from "../services/book.service.js"

import AddReview from '../cmps/AddReview.js'
import ReviewList from '../cmps/ReviewList.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>{{ book.title }}</h2>
            <h4 :class="priceColor">{{'Price: ' + book.listPrice.amount + ' ' + book.listPrice.currencyCode}}</h4>
            <h3>{{ readType }}</h3>
            <h4>{{ howOld }}</h4>
            <h5>{{'Author/s: ' + book.authors }}</h5>
            <h5>{{'Subtitle: ' + book.subtitle }}</h5>
            <h5>{{'Published date: ' + book.publishedDate }}</h5>
            <img :src=book.thumbnail alt="">
            
            <ReviewList @remove="removeReview" :reviews="book.reviews"/>
            <AddReview  @add-review="addReview"   />
            <RouterLink to="/book">Back to List</RouterLink>|
            <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink> |
            <RouterLink :to="'/book/' + book.prevBookId">Prev Book</RouterLink> |
        </section>
    `,
    data() {
        return {
            book: null,
            txt: ''
        }
    },
    created() {
        this.loadBook()
        // const {bookId} = this.$route.params
        // bookService.get(bookId)
        //     .then(book => {
        //         this.book = book
        //     })
        //     .catch(err => {
        //         alert('Cannot load book')
        //         this.$router.push('/book')
        //     })
    },
    methods: {
        loadBook() {
            const { bookId } = this.$route.params
            bookService
                .get(bookId)
                .then(book => {
                    this.book = book
                })
                .catch(err => {
                    // alert('Cannot load book')
                    this.$router.push('/book')
                })
        },
        addReview(review) {
            bookService.addReview(this.book.id, review)
                .then(book => this.book = book)
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => this.book = book)
        },
    },
    watch:{
        bookId() {
            this.loadBook()
        },

    },
    computed: { 
        readType(){
            if(this.book.pageCount > 500) return 'Serious Reading'
            if(this.book.pageCount > 200) return 'Decent Reading'
            if(this.book.pageCount < 100) return 'Light Reading'
        },
        howOld(){
            const year = new Date().getFullYear()
            if((year - this.book.publishedDate) > 10) return 'Vintage'
            return 'New'
        },
        priceColor(){
            return{
                cheap: this.book.listPrice.amount < 20,
                expensive: this.book.listPrice.amount > 150
            }
        },
        bookId() {
            return this.$route.params.bookId
        },
        
    },
    components: {
        AddReview,
        ReviewList,
    }
}