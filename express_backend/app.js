const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const db = require("./config/default.json").mongoUri;
const cors = require("cors");
const passport = require("passport");
const users = require("./routes/api/users");
const newbook = require("./routes/api/newbooks");
const app = express();
// socket setup
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//logger set up
var winston = require("winston"),
  expressWinston = require("express-winston");
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
    expressFormat: true,
    colorize: true,
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.set("useFindAndModify", false);

const port = process.env.PORT || 4201;
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api", newbook);
let  clients = [];


app.get("/", (req, res) => {
  console.log("hellp",clients.length);
  res.send("sse hello please respond ");
});

const useServerSentEventsMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const sendEventStreamData = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    // clients.forEach(client => client.res.write(sseFormattedResponse))
    res.write(sseFormattedResponse);
  };
  Object.assign(res, {
    sendEventStreamData,
  });

  next();
};

const streamRandomNumbers = (req, res) => {
  let interval = setInterval(function generateAndSendRandomNumber() {
    const data = {
      value: Math.random(),
    };

    res.sendEventStreamData(data);
  }, 5000);

  // close
  const clientId = Date.now();

  const newClient = {
    id: clientId,
    res
  };

  clients.push(newClient);

  res.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
    clearInterval(interval);
    res.end();
  });
};

app.get(
  "/stream-random-numbers",
  useServerSentEventsMiddleware,
  streamRandomNumbers
);
app.get('/status', (request, response) => response.status(200).json({data: clients.length}));
// app.use((req, res, next) => {
//   res.status(404).send('<h2 align=center>Page Not Found!</h2>');
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// app.set("io",io)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(port, () => console.log(`server started on port: ${port}`));
    console.log("MongoDB successfully connected");
  })
  .catch((err) => console.log(err));
