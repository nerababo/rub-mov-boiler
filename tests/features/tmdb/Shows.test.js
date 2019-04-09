import React from 'react';
import { shallow } from 'enzyme';
import { Shows } from '../../../src/features/tmdb/Shows';

describe('tmdb/Shows', () => {
  it('renders node with correct class name', () => {
    const props = {
      tmdb: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Shows {...props} />
    );

    expect(
      renderedComponent.find('.tmdb-shows').length
    ).toBe(1);
  });
});
