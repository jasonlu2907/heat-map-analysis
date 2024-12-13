import React from 'react';

interface OpacitySliderProps {
  opacity: number;
  setOpacity: (number: number) => void;
}

const OpacitySlider: React.FC<OpacitySliderProps> = ({
  opacity,
  setOpacity,
}) => {
  return (
    <div className='mt-4'>
      <label htmlFor='opacity-slider'>Heatmap Opacity:</label>
      <input
        type='range'
        id='opacity-slider'
        min='0'
        max='1'
        step='0.1'
        value={opacity}
        onChange={(e) => setOpacity(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default OpacitySlider;
