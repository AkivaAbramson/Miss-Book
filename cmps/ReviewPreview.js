export default {
    props: ['review'],
    template: `
        <article class="review-preview">
            <!-- <pre>{{ review }}</pre> -->
            
            <p>Full Name: {{ review.fullname }},   Rating: {{ review.rating }}/5,   Read At: {{ review.readAt }}</p> 
        </article>
    `,
}

        