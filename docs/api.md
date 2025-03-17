# API Endpoints

## Auth

Endpoints for registering new users, and logins for existing users.

### `POST /api/auth/register`

Registers a new user.

- **Request:**

    - Body:
        ```json
        {
            "username": "John Doe",
            "email": "johndoe@example.com",
            "password": "helloworld"
        }
        ```

- **Response:**
    - Status: `201 Created`

### `POST /api/auth/login`

Logs a user in.

- **Request:**

    - Body:
        ```json
        {
            "email": "johndoe@example.com",
            "password": "helloworld"
        }
        ```

- **Response:**
    - Status: `200 OK`

## Users

Endpoint for fetching a list of all currently registered users.

### `GET /api/users/`

Returns a list of registered users.

- **Request:** None

- **Response:**
    - Status: `200 OK`
    - Body:
        ```json
        [
            {
                "id": 1,
                "username": "John Doe",
                "image_url": "exampleimage.png"
            },
            {
                "id": 2,
                "username": "Jane Doe",
                "image_url": "exampleimage.png"
            }
        ]
        ```

## Me

Endpoints for fetching and updating details about the user that is currently logged-in.

### `PATCH /api/me/`

Updates any provided details for the currently logged-in user.

- **Request:** (Example: changing the user's email)

    - Body:
        ```json
        {
            "email": "johndoe@newaddress.com"
        }
        ```

- **Response:**
    - Status: `200 OK`

### `GET /api/me/`

Returns the details of the currently logged-in user.

- **Request:** None

- **Response:**
    - Status: `200 OK`
    - Body:
        ```json
        {
            "id": 1,
            "username": "John Doe"
        }
        ```

## Playlists

Endpoints (use when no user is logged in) for fetching a list of all existing playlists and details about a specific playlist.

### `GET /api/playlists/`

Returns a list of all playlists from every user.

- **Request:** None

- **Response:**

    - Status: `200 OK`
    - Body:

        ```json
        [
            {
                "id": 1,
                "name": "Playlist 1",
                "owner": {
                    "id": 1,
                    "username": "John Doe",
                    "image_url": "exampleimage.png"
                },
                "date_created": "2025-03-02",
                "image_url": "images/example.png",
                "song_count": 4
            },
            {
                "id": 2,
                "name": "Playlist 2",
                "owner_id": 5,
                "date_created": "2025-02-25",
                "image_url": "images/example.png",
                "song_count": 7
            },
            {
                "id": 3,
                "name": "Playlist 3",
                "owner": {
                    "id": 2,
                    "username": "Jane Doe",
                    "image_url": "exampleimage.png"
                },
                "date_created": "2025-01-05",
                "image_url": "images/example.png",
                "song_count": 25
            }
        ]
        ```

### `GET /api/playlists/:playlistID`

Returns detailed information about a specific playlist.

- **Request:** None

- **Response:**
    - Status: `200 OK`
    - Body:
        ```json
        {
            "id": 1,
            "name": "Playlist 1",
            "owner_id": 1,
            "date_created": "2025-03-02",
            "image_url": "images/example.png",
            "description": "This is an example playlist.",
            "song_count": 3,
            "songs": [
                {
                    "id": 1,
                    "title": "Example Song 1",
                    "artist": "Example Artist 1",
                    "song_url": "songs/examplesong1.mp3",
                    "playlist_id": 1
                },
                {
                    "id": 2,
                    "title": "Example Song 2",
                    "artist": "Example Artist 2",
                    "song_url": "songs/examplesong2.mp3",
                    "playlist_id": 1
                },
                {
                    "id": 3,
                    "title": "Example Song 3",
                    "artist": "Example Artist 3",
                    "song_url": "songs/examplesong3.mp3",
                    "playlist_id": 1
                }
            ]
        }
        ```

## My Playlists

Endpoints (use when a user is logged in) for: fetching a list of the user's playlists, details about a specific playlist, creating a new playlist, editing the details (such as name) of a playlist, and deleting a playlist.

### `GET /api/my-playlists/`

Returns a list of all the playlists owned by the currently logged-in user.

- **Request:** None

- **Response:**
    - Status: `200 OK`
    - Body:
        ```json
        [
            {
                "id": 2,
                "name": "Playlist 2",
                "owner_id": 5,
                "date_created": "2025-02-25",
                "image_url": "images/example.png",
                "song_count": 34
            },
            {
                "id": 7,
                "name": "Playlist 7",
                "owner_id": 5,
                "date_created": "2025-01-05",
                "image_url": "images/example.png",
                "song_count": 5
            }
        ]
        ```

### `GET /api/my-playlists/:playlistID`

Returns detailed information about a specific playlist owned by the currently logged-in user.

- **Request:** None

- **Response:**
    - Status: `200 OK`
    - Body:
        ```json
        {
            "id": 7,
            "name": "Playlist 7",
            "owner_id": 5,
            "date_created": "2025-01-05",
            "image_url": "images/example.png",
            "description": "This is an example playlist.",
            "song_count": 3,
            "songs": [
                {
                    "id": 1,
                    "title": "Example Song 1",
                    "artist": "Example Artist 1",
                    "song_url": "songs/examplesong1.mp3",
                    "playlist_id": 7
                },
                {
                    "id": 2,
                    "title": "Example Song 2",
                    "artist": "Example Artist 2",
                    "song_url": "songs/examplesong2.mp3",
                    "playlist_id": 7
                },
                {
                    "id": 3,
                    "title": "Example Song 3",
                    "artist": "Example Artist 3",
                    "song_url": "songs/examplesong3.mp3",
                    "playlist_id": 7
                }
            ]
        }
        ```

### `POST /api/my-playlists/`

Creates a new playlist for the currently logged-in user.

- **Request:**

    - Body:
        ```json
        {
            "name": "New Playlist",
            "userID": 5,
            "createdDate": "2025-03-03",
            "coverImage": "images/example.png",
            "description": "This is an example of a new playlist."
        }
        ```

- **Response:**
    - Status: `201 Created`

### `PATCH /api/my-playlists/:playlistID`

Updates any provided details for the specified playlist.

- **Request:** (Example: updating the playlist name and image)

    - Body:
        ```json
        {
            "name": "New Playlist Name",
            "coverImage": "images/newexample.png"
        }
        ```

- **Response:**
    - Status: `200 OK`

### `DELETE /api/my-playlists/:playlistID`

Deletes the specified playlist.

- **Request:** None

- **Response:**
    - Status: `204 No Content`

## My Playlists/Songs

Endpoints (use when a user is logged in) for: adding songs to a playlist, changing song details in a playlist, and removing songs from a playlist.

### `POST /api/my-playlists/:playlistID/songs/`

Adds a new song with the specified details to the playlist.

- **Request:**

    - Body:
        ```json
        {
            "name": "Example Song 5",
            "artist": "Example Artist",
            "file": "songs/examplesong5.mp3"
        }
        ```

- **Response:**
    - Status: `201 Created`

### `PATCH /api/my-playlists/:playlistID/songs/:songID`

Updates any provided details for the specified song in the playlist.

- **Request:** (Example: changing the song name)

    - Body:
        ```json
        {
            "name": "New Song Name"
        }
        ```

- **Response:**
    - Status: `200 OK`

### `DELETE /api/my-playlists/:playlistID/songs/:songID`

Removes the specified song from the playlist.

- **Request:** None

- **Response:**
    - Status: `204 No Content`
