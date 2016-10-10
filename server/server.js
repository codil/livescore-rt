const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const sio = require('socket.io')(server);
const data = require('./data');
const ee = require('./ee');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

data.getRunningGames().forEach((game) => {
  const nsp = sio.of(`/game/${game.id}`);
  nsp.on('connection', (socket) => {
    const gameChangedEvent = `game:${game.id}:changed`;
    const handler = (gameDetails) => {
      socket.emit('game:changed', gameDetails);
    };
    ee.on(gameChangedEvent, handler);
    socket.on('disconnect', () => {
      ee.removeListener(gameChangedEvent, handler)
    })
  });
});

app.get('/api/games', (req, res) => {
  res.json(data.getRunningGames())
});

app.put('/api/game/:id/action', (req, res) => {
  data.addAction(parseInt(req.params.id), req.body, (err, gameDetails) => {
    if (!err) {
      ee.emit(`game:${gameDetails.id}:changed`, gameDetails);
      res.json(gameDetails);
    } else {
      res.json({error: 'An error occurred'})
    }
  })
});

app.get('/api/game/:id', (req, res) => {
  res.json(data.getGameDetails(parseInt(req.params.id)));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => console.log("Server listening on port 3000..."));
