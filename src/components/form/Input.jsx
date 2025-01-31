import PropTypes from 'prop-types';
import React from 'react';

function Input({ placeholder = '', type = 'text' }) {
  return (
    <input
      type={type}
      className="rounded-md border-gray-300 border p-2 focus:border-pink-600 focus:outline-none focus:ring-0 "
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
