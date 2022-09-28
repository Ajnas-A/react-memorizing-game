import React from 'react';
export default ({ by, handleClick }) => {
  return (
    <div>
      <button className='bg-green-300 px-3 py-2 rounded-md w-32 hover:bg-green-400' onClick={() => handleClick(by)}>{by}</button>
    </div>
  );
};
