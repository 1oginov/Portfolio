import classNames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';

export interface Props {
  backButton?: React.ReactNode;
  classes: { [key: string]: string };
  commission: number | '';
  date: string;
  handleCommissionChange: (event: React.SyntheticEvent) => void;
  handleDateChange: (event: React.SyntheticEvent) => void;
  handlePriceChange: (event: React.SyntheticEvent) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  price: number | '';
}

const UpdatePositionForm: React.FunctionComponent<Props> = ({
  backButton, classes, commission, date, handleCommissionChange, handleDateChange, handlePriceChange, handleSubmit,
  price,
}: Props) => (
  <form className={classes.root} onSubmit={handleSubmit}>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Price"
        onChange={handlePriceChange}
        required
        type="number"
        value={price}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
        label="Commission"
        onChange={handleCommissionChange}
        required
        type="number"
        value={commission}
        variant="outlined"
      />
    </div>

    <div className={classes.row}>
      <TextField
        fullWidth
        label="Date"
        onChange={handleDateChange}
        required
        type="date"
        value={date}
        variant="outlined"
      />
    </div>

    <div className={classNames(classes.row, backButton && classes.buttons)}>
      {backButton}
      <Button color="primary" variant="contained" type="submit">Update</Button>
    </div>

  </form>
);

export default UpdatePositionForm;