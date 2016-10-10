import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGameDetails, saveAction } from '../actions';

class NewAction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      team: "0",
      type: "attempt",
      minute: "",
      comment: ""
    };
  }

  componentWillMount() {
    if (!this.props.game || !this.props.game.data || (this.props.game.data.id !== this.props.gid)) {
      this.props.fetchGameDetails(this.props.gid);
    }
  }

  onTypeChange(value) {
    this.setState(Object.assign({}, this.state, { type: value }))
  }

  onTeamChange(value) {
    this.setState(Object.assign({}, this.state, { team: value }))
  }

  onMinuteChange(value) {
    this.setState(Object.assign({}, this.state, { minute: value }))
  }

  onCommentChange(value) {
    this.setState(Object.assign({}, this.state, { comment: value }))
  }

  onSave(e) {
    e.preventDefault();
    this.props.saveAction(this.props.gid, this.state)
  }

  render() {

    const { isFetching, isActionSaved, data, errorFetching, errorSavingAction } = this.props.game;

    if (isFetching || errorFetching || !data) {
      return (
        <div className="columns">
          <div className="column">{( () => isFetching ? "Loading..." : (errorFetching ? errorFetching : "") )()}</div>
        </div>
      )
    }

    const teams = data.teams;
    return (
      <div>
        {isActionSaved &&
          <div className="toast toast-success">
            <button className="btn btn-clear float-right"></button>
            Action saved. <Link to={`/game/${this.props.gid}`}>Return to game details.</Link>
          </div>
        }
        {errorSavingAction &&
          <div className="toast toast-danger">
            <button className="btn btn-clear float-right"></button>
            {errorSavingAction}
          </div>
        }
        <h3>New Action</h3>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="type">Type</label>
            <select className="form-select" name="type" id="type" value={this.state.type}
                    onChange={e => this.onTypeChange(e.target.value)}>
              <option value="attempt">Attempt</option>
              <option value="goal">Goal</option>
              <option value="substitution">Substitute</option>
              <option value="warning">Warning</option>
              <option value="expulsion">Expulsion</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="teams">Team</label>
            <select className="form-select" name="teams" id="teams" value={this.state.team}
                    onChange={e => this.onTeamChange(e.target.value)}>
              <option value="0">{teams[0].name}</option>
              <option value="1">{teams[1].name}</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="minute">Minute</label>
            <input className="form-input" type="text" name="minute" id="minute" value={this.state.minute}
                   style={{width: '8rem'}} onChange={e => this.onMinuteChange(e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="comment">Comment</label>
            <input className="form-input" type="text" name="comment" id="comment" value={this.state.comment}
                   onChange={e => this.onCommentChange(e.target.value)}/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary input-group-btn" onClick={e => this.onSave(e)}>Save</button>
          </div>
        </form>
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
  return bindActionCreators( { fetchGameDetails, saveAction }, dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAction);