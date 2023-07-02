export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h4 :class="priceColor">{{'Price: ' + book.listPrice.amount + ' ' + book.listPrice.currencyCode}}</h4>
            <h3>{{ readType }}</h3>
            <h4>{{ howOld }}</h4>
            <h5>{{'Author/s: ' + book.authors }}</h5>
            <h5>{{'Subtitle: ' + book.subtitle }}</h5>
            <h5>{{'Published date: ' + book.publishedDate }}</h5>
            <!-- <h5>{{ book.data }}</h5> -->
            <img :src=book.thumbnail alt="">
            <button @click="onClose">close</button>
        </section>
    `,
    methods: {
        onClose() {
            this.$emit('close')
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
        }

        // imgSrc() {
        //     return `../assets/img/${this.car.vendor}.png`
        // }

    }
}