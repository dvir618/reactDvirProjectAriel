import React from 'react';

function Score({ convertedValue }) {
  return (
    <div className='mt-4'>
      <p>
      Result: {convertedValue}
      </p>
    </div>
  );
}

export default Score;