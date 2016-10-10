import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { fetchGames } from '../actions';

import GameSummary from '../components/GameSummary';

class GamesList extends React.Component {

  componentWillMount() {
    this.props.fetchGames();
  }

  render() {

    const { isFetching, items, error } = this.props.games;

    const games = (items) => items.map(game => (
      <li key={game.id} className="game-summary-item">
        <Link className="unstyled-link" to={`/game/${game.id}`}>
          <GameSummary game={game}/>
        </Link>
      </li>
    ));

    return (
      <div>
        { (isFetching || error) &&
          <div className="columns">
            { isFetching && <div className="column">Loading...</div> }
            { error && <div className="column">{error}</div> }
          </div>
        }
        { items.length > 0 &&
          <ul className="game-summary-list">
            { games(items) }
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.gamesList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGames }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
