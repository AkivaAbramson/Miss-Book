export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h5 class="sale" v-if="book.listPrice.isOnSale"> ON SALE! </h5>
            <img :src=book.thumbnail alt="">
            <!-- <h3>{{ book.maxSpeed }}</h3> -->
        </article>
    `,

    computed: { 
        
    }
}