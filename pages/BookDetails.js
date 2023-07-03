import { bookService } from "../services/book.service.js"

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
        }

    }
}