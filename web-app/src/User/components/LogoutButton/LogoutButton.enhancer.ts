import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { WithFirebaseHocProps } from 'Firebase/lib';

import { Props } from './LogoutButton';

interface EnhancedProps {
  className?: string;
  onLogout?: () => void;
}

interface WithHandlersProps {
  handleClick: () => void;
}

export default compose<Props & WithFirebaseHocProps, EnhancedProps>(
  withFirebase,
  withHandlers<EnhancedProps & WithFirebaseHocProps, WithHandlersProps>({

    handleClick: ({ firebase, onLogout }) => () => {
      firebase.auth().signOut();

      if (onLogout) {
        onLogout();
      }
    },

  }),
);
