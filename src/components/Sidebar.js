import React from 'react';
import './Sidebar.css';

import HeadphonesIcon from '@mui/icons-material/Headphones';



const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="active"><HeadphonesIcon /> Headphones</li>
      </ul>
    </div>
  );
};

export default Sidebar;
