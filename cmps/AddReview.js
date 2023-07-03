import { bookService } from '../services/book.service.js'

export default {
    props: ['book'],
    template: `
    <button v-if="!toggleReview" @click="onAddReview">Add Review!</button>
    <section class="book-review" v-if="toggleReview">
    <form @submit.prevent="submitReview">
        <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" placeholder="Enter name" v-model="fullname" required><br><br>
    
        <div class="rating">
            <label for="rating">Rating:</label>
            <select name="rating" id="rating" v-model="rating" required>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
        </select>
        </div>
        
        <label for="readAt">Date Read:</label>
        <input type="date" id="readAt" name="readAt" v-model="readAt"required><br><br>
        
        <input type="submit" value="Submit">
   </form>
</section>
       
    `,

    data(){
        return {
            fullname: '',
            rating: null,
            readAt: '',
            toggleReview: false

        }
    },
    methods: {
        submitReview(){
            const review = {
                fullname: this.fullname,
                rating: this.rating,
                readAt: this.readAt
            }
            bookService.addReview(this.book.id, review)
            this.fullname = ''
            this.rating = null
            this.readAt = ''
            this.toggleReview = false

        },
        onAddReview(){
            this.toggleReview = !this.toggleReview
        }
            



    },
    computed: {
        test() {
            return console.log('hi')
        }

    },
    components: {

    }
}