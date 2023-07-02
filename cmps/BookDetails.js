export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <!-- <h2>{{ book.title[amount] , book.title[currencyCode], book.title[isOnSale] }}</h2> -->
            <h2>{{ book.listPrice.amount + ' ' + book.listPrice.currencyCode}}</h2>
            <!-- <h3>{{ book.listPrice }}</h3> -->
            <h5>{{ book.subtitle }}</h5>
            <h5>{{ book.authors }}</h5>
            <h5>{{ book.publishedDate }}</h5>
            <!-- <h5>{{ book.data }}</h5> -->
            <img :src=book.thumbnail alt="">
            <button @click="onClose">close</button>
        </section>
    `,
    methods: {
        onClose() {
            this.$emit('close')
        }
    },
    computed: { 
        // imgSrc() {
        //     return `../assets/img/${this.car.vendor}.png`
        // }

    }
}