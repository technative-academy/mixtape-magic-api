# Mixtape Magic API

This is the backend repository providing database and API access to [Mixtape Magic](https://github.com/technative-academy/Mixtape-Magic).

## API

The API is used for the frontend application to interact with the database. Some important endpoints are:

- /api/playlists/
    - Fetches a list of all playlists.
- /api/playlists/:playlistID
    - Fetches more detailed information (including the songs) for one specific playlist, specified by :playlistID.
- /api/my-playlists/
    - Fetches a list of all playlists belonging to the currently logged-in user.
- /api/my-playlists/:playlistID
    - Allows requests to be made to view/edit a specific playlist belonging to the currently logged-in user, specified by :playlistID.
- /api/my-playlists/:playlistID/songs
    - Allows requests to be made to view/edit the songs of a specific playlist belonging to the currently logged-in user, specified by :playlistID.

More detailed information, including example request/response JSON and HTTP status codes, can be found in the [API Documentation](https://github.com/technative-academy/mixtape-magic-api/blob/main/docs/api.md).

## Database

## Using this repository

The following scripts have been included in [package.json](https://github.com/technative-academy/mixtape-magic-api/blob/main/package.json):

- `"test": "echo \"Error: no test specified\" && exit 1"`
- `"start": "nodemon server.js"`

Using `npm run start` will run the server, and allow it to automatically restart when any file changes are made.
