import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="/imgs/brand.png" width="50" height="50"/>
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#/about">About the authors</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
