import {
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import * as React from 'react';

import * as C from 'Constants';
import PositionDate from 'Portfolio/components/PositionDate';
import Money from 'Shared/components/Money';
import Percent from 'Shared/components/Percent';
import Sorter from 'Shared/components/Sorter';
import StockLogo from 'Stocks/components/StockLogo';

import { StockPosition } from '../../lib';

// TODO: Tests.

export interface Props {
  classes: { [key: string]: string };
  handleSorterKeyChange: (key: string) => void;
  handleSorterOrderChange: (order: 'asc' | 'desc') => void;
  onPositionClick?: (positionId: string) => void;
  sorterKey: string;
  sorterOrder: 'asc' | 'desc';
  stockPositions: StockPosition[];
}

const ClosedPositionsList: React.FunctionComponent<Props> = ({
  classes, handleSorterKeyChange, handleSorterOrderChange, onPositionClick, stockPositions, sorterKey, sorterOrder,
}: Props) => (
  <React.Fragment>

    <Sorter
      keys={C.CLOSED_POSITIONS_LIST_SORTER_KEYS}
      onKeyChange={handleSorterKeyChange}
      onOrderChange={handleSorterOrderChange}
      sorterKey={sorterKey}
      sorterOrder={sorterOrder}
    />

    <List dense className={classes.list}>
      {stockPositions.map(({
        amount, closeDate, closePL, closePLAnnualPercent, closePLPercent, id, openDate, quote, quoteProgress, symbol,
      }) => (
        <ListItem button key={id} onClick={() => onPositionClick && onPositionClick(id)}>

          <ListItemIcon><StockLogo symbol={symbol} /></ListItemIcon>

          <ListItemText
            primary={quoteProgress || quote === null ? symbol : quote && quote.companyName}
            secondary={(
              <React.Fragment>
                {amount}
                {' @ '}
                {sorterKey === 'openDate' || closeDate === null
                  ? <PositionDate highlighted={sorterKey === 'openDate'} date={openDate} />
                  : <PositionDate highlighted={sorterKey === 'closeDate'} date={closeDate} />}
              </React.Fragment>
            )}
          />

          {sorterKey === 'closePLAnnualPercent'
            ? (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {closePLAnnualPercent !== null && <Percent pl value={closePLAnnualPercent} />}
              </ListItemSecondaryAction>
            ) : (
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                {closePL !== null && <Money highlighted={sorterKey === 'closePL'} pl value={closePL} />}
                <br />
                {closePLPercent !== null && (
                  <Percent highlighted={sorterKey === 'closePLPercent'} pl value={closePLPercent} />
                )}
              </ListItemSecondaryAction>
            )}

        </ListItem>
      ))}
    </List>

  </React.Fragment>
);

export default ClosedPositionsList;
