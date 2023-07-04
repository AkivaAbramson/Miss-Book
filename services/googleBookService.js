import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const googleBookService = {
    query,
  }

// function query(txt){
//     if(txt){
//         const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
//     return axios.get(url)
//     .then((res) =>{
//         return res.data.items.map((book) => ({
//             title:book.volumeInfo.title,
            
//         }))

//     })
//     .catch((error) => {
//         console.error('could not get book:', error)
//         return []
//       })
//   } else {
//     return Promise.resolve([])
//   }

// }

function query(txt) {
  return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`)
  .then(res=>res.json())
  .then(res => res.items.map(book => ({
   title: book.volumeInfo.title,
   thumbnail: book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'http://coding-academy.org/books-photos/2.jpg'
  })))

}

// function mapBookData(data) {
//     return {
//       id: data.id,
//       title: data.title,
//       subtitle: data.subtitle,
//       authors: data.authors,
//       publishedDate: data.publishedDate,
//       description: data.description,
//       pageCount: data.pageCount,
//       language: data.language,
//       // thumbnail: data.imageLinks.thumbnail,
//       categories: data.categories,
//       listPrice: {
//         amount: 50,
//         currencyCode: "US",
//         isOnSale: false,
//       }
//     }
//   }