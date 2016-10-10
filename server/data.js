const games = [
  {
    id: 1,
    status: 'running',
    teams: [
      {name: 'FC Barcelona', logo: '/img/fcb.png', goals: 1},
      {name: 'Real Madrid', logo: '/img/rm.png', goals: 1}
    ],
    competition: 'Liga - 12',
    stadium: 'Nue Camp, Barcelana',
    elapsed_time: '11',
    actions: [
      {id: 1, type: 'attempt', minute: '1', comment: 'Messi tire de 25 mètres mais le ballon frolle le poteau'},
      {id: 2, type: 'goal', minute: '4', comment: 'But! Benzema déborde à gauche et tire en pleine lucarne.'},
      {id: 3, type: 'warning', minute: '8', comment: 'Carton jaune pour Pepe'},
      {id: 4, type: 'goal', minute: '10', comment: 'Egalisation du score sur pénalty tiré par Messi'}
    ]
  },
  {
    id: 2,
    status: 'running',
    teams: [
      {name: 'Chelsea', logo: '/img/chelsea.png', goals: 0},
      {name: 'Manchester United', logo: '/img/mu.png', goals: 0}
    ],
    competition: 'Cup Final',
    stadium: 'Wembley, London',
    elapsed_time: '08',
    actions: []
  }
];


function getRunningGames() {
  return games.filter(game => game.status === 'running').map(game => ({
    id: game.id,
    status: game.status,
    teams: game.teams,
    competition: game.competition,
    elapsed_time: game.elapsed_time,
    stadium: game.stadium
  }))
}

function getGameDetails(id) {
  return games.find((game) => (game.id === id))
}

function addAction(gameId, action, cb) {
  const gameDetails = this.getGameDetails(gameId);
  switch (action.type) {
    case 'goal' :
      const team = gameDetails.teams[action.team];
      team.goals = team.goals + 1;
      break;
    case 'begin' :
      gameDetails.status = 'running';
      break;
    case 'end' :
      gameDetails.status = 'finished';
      break;
    case 'ht':
      gameDetails.status = 'half-time';
      break;
  }
  const actions = gameDetails.actions;
  action.id = actions.length + 1;
  actions.push(action);
  cb(null, gameDetails);
}

module.exports = {
  getRunningGames,
  getGameDetails,
  addAction
};
