import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import FilterForm from './sidebarComponents/FilterForm';

const SideBar = () => {
  const [showHeatMap, setShowHeatMap] = useState(false);
  return (
    <div className='fixed right-0 top-20 flex flex-col bg-gray-100 p-6 w-64 h-full z-20 shadow-lg opacity-80'>
      <h2 className='text-lg font-semibold mb-6'>Filter Options</h2>

      <FilterForm />

      <div className='flex items-center mt-4'>
        <input
          type='checkbox'
          checked={showHeatMap}
          onChange={(e) => setShowHeatMap(e.target.checked)}
          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
        />
        <label className='ml-2 block text-md text-gray-700'>
          Show Heat Map
        </label>
      </div>
    </div>
  );
};

export default SideBar;
