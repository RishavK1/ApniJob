import React from 'react'
import Navbar from './shared/Navbar'
import DiffJob from './DiffJob';

const Browse = () => {
    let random = [1, 2, 3 ];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className='font-bold text-xl my-10'>Search Results ({random.length})</h1>
        <div className="grid grid-cols-3 gap-4 ">
          {random.map((item, index) => {
            return <DiffJob />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse