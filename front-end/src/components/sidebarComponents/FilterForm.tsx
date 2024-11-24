import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const FilterForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Zip Code:', zipCode);
  };

  return (
    <form className='flex flex-col space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Start Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat='MM/dd/yyyy'
          className='w-full p-2 border border-gray-300 rounded'
          placeholderText='Select Start Date'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          End Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          dateFormat='MM/dd/yyyy'
          className='w-full p-2 border border-gray-300 rounded'
          placeholderText='Select End Date'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Zip Code
        </label>
        <input
          type='text'
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='Enter Zip Code'
        />
      </div>

      <button
        onClick={handleSubmit}
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200'
      >
        Submit
      </button>
    </form>
  );
};

export default FilterForm;
