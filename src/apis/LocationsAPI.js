import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.first.org/data/v1/'
})