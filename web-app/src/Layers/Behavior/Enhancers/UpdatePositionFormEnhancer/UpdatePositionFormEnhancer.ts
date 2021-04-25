import { ComponentEnhancer, compose, withHandlers } from 'recompose';

import {
  PositionsOperationsConnector, PositionsOperationsConnectorProps,
} from 'Layers/Adapter/Connectors/PositionsOperationsConnector/PositionsOperationsConnector';
import { PositionFormData } from 'Layers/Behavior/Enhancers/PositionFormEnhancer/PositionFormData';
// TODO: Remove link to Business layer!
import { Position } from 'Layers/Business/Services/PortfolioService/PortfolioService';

export interface UpdatePositionFormEnhancerInputProps {
  onClose?: () => void;
  position: Position;
}

interface WithHandlersProps {
  handleSubmit: (positionFormData: PositionFormData) => void;
}

export type UpdatePositionFormEnhancerProps = PositionsOperationsConnectorProps & WithHandlersProps;

// eslint-disable-next-line max-len
export const UpdatePositionFormEnhancer = <OwnProps extends UpdatePositionFormEnhancerInputProps>(): ComponentEnhancer<OwnProps & UpdatePositionFormEnhancerProps, OwnProps> => (
  compose(
    PositionsOperationsConnector,
    withHandlers<OwnProps & PositionsOperationsConnectorProps, WithHandlersProps>({

      handleSubmit: ({ onClose, position, updatePosition }) => ({
        amount, closeCommission, closeDate, closePrice, openCommission, openDate, openPrice, symbol,
      }) => {
        if (amount === '' || openCommission === '' || openPrice === '' || symbol === '') {
          // TODO: Display the following error in UI.
          throw new Error('Invalid values');
        }

        updatePosition({
          ...position,
          amount,
          closeCommission: closeCommission === '' || closePrice === '' ? null : closeCommission,
          closeDate: closeCommission === '' || closePrice === '' ? null : closeDate,
          closePrice: closeCommission === '' || closePrice === '' ? null : closePrice,
          openCommission,
          openDate,
          openPrice,
          symbol,
        })
          .then(() => {
            if (onClose) {
              onClose();
            }
          });
      },

    }),
  )
);
