import React, { useState } from 'react';
import Button from './Button';
import Error from './Error'

export default () => {
  const [count, setCount] = useState(0)
  const handleClick = by => setCount((prevState) => prevState + by)
  
  

  return (
    <div className="flex items-center justify-center p-10 bg-green-200 h-screen">
      <div className='flex flex-col space-y-3'>
        <section className="flex space-x-2">
          <section className="flex flex-col space-y-2">
            <Button by={1} handleClick={handleClick} />
            <Button by={5} handleClick={handleClick} />
            <Button by={10} handleClick={handleClick} />
            <Button by={50} handleClick={handleClick} />
            <Button by={100} handleClick={handleClick} />
          </section>

          <section className="flex flex-col space-y-2">
            <Button by={-1} handleClick={handleClick} />
            <Button by={-5} handleClick={handleClick} />
            <Button by={-10} handleClick={handleClick} />
            <Button by={-50} handleClick={handleClick} />
            <Button by={-100} handleClick={handleClick} />
          </section>
        </section>

        <div className='flex items-center justify-center'>Count: {count}</div>
       {count<0 && <Error/>}
        <button onClick={()=>setCount(0)} className='flex items-center justify-center bg-red-500 rounded w-full'>
          Reset
        </button>
      </div>
    </div>
  );
};
