export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h5 class="sale" v-if="book.listPrice.isOnSale"> ON SALE! </h5>
            <img :src=book.thumbnail alt="">
            <RouterLink :to="'/book/' + book.id">Details</RouterLink> |
            <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
        </article>
    `,

    computed: { 
        
    }
}