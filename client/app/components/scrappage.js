import React from 'react';
import LiterallyCanvas from 'literallycanvas'
import {getScrapData} from '../server';

export default class ScrapPage extends React.Component {
  constructor(props){
    super(props);
    this.state = null;
    getScrapData(this.props.params.scrapid, (scrapData) => {
      this.setState(scrapData);
    })
  }

  /*refresh(){
    getScrapData(this.props.params.scrapid, (scrapData) => {
      this.setState(scrapData);
    })
  }*/

  render(){
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <p>Scrap URL: website/scraps/{this.props.params.scrapid}</p>
            <h1>Scrapped Idea</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {this.state ? <img src={this.state.image} alt="Scrapped Idea" /> : null}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Finished Versions</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {this.state ? this.state.finishedDrawings.map((url) => {
              return (<div><img src={url} alt="Scrapped Idea" /><hr className="image-separator"/></div>)
            }): null}
          </div>
        </div>
      </div>
    );
  }
}
