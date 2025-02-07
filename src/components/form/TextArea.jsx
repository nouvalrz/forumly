import clsx from 'clsx';
import PropTypes from 'prop-types';

function TextArea({
  placeholder = '',
  type = 'text',
  value,
  onChange,
  name,
  cols,
  rows,
  className,
}) {
  return (
    <textarea
      type={type}
      value={value}
      onChange={(event) => onChange(event)}
      name={name}
      className={clsx(
        className,
        'rounded-md border-gray-300 border p-2 focus:border-pink-600 focus:outline-hidden focus:ring-0 w-full'
      )}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
    ></textarea>
  );
}

TextArea.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

export default TextArea;
