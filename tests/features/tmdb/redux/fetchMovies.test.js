import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TMDB_FETCH_MOVIES_BEGIN,
  TMDB_FETCH_MOVIES_SUCCESS,
  TMDB_FETCH_MOVIES_FAILURE,
  TMDB_FETCH_MOVIES_DISMISS_ERROR,
} from '../../../../src/features/tmdb/redux/constants';

import {
  fetchMovies,
  dismissFetchMoviesError,
  reducer,
} from '../../../../src/features/tmdb/redux/fetchMovies';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tmdb/redux/fetchMovies', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchMovies succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchMovies())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TMDB_FETCH_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', TMDB_FETCH_MOVIES_SUCCESS);
      });
  });

  it('dispatches failure action when fetchMovies fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchMovies({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TMDB_FETCH_MOVIES_BEGIN);
        expect(actions[1]).toHaveProperty('type', TMDB_FETCH_MOVIES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchMoviesError', () => {
    const expectedAction = {
      type: TMDB_FETCH_MOVIES_DISMISS_ERROR,
    };
    expect(dismissFetchMoviesError()).toEqual(expectedAction);
  });

  it('handles action type TMDB_FETCH_MOVIES_BEGIN correctly', () => {
    const prevState = { fetchMoviesPending: false };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_MOVIES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchMoviesPending).toBe(true);
  });

  it('handles action type TMDB_FETCH_MOVIES_SUCCESS correctly', () => {
    const prevState = { fetchMoviesPending: true };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_MOVIES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchMoviesPending).toBe(false);
  });

  it('handles action type TMDB_FETCH_MOVIES_FAILURE correctly', () => {
    const prevState = { fetchMoviesPending: true };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_MOVIES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchMoviesPending).toBe(false);
    expect(state.fetchMoviesError).toEqual(expect.anything());
  });

  it('handles action type TMDB_FETCH_MOVIES_DISMISS_ERROR correctly', () => {
    const prevState = { fetchMoviesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_MOVIES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchMoviesError).toBe(null);
  });
});

