import React from 'react';

export function Square({ value, updateBoxValue, color }) {


  return <div 
    className='square'
    style={{backgroundColor: color}}
    >{value}</div>;

}
