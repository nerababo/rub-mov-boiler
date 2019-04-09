import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/tmdb/DefaultPage';

describe('tmdb/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      tmdb: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.tmdb-default-page').length
    ).toBe(1);
  });
});
