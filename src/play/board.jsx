import React, { useState, useEffect } from 'react';

import { Square } from './square';

export function Board({ currentGuess, squareStates, colors }) {
  let boardRows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
  ];

  useEffect(() => {
    //updateSquareStates();
  }, [currentGuess]);

  return (
    <>
      {boardRows.map((row, rowIndex) => ( //row = value (the row of num) rowIndex = which array it is
        <div className='letter-row' key={rowIndex}>
          {row && row.map((squareSpot, columnIndex) => (
            <Square
              value={squareStates[rowIndex][columnIndex]}
              //updateBoxValue={(newValue) => handleUpdateBoxValue(rowIndex, columnIndex, newValue)}
              key={columnIndex}
              color={colors[rowIndex][columnIndex]}
              />
          ))}
        </div>
      ))}
    </>
  );
}
