# Database

## Create database

Code for creating our database

- Create databse:

    ```sql
    CREATE DATABASE musicmagicdb;
    ```

- Switch to database:

    ```sql
    \c musicmagicdb;
    ```

- Create users table:

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        image_url VARCHAR(100)
    );
    ```

- Create playlists table:

    ```sql
    CREATE TABLE playlists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        date_created DATE NOT NULL,
        description TEXT,
        image_url VARCHAR(100)
    );
    ```

- Create songs table:
    ```sql
    CREATE TABLE songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        artist VARCHAR(100) NOT NULL,
        song_url VARCHAR(100),
        playlist_id INTEGER REFERENCES playlists(id)
    );
    ```

## Populate database

- Insert User:

    ```sql
    INSERT INTO users (username, email, password, image_url) VALUES ('John Doe', 'john.doe@gmail.com', 'hashed password', 'profile picture url');
    ```

- Insert Playlist:

    ```sql
    INSERT INTO playlists (name, owner_id, date_created, description, image_url) VALUES ('playlist name', 1, 2025-01-01, 'playlist description', 'cover art url');
    ```

- Insert Song:
    ```sql
    INSERT INTO songs (title, artist, song_url, playlist_id) VALUES ('song name', 'song artist', 'song url', 1);
    ```

## Edit records

- Edit User:

    ```sql
    UPDATE users
    SET username='new username', password='new hashed password', image_url='new url'
    WHERE id=1;
    ```

- Edit Playlist

    ```sql
    UPDATE playlists
    SET name='new playlist name', description='new description', image_url='new url'
    WHERE id=1;
    ```

- Edit Song

    ```sql
    UPDATE songs
    SET title='new song title', artist='new artist', song_url='new url'
    WHERE id=1;
    ```

## Delete records

- Delete User:

    ```sql
    DELETE FROM users WHERE id=1;
    ```

- Delete Playlist:

    ```sql
    DELETE FROM playlists WHERE id=1;
    ```

- Delete Song:
    ```sql
    DELETE FROM songs WHERE id=1;
    ```

## Add indexes

```sql
CREATE INDEX idx_user_email ON users(email);

CREATE INDEX idx_playlist_name ON playlists(name);
CREATE INDEX idx_playlist_owner ON playlists(owner_id);
CREATE INDEX idx_playlist_date ON playlists(date_created);

CREATE INDEX idx_song_title ON songs(title);
CREATE INDEX idx_song_artist ON songs(artist);
CREATE INDEX idx_song_playlist ON songs(playlist_id);
```
