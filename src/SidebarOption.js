import React from 'react';
import './SidebarOption.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function SidebarOption({ title, Icon }) {
  return (
    <div className='sidebarOption'>
      {Icon && <Icon className='sidebarOption__icon' />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
