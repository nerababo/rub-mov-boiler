import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Movies extends Component {
  static propTypes = {
    tmdb: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="tmdb-movies">
        <button onClick={this.props.actions.fetchMovies}>DAJ FILMOVE</button>
        <br />
        <br />
        <ul>
        {this.props.tmdb.movieList.map(item => (
<li key={item.id}>
        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="test"/>
        <h2>{item.title}</h2>
        <p>{item.overview}</p></li>

        ))}
        
        
        </ul>
        
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    tmdb: state.tmdb,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
