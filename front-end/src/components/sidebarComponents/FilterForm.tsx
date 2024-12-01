import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import {
  ARLINGTON_ZIP_CODES,
  ARLINGTON_ZIP_COORD,
} from '../../assets/arlington';
import { Point } from '../mapComponents/HeatmapLayer';

interface SideBarProps {
  onZipCodeSubmit: (coords: Point) => void;
}

const FilterForm: React.FC<SideBarProps> = ({ onZipCodeSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const zipCoord: Point = ARLINGTON_ZIP_COORD[zipCode];
    onZipCodeSubmit(zipCoord);
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
        <select
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        >
          <option value=''>Select a zip code</option>
          {ARLINGTON_ZIP_CODES.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
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
