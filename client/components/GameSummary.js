import React from 'react';

export default (props) => {
  const game = props.game;
  return (
    <div>
      <div className="columns">
        <div className="column col-xs-12 col-md-6 game-summary-title">
          <h4>{game.competition}</h4>
          <p>{game.stadium}</p>
          <p className="game-summary-time">{game.elapsed_time}'</p>
        </div>
      </div>
      <div className="columns">
        <div className="column col-xs-12 col-md-6 align-items-center space-between">
          <div className="align-items-center">
            <img className="team-logo" src={game.teams[0].logo}/>
            <span>{game.teams[0].name}</span>
          </div>
          <div>{game.teams[0].goals}</div>
        </div>
      </div>
      <div className="columns">
        <div className="column col-xs-12 col-md-6 align-items-center space-between">
          <div className="align-items-center">
            <img className="team-logo" src={game.teams[1].logo}/>
            <span>{game.teams[1].name}</span>
          </div>
          <div>{game.teams[1].goals}</div>
        </div>
      </div>
    </div>
  )

}