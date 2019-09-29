import { connect } from 'react-redux';
import {
  ComponentEnhancer, compose, HandleCreators, withHandlers,
} from 'recompose';

import { navigate as navigateAction, NavigateAction } from '../actions';
import * as R from '../routes';
import { RouteParamsState } from '../State';

/**
 * Function returning route and params based on component props and event passed when handler triggered.
 */
interface RouteMapper {
  (props: RouteParamsState, event: any): { // eslint-disable-line @typescript-eslint/no-explicit-any
    route: R.Route;
    params?: RouteParamsState;
  };
}

/**
 * Map containing handlers names as key and route or function returning route and params as a value.
 */
interface NavigationHandlersMapper {
  [key: string]: R.Route | RouteMapper;
}

const mapDispatchToProps = { navigate: navigateAction };

export default <TInner, TOutter>(
  handlersMapper: NavigationHandlersMapper,
): ComponentEnhancer<TInner, TOutter> => compose<TInner, TOutter>(
  // Connect to get navigate action.
  connect(null, mapDispatchToProps),
  // Add handlers using recompose.
  withHandlers(() => {
    const handlers: HandleCreators<{ navigate: NavigateAction }, {}> = {};

    // Iterate over mapper to compose object which is consumed by withHandlers higher order component.
    Object.keys(handlersMapper).forEach(key => {
      // Each handler has props as an argument of the first function and event passed when handler triggered as an
      // argument of the second function.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handlers[key] = ({ navigate, ...props }) => (event: any) => {
        if (typeof handlersMapper[key] === 'function') {
          // If element is a function, then it is a RouteMapper.
          const { params, route } = (handlersMapper[key] as RouteMapper)(props, event);
          navigate(route, params);
        } else {
          // Otherwise it is a Route.
          const route = (handlersMapper[key] as R.Route);
          navigate(route);
        }
      };
    });

    return handlers;
  }),
);
