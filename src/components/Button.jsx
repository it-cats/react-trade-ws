import React from 'react';

function Button({ name, click, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={click}
    >
      {name}
    </button>
  );
}

export default Button;