import React from 'react';
import { shallow } from 'enzyme';
import { Movies } from '../../../src/features/tmdb/Movies';

describe('tmdb/Movies', () => {
  it('renders node with correct class name', () => {
    const props = {
      tmdb: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Movies {...props} />
    );

    expect(
      renderedComponent.find('.tmdb-movies').length
    ).toBe(1);
  });
});
