import PropTypes from 'prop-types';
import React from 'react';

function RegularButton({ title }) {
  return (
    <button className="rounded-md bg-pink-600 text-white px-3 py-2 font-semibold hover:bg-pink-700 transition-all">
      {title}
    </button>
  );
}

RegularButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RegularButton;
