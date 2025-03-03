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
            "ID":1,
            "username":"John Doe"
        },
        {
            "ID":2,
            "username":"Jane Doe"
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
        "ID":1,
        "username":"John Doe",
        "email":"johndoe@example.com"
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
            "ID":1,
            "name":"Playlist 1",
            "owner":1,
            "dateCreated":"2025-03-02",
            "coverImage":"images/example.png"
        },
        {
            "ID":2,
            "name":"Playlist 2",
            "owner":5,
            "dateCreated":"2025-02-25",
            "coverImage":"images/example.png"
        },
        {
            "ID":3,
            "name":"Playlist 3",
            "owner":9,
            "dateCreated":"2025-01-05",
            "coverImage":"images/example.png"
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
        "ID":1,
        "name":"Playlist 1",
        "owner":1,
        "dateCreated":"2025-03-02",
        "coverImage":"images/example.png",
        "description":"This is an example playlist.",
        "songs": [
            {
                "ID":1,
                "name":"Example Song 1",
                "artist":"Example Artist 1",
                "file":"songs/examplesong1.mp3"
            },
            {
                "ID":2,
                "name":"Example Song 2",
                "artist":"Example Artist 2",
                "file":"songs/examplesong2.mp3"
            },
            {
                "ID":3,
                "name":"Example Song 3",
                "artist":"Example Artist 3",
                "file":"songs/examplesong3.mp3"
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
            "ID":2,
            "name":"Playlist 2",
            "owner":5,
            "dateCreated":"2025-02-25",
            "coverImage":"images/example.png"
        },
        {
            "ID":7,
            "name":"Playlist 7",
            "owner":5,
            "dateCreated":"2025-01-05",
            "coverImage":"images/example.png"
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
        "ID":7,
        "name":"Playlist 7",
        "owner":5,
        "dateCreated":"2025-01-05",
        "coverImage":"images/example.png",
        "description":"This is an example playlist.",
        "songs": [
            {
                "ID":1,
                "name":"Example Song 1",
                "artist":"Example Artist 1",
                "file":"songs/examplesong1.mp3"
            },
            {
                "ID":2,
                "name":"Example Song 2",
                "artist":"Example Artist 2",
                "file":"songs/examplesong2.mp3"
            },
            {
                "ID":3,
                "name":"Example Song 3",
                "artist":"Example Artist 3",
                "file":"songs/examplesong3.mp3"
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
        "name":"New Playlist",
        "userID":5,
        "createdDate":"2025-03-03",
        "coverImage":"images/example.png",
        "description":"This is an example of a new playlist."
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
        "name":"New Playlist Name",
        "coverImage":"images/newexample.png"
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
        "name":"Example Song 5",
        "artist":"Example Artist",
        "file":"songs/examplesong5.mp3"
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
        "name":"New Song Name"
    }
    ```

- **Response:**
  - Status: `200 OK`

### `DELETE /api/my-playlists/:playlistID/songs/:songID`

Removes the specified song from the playlist.

- **Request:** None

- **Response:**
  - Status: `204 No Content`