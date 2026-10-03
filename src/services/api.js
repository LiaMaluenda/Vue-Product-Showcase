import axios from 'axios'

const useLocalData = process.env.VUE_APP_DATA_SOURCE === 'local'

const api = axios.create({
  baseURL: useLocalData ? '/data' : 'https://fakestoreapi.com',
  timeout: 10000 // si tarda más de 10 s, se considera error
})

const endpoints = useLocalData
  ? { products: '/products.json', categories: '/categories.json' }
  : { products: '/products', categories: '/products/categories' }

export function getProducts () {
  return api.get(endpoints.products).then(response => response.data)
}

export function getCategories () {
  return api.get(endpoints.categories).then(response => response.data)
}