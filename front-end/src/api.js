import axios from 'axios';

const RestAPI = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const insertMovie = payload => RestAPI.post(`/movie`, payload)
export const getAllMovies = () => RestAPI.get(`/movies`)
export const updateMovieById = (id, payload) => RestAPI.put(`/movie/${id}`, payload)
export const deleteMovieById = id => RestAPI.delete(`/movie/${id}`)
export const getMovieById = id => RestAPI.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis