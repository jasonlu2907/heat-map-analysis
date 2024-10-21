import React from 'react';

const SideBar = () => {
  return (
    <div className='fixed left-10 top-20 flex flex-col bg-gray-300 p-4 ml-10  w-64 h-full z-40 opacity-80'>
      <h2 className='text-lg font-bold mb-40'>Sidebar</h2>
      <ul>
        <li className='mb-2'>Option 1</li>
        <li className='mb-2'>Option 2</li>
        <li className='mb-2'>Option 3</li>
      </ul>
    </div>
  );
};

export default SideBar;
