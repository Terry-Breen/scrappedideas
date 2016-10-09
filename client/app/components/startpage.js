import React from 'react';
import {Link} from 'react-router';
import {getRandomScrap} from '../server';
import {hashHistory} from 'react-router';

export default class StartPage extends React.Component {

  handleFindScrapToFinish(e){
    e.stopPropagation();
    getRandomScrap((scrapData)=>{
      hashHistory.push("scraps/" + scrapData._id + "/finish-scrap");
    });
  }

  render(){
    var start = this;
    return (
      <div className="container text-center">
        <Link to="/scraps-create" className="btn btn-default btn-block startpage-btn">
          <h1 className="cover-heading">Make a Scrap</h1>
          <br />Start half an idea for someone to finish.
        </Link>
        <br/>
        <br/>
        <div className="btn btn-default btn-block startpage-btn" onClick={(e)=>{start.handleFindScrapToFinish(e)}}>
          Finish a scrapped idea.<br/>
          <h1 className="cover-heading">Finish a Scrap</h1>
        </div>
      </div>
    );
  }
}
