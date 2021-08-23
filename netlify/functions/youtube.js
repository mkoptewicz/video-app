const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { id } = event.queryStringParameters;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
