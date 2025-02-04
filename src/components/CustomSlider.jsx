import React from 'react';

function CustomSlider({ value, onChange, min, max }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
    />
  );
}

export default CustomSlider;