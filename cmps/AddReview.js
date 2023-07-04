import { bookService } from '../services/book.service.js'

export default {
    // props: ['book'],
    template: `
    <button v-if="!toggleReview" @click="onAddReview">Add Review!</button>
    <section class="book-review" v-if="toggleReview">
    <form @submit.prevent="submitReview">
        <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" placeholder="Enter name" v-model="review.fullname" required><br><br>
    
        <div class="rating">
                <label for="rating">Rating:</label>
                <div class="rating-stars">
                    <span class="star" v-for="i in 5" :key="i" @click="setRating(i)">
                        <span :class="['star-icon', { 'selected': review.rating >= i }]">&starf;</span>
                    </span>
                </div>
        </div>
        
        <label for="readAt">Date Read:</label>
        <input type="date" id="readAt" name="readAt" v-model="review.readAt"required><br><br>
        
        <input type="submit" value="Submit">
   </form>
</section>
       
    `,

    data(){
        return {
            review:{

                fullname: '',
                rating: null,
                readAt: '',
            },
            toggleReview: false

        }
    },
    methods: {
        setRating(rating) {
            this.review.rating = rating
        },
        submitReview(){
            this.$emit('add-review', this.review)
            this.review = {
                fullname: '',
                rating: '',
                readAt: '',    
            },
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