import React from 'react';
import { Link } from 'react-router-dom';
import './unhautorized.css'
function Unhautorized() {
  return (
    <div className='unhotorized'>
    <div className="unhotorizedcontainer">
      <div className="error">401</div>
      <div className="text">{'>_ '}<Link to='/'>You are not a user.</Link></div>
      <div className="text">{'>_ '}<Link to='/'>Please login first.</Link><span className="line">{'∣'}</span></div>
    </div></div>
  );
}
export default Unhautorized