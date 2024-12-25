import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import {
  ARLINGTON_ZIP_CODES,
  ARLINGTON_ZIP_COORD,
} from '../../assets/arlington';

import { Point } from '../mapComponents/HeatmapLayer';
import {Button} from '../ui/button';
import {Select,SelectContent, SelectItem, SelectTrigger, SelectValue} from '../ui/select';
import {Calendar} from '../ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {format} from 'date-fns';


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

      
      {/*Start Date Picker*/}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Start Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {startDate ? format(startDate, 'MM/dd/yyyy') : 'Select Start Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={(day) => setStartDate(day || null)}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
        {/* <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat='MM/dd/yyyy'
          className='w-full p-2 border border-gray-300 rounded'
          placeholderText='Select Start Date' */}
      </div>


      {/*End Date Picker*/}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              {endDate ? format(endDate, 'MM/dd/yyyy') : 'Select End Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={(day) => setEndDate(day || null)}
              className="rounded-md"
            />
          </PopoverContent>
        </Popover>
        {/* <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          dateFormat='MM/dd/yyyy'
          className='w-full p-2 border border-gray-300 rounded'
          placeholderText='Select End Date'
        /> */}
      </div>
      {/* Zip Code Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zip Code
        </label>
        <Select onValueChange={(value) => setZipCode(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a zip code" />
          </SelectTrigger>
          <SelectContent>
            {ARLINGTON_ZIP_CODES.map(({ code }) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* <div>
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
      </div> */}
      {/* Submit Button */}
      <Button onClick={handleSubmit} className="mt-4" type="submit">
        Submit
      </Button>
    </form>
  );
  //     <button
  //       onClick={handleSubmit}
  //       className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200'
  //     >
  //       Submit
  //     </button>
  //   </form>
  // );
};
export default FilterForm;
