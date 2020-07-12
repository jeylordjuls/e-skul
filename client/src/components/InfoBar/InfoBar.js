import React from 'react';

import './InfoBar.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online"/>
      <p>Room {room}</p>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close"/></a>
    </div>
  </div>
);

export default InfoBar;
