import React, { useState, useEffect } from 'react';
import {ARLINGTON_ZIP_CODES,ARLINGTON_ZIP_COORD,} from '../../assets/arlington';
import { Point } from '../mapComponents/HeatmapLayer';
import { Button } from '../ui/button';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';

interface FilterFormProps {
  onZipCodeSubmit: (coords: Point,zipCode: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onZipCodeSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState<string>('');

  // Listen for reset event and clear the ZIP code selection
  useEffect(() => {
  const handleReset = () => {
    setZipCode('');
  };

  document.addEventListener("resetZipCode", handleReset);
  return () => document.removeEventListener("resetZipCode", handleReset);
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const zipCoord: Point = ARLINGTON_ZIP_COORD[zipCode];
    onZipCodeSubmit(zipCoord, zipCode);
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
            <Button variant='outline' className='w-full'>
              {startDate
                ? format(startDate, 'MM/dd/yyyy')
                : 'Select Start Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={startDate || undefined}
              onSelect={(day) => setStartDate(day || null)}
              className='rounded-md'
            />
          </PopoverContent>
        </Popover>
      </div>

      {/*End Date Picker*/}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-full'>
              {endDate ? format(endDate, 'MM/dd/yyyy') : 'Select End Date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={endDate || undefined}
              onSelect={(day) => setEndDate(day || null)}
              className='rounded-md'
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Zip Code Selector */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Zip Code
        </label>
        <Select onValueChange={(value) => setZipCode(value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select a zip code' />
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

      {/* Submit Button */}
      <Button onClick={handleSubmit} className='mt-4' type='submit'>
        Submit
      </Button>
    </form>
  );
};
export default FilterForm;
