/* eslint-disable max-len */
import React from 'react';

const today = new Date();
const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().slice(0, 10);

const whenData = (canBuy, handleCost, cost, message) => {
  if (canBuy) {
    return (
      <div>
        <label htmlFor="number">
          { `${canBuy} space(s) available.` }
          <input onChange={handleCost} className="form-control" min="1" max={canBuy} id="number" type="number" />
        </label>
        <span>{`Total cost: $${cost} USD`}</span>
        <span className="book-msg">{ message }</span>
        <button className="btn btn-book" type="submit">Book now!</button>
      </div>
    );
  }
  return null;
};

export default { whenData, today, maxDate };
