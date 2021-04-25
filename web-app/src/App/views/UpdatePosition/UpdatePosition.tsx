import { Button, Typography } from '@material-ui/core';
import * as React from 'react';

import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';
import { Progress } from 'Layers/Presentation/Components/Progress';
import { UpdatePositionForm } from 'Layers/Presentation/Components/UpdatePositionForm';

export interface Props {
  classes: { [key: string]: string };
  handleBackClick: () => void;
  position: Position | null;
  positionLoading: boolean;
}

const UpdatePosition: React.FunctionComponent<Props> = ({
  classes, handleBackClick, position, positionLoading,
}: Props) => (
  <div className={classes.root}>

    <Typography className={classes.headline} variant="h4">Update position</Typography>

    {positionLoading || !position
      ? <Progress />
      : (
        <UpdatePositionForm
          backButton={<Button color="primary" onClick={handleBackClick}>Cancel</Button>}
          onClose={handleBackClick}
          position={position}
        />
      )}

  </div>
);

export default UpdatePosition;
