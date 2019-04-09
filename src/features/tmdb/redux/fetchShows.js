import axios from "axios";
import {
  TMDB_FETCH_SHOWS_BEGIN,
  TMDB_FETCH_SHOWS_SUCCESS,
  TMDB_FETCH_SHOWS_FAILURE,
  TMDB_FETCH_SHOWS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchShows(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: TMDB_FETCH_SHOWS_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
     const doRequest = axios.get("https://api.themoviedb.org/3/tv/top_rated?page=1&language=en-US&api_key=482d929cb4907d666170f441baa7bd20")
      doRequest.then(
        (res) => {
          dispatch({
            type: TMDB_FETCH_SHOWS_SUCCESS,
            data: res.data.results,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TMDB_FETCH_SHOWS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchShowsError() {
  return {
    type: TMDB_FETCH_SHOWS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TMDB_FETCH_SHOWS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchShowsPending: true,
        fetchShowsError: null,
      };

    case TMDB_FETCH_SHOWS_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchShowsPending: false,
        fetchShowsError: null,
        showList:  action.data,
      };

    case TMDB_FETCH_SHOWS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchShowsPending: false,
        fetchShowsError: action.data.error,
      };

    case TMDB_FETCH_SHOWS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchShowsError: null,
      };

    default:
      return state;
  }
}
