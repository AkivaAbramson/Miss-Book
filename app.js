import { createApp } from './lib/vue-v3.3.4.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'

import HomePage from './pages/HomePage.js'
import BookIndex from './pages/BookIndex.js'
import AboutUs from './pages/AboutUs.js'

const options = {
    template: `
    <div>
        <AppHeader @change-route="route = $event"/>
        <section class="main-route">
            <HomePage v-if="route === 'home'"/>
            <BookIndex v-if="route === 'books'" />
            <AboutUs v-if="route === 'about'" />
        </section>
        <AppFooter />
    </div>
    `,
    data() {
        return {
            route: 'about',
        }
    },
    components: {
        HomePage,
        BookIndex,
        AboutUs,
        AppHeader,
        AppFooter,
    }
}
const app = createApp(options)

app.mount('#app')
