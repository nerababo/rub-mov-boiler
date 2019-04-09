import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TMDB_FETCH_SHOWS_BEGIN,
  TMDB_FETCH_SHOWS_SUCCESS,
  TMDB_FETCH_SHOWS_FAILURE,
  TMDB_FETCH_SHOWS_DISMISS_ERROR,
} from '../../../../src/features/tmdb/redux/constants';

import {
  fetchShows,
  dismissFetchShowsError,
  reducer,
} from '../../../../src/features/tmdb/redux/fetchShows';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('tmdb/redux/fetchShows', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchShows succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchShows())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TMDB_FETCH_SHOWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TMDB_FETCH_SHOWS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchShows fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchShows({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TMDB_FETCH_SHOWS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TMDB_FETCH_SHOWS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchShowsError', () => {
    const expectedAction = {
      type: TMDB_FETCH_SHOWS_DISMISS_ERROR,
    };
    expect(dismissFetchShowsError()).toEqual(expectedAction);
  });

  it('handles action type TMDB_FETCH_SHOWS_BEGIN correctly', () => {
    const prevState = { fetchShowsPending: false };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_SHOWS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchShowsPending).toBe(true);
  });

  it('handles action type TMDB_FETCH_SHOWS_SUCCESS correctly', () => {
    const prevState = { fetchShowsPending: true };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_SHOWS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchShowsPending).toBe(false);
  });

  it('handles action type TMDB_FETCH_SHOWS_FAILURE correctly', () => {
    const prevState = { fetchShowsPending: true };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_SHOWS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchShowsPending).toBe(false);
    expect(state.fetchShowsError).toEqual(expect.anything());
  });

  it('handles action type TMDB_FETCH_SHOWS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchShowsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TMDB_FETCH_SHOWS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchShowsError).toBe(null);
  });
});

