// sendSms.js
const axios = require('axios');

const sendSms = async (req, res) => {

    const url = 'https://api.sms.to/sms/send';
    const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGg6ODA4MC9hcGkvdjEvdXNlcnMvYXBpL2tleXMvZ2VuZXJhdGUiLCJpYXQiOjE3MTc3OTI3NTcsIm5iZiI6MTcxNzc5Mjc1NywianRpIjoiZnZBMkZxN3poM2d5am93MyIsInN1YiI6NDU3MjEzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.c-_P3aF95fv3gNPdWtY9OliwkGiWn30Z18XqTSz6xm8'; // Replace with your actual API key

    let obj = req.body;

    if (obj.phone.startsWith('0')) {
        obj.phone = obj.phone.substring(1);
    }


    const data = {
        "message": "Hello!" + obj.firstName + " " + obj.lastName + "Your Appointment is Booked at date:" + obj.sessionDate + " appointment Time :" + obj.sessionTime + " we will be waiting for you Please! be on time",
        "to": "92" + obj.phone,
        "bypass_optout": true,
        "sender_id": "DrFauzia",
        "callback_url": "https://example.com/callback/handler"
    };

    // console.log(data)

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log('Response:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : error.message); // Throw an error to be caught by the caller
    }
};

const sendSms2 = async (req, res) => {

    const url = 'https://api.sms.to/sms/send';
    const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGg6ODA4MC9hcGkvdjEvdXNlcnMvYXBpL2tleXMvZ2VuZXJhdGUiLCJpYXQiOjE3MTc3OTI3NTcsIm5iZiI6MTcxNzc5Mjc1NywianRpIjoiZnZBMkZxN3poM2d5am93MyIsInN1YiI6NDU3MjEzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.c-_P3aF95fv3gNPdWtY9OliwkGiWn30Z18XqTSz6xm8'; // Replace with your actual API key

    let obj = req.body;

    if (obj.phone.startsWith('0')) {
        obj.phone = obj.phone.substring(1);
    }


    const data = {
        "message": "Hello!" + obj.firstName + " " + obj.lastName + " Your Appointment is today at date:" + obj.sessionDate + " appointment Time :" + obj.sessionTime + " we will be waiting for you Please! be on time",
        "to": "92" + obj.phone,
        "bypass_optout": true,
        "sender_id": "DrFauzia",
        "callback_url": "https://example.com/callback/handler"
    };

    // console.log(data)

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log('Response:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : error.message); // Throw an error to be caught by the caller
    }
};

module.exports = {
    sendSms,
    sendSms2
};
