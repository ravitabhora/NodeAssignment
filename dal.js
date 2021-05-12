const fetch = require('node-fetch');// Data Access Layer

async function fetchDataFromAPI() {
    try {
        //make users API call
        const usersRequest = await fetch('https://jsonplaceholder.typicode.com/users');

        //make posts API call
        const postRequest = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        //make comments API call
        const commentsRequest = await fetch('https://jsonplaceholder.typicode.com/comments');

        const users = await usersRequest.json();
        const posts = await postRequest.json();
        const comments = await commentsRequest.json();

        return {
            users,
            posts,
            comments
        };
    } catch (err) {
        console.log(err.message);
        return `Error reaching API: ${err.message}`;
    }
};

module.exports.fetchDataFromAPI = fetchDataFromAPI;