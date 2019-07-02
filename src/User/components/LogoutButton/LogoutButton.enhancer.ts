import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { WithFirebaseHocProps } from 'Firebase/lib';

import { Props } from './LogoutButton';

export default compose<Props, {}>(
  withFirebase,
  withHandlers<WithFirebaseHocProps, {}>({

    handleClick: ({ firebase }) => () => {
      firebase.auth().signOut();
    },

  }),
);
