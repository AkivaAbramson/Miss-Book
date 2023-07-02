export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.title" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search">
                <input 
                v-model="filterBy.price" 
                @input="onSetFilterBy"
                type="number" 
                placeholder="Filter By Price">
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price:null
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}

