import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'

var gFilterBy = { title: '', price:0}
var gSortBy = { title: 1 }
var gPageIdx

import gBooks from "../books.json" assert {type:'json'}
// console.log(gBooks)
_createBooks()

const SEARCH_KEY = 'searchDB'
let gBooksCache = utilService.loadFromStorage(BOOK_KEY) || {}


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    addReview,
    removeReview,
    getBooks,
    addGoogleBook,
    
    
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.vendor))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
            }
            if (gPageIdx !== undefined) {
                const startIdx = gPageIdx * PAGE_SIZE
                books = books.slice(startIdx, startIdx + PAGE_SIZE)
            }
            if (gSortBy.maxSpeed !== undefined) {
                books.sort((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * gSortBy.maxSpeed)
            } else if (gSortBy.vendor !== undefined) {
                books.sort((c1, c2) => c1.vendor.localeCompare(c2.vendor) * gSortBy.vendor)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(currBook => currBook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1]
                ? books[bookIdx - 1].id
                : books[books.length - 1].id
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = {amount: null, currencyCode:'EUR', isOnSale:false},  subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language ) {
    return { id: '', title, listPrice,
    subtitle: "mi est eros dapibus himenaeos",
    authors: [ "Barbara Cartland" ],
    publishedDate: 1999,
    description: "placerat nisi sodales suscipit tellus",
    pageCount: 713,
    categories: [ "Computers", "Hack" ],
    thumbnail: "http://coding-academy.org/books-photos/20.jpg",
    language: "en"}
}


function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

// function getCarCountBySpeedMap() {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             const carCountBySpeedMap = cars.reduce((map, car) => {
//                 if (car.maxSpeed < 120) map.slow++
//                 else if (car.maxSpeed < 200) map.normal++
//                 else map.fast++
//                 return map
//             }, { slow: 0, normal: 0, fast: 0 })
//             return carCountBySpeedMap
//         })
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = gBooks
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice = {amount: utilService.getRandomIntInclusive(50, 200), currencyCode:'EUR', isOnSale:false},
subtitle = "mi est eros dapibus himenaeos",
authors = [ "Barbara Cartland" ],
publishedDate = 1999,
description = "placerat nisi sodales suscipit tellus",
pageCount = 713,
categories = [ "Computers", "Hack" ],
thumbnail = "http://ca.org/books-photos/20.jpg",
language = "en"){
    const book = getEmptyBook(title, listPrice, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language )
    book.id = utilService.makeId()
    return book
}

function addReview(bookId, review) {
    return get(bookId)
    .then(book => {
            if (!book.reviews) book.reviews = []
            review.id = utilService.makeId()
            book.reviews.push(review)
            return save(book)
        })
    }
    
    function removeReview(bookId, reviewId) {
        return get(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return save(book)
        })
    }

function getBooks(keyword) {
    if (gBooksCache[keyword]) {
        console.log('Getting from cache')
        return Promise.resolve(gBooksCache[keyword])
    }
    
    const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
    
    return fetch(url)
    .then((res) => res.json())
    .then((res) => {
        console.log('res', res)
        const results = res.items.map((item) => _bookData(item, keyword))
        console.log('results', results)
        gBooksCache[keyword] = results
        
        utilService.saveToStorage(BOOK_KEY, gBooksCache)
        return results
    })
}


function addGoogleBook(book) {
    console.log('Added Google Book')
    return storageService.post(BOOK_KEY, book)
}

function _bookData(item) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors,
    categories: item.volumeInfo.categories,
    description: item.volumeInfo.description,
    language: item.volumeInfo.language,
    pageCount: item.volumeInfo.pageCount,
    imgUrl: item.volumeInfo.imageLinks?.thumbnail,
  }
}




