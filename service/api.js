import axios from 'axios';

const API_HOST = 'https://opentdb.com/api.php';

const apiClient = axios.create({
    baseURL: API_HOST,
});

export const API = {
    grabQuizQuestions: (total_questions,difficulty) => apiClient.get(`?amount=${total_questions}&difficulty=${difficulty}&type=multiple`),
};
