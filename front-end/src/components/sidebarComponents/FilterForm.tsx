import React, { useState } from 'react';
import {
  ARLINGTON_ZIP_CODES,
  ARLINGTON_ZIP_COORD,
} from '../../assets/arlington';
import { Point } from '../mapComponents/HeatmapLayer';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface FilterFormProps {
  onZipCodeSubmit: (coords: Point, zipCode: string) => void;
  handleReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  onZipCodeSubmit,
  handleReset,
}) => {
  const [error, setError] = useState<string>('');
  const [zip, setZip] = useState<string | null>(null);
  // const [previousZip, setPreviousZip] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!zip) {
      setError('Please select a ZIP code before submitting');
      return;
    } else {
      setError('');
      const zipCoord: Point = ARLINGTON_ZIP_COORD[zip];

      onZipCodeSubmit(zipCoord, zip);
    }
  };

  return (
    <form className='flex flex-col space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Zip Code
        </label>
        <Select value={zip || ''} onValueChange={setZip}>
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

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <div className='flex flex-col space-y-2'>
        <Button onClick={handleSubmit} className='mt-4' type='submit'>
          Submit
        </Button>
        <button
          className='w-full py-2 px-4 bg-gray-800 text-white rounded-md'
          onClick={(e) => {
            e.preventDefault();
            // reset map behaviors
            handleReset();

            // reset the zip value
            setZip('');
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
