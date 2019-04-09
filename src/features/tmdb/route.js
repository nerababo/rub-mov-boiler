// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Movies,
  Shows,
} from './';

export default {
  path: 'tmdb',
  name: 'Tmdb',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'movies', name: 'Movies', component: Movies },
    { path: 'shows', name: 'Shows', component: Shows },
  ],
};
