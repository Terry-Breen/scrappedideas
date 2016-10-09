import React from 'react';
import {Link} from 'react-router';

export default class StartPage extends React.Component {
  render(){
    return (
      <div className="container text-center">
        <Link to="/scraps-create" className="btn btn-default btn-block startpage-btn">
          <h1 className="cover-heading">Make a Scrap</h1>
          <br />Start half an idea for someone to finish.
        </Link>
        <br/>
        <br/>
        <Link to="/finish-scrap" className="btn btn-default btn-block startpage-btn">
          Finish a scrapped idea.<br/>
          <h1 className="cover-heading">Finish a Scrap</h1>
        </Link>
      </div>
    );
  }
}
