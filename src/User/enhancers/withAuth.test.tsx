import { mount } from 'enzyme';
import * as React from 'react';
import configureStore from 'redux-mock-store';

import withAuth from './withAuth';

const mockStore = configureStore();
const node = <div>BaseComponent</div>;
const BaseComponent: React.FunctionComponent = () => node;
const EnhancedComponent = withAuth(BaseComponent);

it('does not render children if unauthorized', () => {
  const wrapper = mount(
    // @ts-ignore
    <EnhancedComponent
      store={mockStore({ firebase: { auth: { isEmpty: true, isLoaded: false } } })}
    />,
  );

  expect(wrapper.contains(node)).toBeFalsy();
});

it('renders children if authorized', () => {
  const wrapper = mount(
    // @ts-ignore
    <EnhancedComponent
      store={mockStore({ firebase: { auth: { isEmpty: false, isLoaded: true } } })}
    />,
  );

  expect(wrapper.contains(node)).toBeTruthy();
});