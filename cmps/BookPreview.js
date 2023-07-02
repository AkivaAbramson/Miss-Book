export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <!-- <h3>{{ book.maxSpeed }}</h3> -->
        </article>
    `,
}