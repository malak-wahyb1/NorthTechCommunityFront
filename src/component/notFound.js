import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='unhotorized'>
    <div className="unhotorizedcontainer">
      <div className="error">404</div>
      <div className="text">{'>_ '}<Link to='/'>Page Not Found.</Link></div>
      <div className="text">{'>_ '}<Link to='/'>Go Back to login page.</Link><span className="line">{'∣'}</span></div>
    </div></div>
  );
}
export default NotFound