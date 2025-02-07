import PropTypes from 'prop-types';

function Input({ placeholder = '', type = 'text', value, onChange, name }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event)}
      name={name}
      className="rounded-md border-gray-300 border p-2 focus:border-pink-600 focus:outline-hidden focus:ring-0 w-full"
      placeholder={placeholder}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
