import React from 'react';
import PropTypes from 'prop-types';

const InputErrors = ({ errors }) => (
  <div className="form-errors">
    {errors && errors.length > 0
      && <p key={errors[0].type || errors}>{errors[0].message || errors}</p>
    }
  </div>
);

InputErrors.defaultProps = {
  errors: [],
};

InputErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
};
export default InputErrors;
