import React, { Component } from 'react';
import '../App/App.css'
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className="headerTitle">
                    <h1>Pet Hotel</h1>
                    <h5>Shawn, Colin, David, Matt</h5>
                </div>
                <div>
                    <Link to="/" className="nav-link">Dashboard</Link>
                    <Link to="/owners" className="nav-link">Owners</Link>
                </div>
            </div>
        )
    }
}
export default withRouter(Header);