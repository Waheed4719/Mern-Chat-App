const express = require("express");
const app = express();
const mongoose = require("mongoose");
const socket = require("socket.io");
const cors = require("cors");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const auth = require("./routes/auth");
const multer = require("multer");

global.io = module.exports.io = socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/auth/", auth);
app.use("/public", express.static("public"));

const usersInChat = require("./models/Users_in_chat");

var us = {};
var curRoom;
io.on("connection", function (socket) {
  console.log("a user connected", socket.id);

  socket.on("join", ({ user, room }) => {
    us = user;
    curRoom = room;
    usersInChat.findOne({ user: user._id }).then((foundUser) => {
      if (foundUser) {
        console.log(foundUser);
        usersInChat.findOneAndUpdate(
          { user: user._id },
          { $set: { socketId: socket.id } },
          { new: true },
          function (err, user) {
            if (user) {
              console.log("updated user", user);
            }
          }
        );
      } else if (us != null) {
        const newUser = usersInChat();
        newUser.user = user._id;
        newUser.room = room;
        newUser.name = user.name;
        newUser.socketId = socket.id;
        newUser.save().then((savedUser) => console.log("saved", savedUser));
      }
      socket.emit("message", {
        user: "admin",
        text: `Welcome to the room ${room}, ${user.name}`,
      });
      socket.broadcast
        .to(room)
        .emit("message", {
          user: "admin",
          text: `${user.name} has just joined`,
          presence: 1,
        });

      socket.join(room);
    });
  });

  socket.on("sendmessage", ({ user, message }) => {
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      room: user.room,
    });
  });

  socket.on("sendMedia", ({ user, media }) => {
    console.log(media);

    io.to(user.room).emit("media", {
      user: user.name,
      url: media,
      room: user.room,
    });
  });

  socket.on("getUsers", (room) => {
    usersInChat.find({ room: room }).then((users) => {
      if (users) {
        socket.emit("usersOnline", users);
      }
    });
  });

  socket.on("logout", () => {
    usersInChat.findOneAndRemove(
      { socketId: socket.id },
      function (err, deletedUser) {
        console.log("deleted", deletedUser);
        if (err) {
          console.log(err);
        } else if (deletedUser) {
          socket.broadcast
            .to(deletedUser.room)
            .emit("message", {
              user: "admin",
              text: `${deletedUser.name} has just left`,
              presence: 0,
            });
          usersInChat.find().then((users) => {
            socket.emit("usersOnline", users);
          });
        }
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    usersInChat.findOneAndRemove(
      { socketId: socket.id },
      function (err, deletedUser) {
        console.log("deleted", deletedUser);
        if (err) {
          console.log(err);
        } else if (deletedUser) {
          socket.broadcast
            .to(deletedUser.room)
            .emit("message", {
              user: "admin",
              text: `${deletedUser.name} has just left`,
              presence: 0,
            });

          usersInChat.find().then((users) => {
            if (users) {
              socket.emit("usersOnline", users);
            }
          });
        }
      }
    );
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set Static folder

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
