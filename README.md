# Video-app

Video-app lets the users keep their favourite videos from all the different sites in one place by pasting the link or the video's Id.

Live version: https://add-your-videos.netlify.app/

## Installation

Clone down this repository and then type

```bash
 npm install
```

in the terminal.

You will need node and npm installed globally on your machine.
When the installation is complete type npm start. You can visit the app on localhost:3000.

Adding Youtube videos on localhost won't be possible due to the API key being hidden. You can test the functionality using the live version from the link above or use your own API key this way:

1. Create a .env file in the root of the project and type in it: YOUTUBE_API_KEY={your_api_key}
2. You need to have netlify-cli installed globally

```bash
npm install netlify-cli -g
```

3. Run this command

```bash
netlify dev
```

4. Running the above command successfully will start a local development server on port 8888

## About the project

The project is inspired by the recruitment task from [digimonkeys](http://digimonkeys.com/) company.
User can:

- add the video using links in various formats or id (currently supported sites: Youtube, Vimeo, Dailymotion)
- see the number of views and likes of the video
- watch videos in the app without redirection
- add videos to the favourites and toggle favourite filter
- sort the videos ( four options available)
- delete a single video or all of them
- change display mode (list or grid view)

## Project status

This project is still a work in progress. Some features I want to add in the near future:

- option to log in and keep the video in a database (right now data is stored in localstorage)
- search functionality
- possibility to add notes to the videos
