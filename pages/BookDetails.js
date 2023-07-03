import { bookService } from "../services/book.service.js"

import AddReview from '../cmps/AddReview.js'

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
            <div v-if="book.reviews">
                <h4>Reviews:</h4>
                <ul>
                    <li v-for="review in book.reviews" :key="review.fullname">
                    <p>Full Name: {{ review.fullname }},   Rating: {{ review.rating }}/5,   Read At: {{ review.readAt }}</p>
                    <button @click="onRemoveReview(review, book.id)">X</button>
          </li>
        </ul>
      </div>

            <AddReview :book="book"/>
            <RouterLink to="/book">Back to List</RouterLink>
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                alert('Cannot load book')
                this.$router.push('/book')
            })
    },
    methods: {
        onRemoveReview(reviewToRemove, bookId){
            console.log(reviewToRemove)
            console.log(bookId)
            bookService.removeReview(reviewToRemove, bookId)
            .then(() => {
                const idx = this.book.reviews.findIndex((rev) => rev.fullname === reviewToRemove.fulllname &&
                    rev.review === reviewToRemove.review && 
                    rev.readAt === reviewToRemove.readAt)
                    this.book.reviews.splice(idx, 1)
            })
            
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
        
    },
    components: {
        AddReview,
    }
}