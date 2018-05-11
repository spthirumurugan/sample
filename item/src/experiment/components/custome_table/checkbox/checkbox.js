import React, { PropTypes } from 'react';
import headerElemRenderer from '../helper/header_elem_renderer';


// const Image = ({ source }) => (
//   <img className="img-responsive" src={source} alt="" />
// );

const Checkbox = ({ id, type, props, onChange, value, checked }) => (
  <div className={`checkbox checkbox-${type}`}>
    <input
      type="checkbox"
      id={`checkbox_${id}`}
      checked={checked}
      value={value}
      onChange={onChange}
    />
    <label htmlFor={`checkbox_${id}`}>
      {headerElemRenderer(props.headerType, props.src, props.label)}</label>
    {/* {props.type === 'image' ? */}
    {/* <label htmlFor={`checkbox_${id}`}><Image source={props.src} /></label> */}
    {/* <label htmlFor={`checkbox_${id}`} dangerouslySetInnerHTML={{ __html: props.label }} />} */}
  </div>
);

Checkbox.defaultProps = {
  headerType: '',
  type: 'green',
  label: undefined,
  props: {}
};

Checkbox.propTypes = {
  type: React.PropTypes.oneOf(['green', 'graph', 'red']),
  id: PropTypes.string.isRequired,
  headerType: PropTypes.string,
  src: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  props: PropTypes.object
};

export default Checkbox;
