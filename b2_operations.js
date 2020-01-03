require('dotenv').config();
const fetch = require('node-fetch');

const authorize_account = async () => {
    const url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account';
    const auth = Buffer.from(`${process.env.B2_ID}:${process.env.B2_KEY}`).toString('base64');

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });

    return response.json();
}

const list_file_names = async token => {
    const url = `${token.apiUrl}/b2api/v2/b2_list_file_names`;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": token.authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "bucketId": token.allowed.bucketId,
            "prefix": "_portfolio/"
        })
    });

    return response.json();
}

module.exports = { authorize_account, list_file_names };