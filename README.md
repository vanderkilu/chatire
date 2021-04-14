# Magnum Opus Assignment

The aim of this assignment is to to create a live instant messaging application, with authorization,
and a simple frontend client.

## Technologies Used

#### Frontend

- React With Hooks (for ui rendering and state management)
- Typescript (to make javascript type-safe)
- Styled components (for styling )
- Socket.io client for instant real-time updates

#### Backend

- Express(Node) as the framework
- Mongodb as the database
- Typescript
- Socket.io server for install realtime updates

#### Middleware

Auth0 for authentication/authorization for both frontend/backend

## Setting up project locally

```
1. git clone https://github.com/vanderkilu/magnum-opus-assignment.git.
2. cd <cloned-directory>
3. cp example.env .env [This will create a .env file for the server using the example.env]
4. cd ui and run cp example.env .env [This will create a .env for the client/ui using the example.env]
```

#### Starting db

This assumes you have mongodb installed

on unix you can start mongodb by running `sudo service mongod start`
or you can use `brew services start mongodb` if you installed it via homebrew on mac
or `mongo.exe` on cmd on windows

more info on how to get started with mongodb [here](https://docs.mongodb.com/manual/installation/)

#### Running the server

```
npm install
npm run dev
```

server should now run on port :8080

#### Running the client/frontend

```
cd ui
npm install
npm run start
```

client should start on port :3000

**NB: The socket connection expects the server to run on port :8080 and the client/frontend to run on port :3000**

**NB: You probably will have to create two Auth0 accounts in order to test this application**

#### Things to improve if I had enough time

1. use redis cluster to enable application to scale
2. use redis set feature to track online users instead of using server in memory set.
3. sync realtime blocked users with the db.
4. Unit/Integration Testing
5. Responsiveness

![image](https://github.com/vanderkilu/magnum-opus-assignment/blob/master/demo/chat1.png)

![image](https://github.com/vanderkilu/magnum-opus-assignment/blob/master/demo/chat2.png)
