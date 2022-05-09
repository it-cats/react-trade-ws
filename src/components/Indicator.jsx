import React from 'react';

function Indicators({ title, value }) {
  return (
    <p>
      {title}
      <span>{value}</span>
    </p>
  );
}

export default Indicators;