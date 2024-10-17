import PropTypes from "prop-types";
import React from "react";

const Form = React.memo(({ onSubmit = () => {}, children }) => {
  return (
    <form action="" onSubmit={onSubmit}>
      {children}
    </form>
  );
});

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Form.displayName = "Form";

export default Form;
