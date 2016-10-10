import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import client from 'socket.io-client';

import { fetchGameDetails, gameChanged } from '../actions';

import GameSummary from '../components/GameSummary';
import GameActions from '../components/GameActions';

class GameDetails extends React.Component {

  constructor(props) {
    super(props);
    this.socket = null;
  }

  componentWillMount() {
    const gid = this.props.gid;
    this.props.fetchGameDetails(gid);
    this.socket = client.connect(`/game/${gid}`);
    this.socket.on('game:changed', (game) => {
      this.props.gameChanged(game)
    });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  render() {

    const { isFetching, data, error } = this.props.game;

    return (
      <div>
        { isFetching  && <div className="columns"><div className="column col-xs-12">Loading...</div></div> }
        { error       && <div className="columns"><div className="column col-xs-12">{error}</div></div> }
        { data &&
          <div>
            <GameSummary game={data} />
            <h3>Actions <Link to={`/game/${this.props.gid}/action/new`} className="btn float-right">+</Link></h3>
            <GameActions actions={data.actions} />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    game: state.gameDetails,
    gid: ownProps.params['gid']
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { fetchGameDetails, gameChanged }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);
