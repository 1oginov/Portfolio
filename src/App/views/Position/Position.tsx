import * as React from 'react';

import { Position as PositionType } from 'Portfolio/lib/flow';
import Progress from 'Shared/components/Progress';

interface Props {
  handleDeleteClick: () => void;
  handleHomeClick: () => void;
  position: PositionType;
  positionLoading: boolean;
}

const Position: React.FunctionComponent<Props> = ({
  handleDeleteClick, handleHomeClick, position, positionLoading,
}: Props) => (
  <React.Fragment>

    <div>
      <button onClick={handleHomeClick} type="button">Home</button>
    </div>

    <h1>Position</h1>

    <div>
      {positionLoading
        ? <Progress />
        : JSON.stringify(position)}
    </div>

    <div>
      <button onClick={handleDeleteClick} type="button">Delete</button>
    </div>

  </React.Fragment>
);

export default Position;
