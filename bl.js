const dal = require('./dal');//import data access layer

async function prepareData() {
    let apiData = await dal.fetchDataFromAPI();
    let returnObj =  {};

    //check if the data access layer returned an error
    if ((typeof apiData) == 'string' || apiData instanceof String) {
        //in case of error, return error response.
        returnObj =  {
            error: 'API not reachable'
        };
        return JSON.stringify(returnObj);;
    }

    //considering posts as central point
    returnObj = apiData.posts.map(m => {

        //fetch user information on the basis of user id mentioned in the post data
        const userInfo = apiData.users.filter(f=> f.id === m.userId)[0];
        const dataset = {
            postId: m.id,
            // title: m.title,
            id: m.userId,
            name: userInfo.name,
            email: userInfo.email,
            body: m.body,
            comments: apiData.comments.filter(c=> c.postId === m.id) //fetching comments using the post id as reference
        };
        return dataset;
    });

    //stringifying the object
    return JSON.stringify(returnObj);
};

module.exports.prepareData = prepareData; 