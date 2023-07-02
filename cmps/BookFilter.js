export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.title" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search">
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: ''
            }
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}

