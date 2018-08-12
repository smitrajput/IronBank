import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';
import Web3Hub from './Web3Hub.js';

const Nav = () => {
	return (
    <div className="container">
		<div className="row nav-header">
			<Link to="/">
			<span className="nav-logo-text" centred>Iron Bank of Etheros</span></Link>
      <Web3Hub />
      <div className="right-nav-links">
        <Link to="/dev"></Link>
      </div>


		</div>
    </div>
	);
};

export default Nav;
