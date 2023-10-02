import React from 'react'

function Input(props) {
  
  return (
    <div>
      <input
        type='number'
        className='form-control'
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;