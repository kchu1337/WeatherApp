import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
HTMLCanvasElement.prototype.getContext = () => {
  // Not having this made the console log an error
};

import App from "../App";
describe('App', () => {
  const subject = () => {
    return render(
        <App />
    );
  };
  it('All 48 dates appear when given a long enough time range', () => {
    subject();
    const startDate = (screen.getByLabelText("startDate"));
    const endDate = (screen.getByLabelText("endDate"));
    const location = (screen.getByTestId('location'));
    userEvent.type(startDate, '2019-12-31T00:00')
    userEvent.type(endDate, '2020-01-04T00:00')
    userEvent.type(location, 'Reston')
    expect(screen.getByText('01/02/2020 11:00 PM')).toBeVisible();
    expect(screen.getAllByText('Reston')).toHaveLength(48);
  });

  it('Only 1 date appears when filtered to only 1 date', () => {
    subject();
    const startDate = (screen.getByLabelText("startDate"));
    const endDate = (screen.getByLabelText("endDate"));
    const location = (screen.getByTestId('location'));
    userEvent.type(startDate, '2020-01-01T00:30')
    userEvent.type(endDate, '2020-01-01T01:30')
    userEvent.type(location, 'Arlington')
    expect(screen.getByText('01/01/2020 01:00 AM')).toBeVisible();
    expect(screen.getAllByText('Arlington')).toHaveLength(1);
  });
})

