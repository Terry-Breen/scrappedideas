import React from 'react';
import LiterallyCanvas from 'literallycanvas'

export default class ScrapPage extends React.Component {
  constructor(props){
    super(props);
    this.state = null;
  }

  refresh(){
    getScrapData(this.props.params.scrapid, (scrapData) => {
      this.setState(scrapData);
    })
  }

  render(){
    return (
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <p>Scrap URL: website/scraps/{this.props.params.scrapid}</p>
            <h1>Scrapped Idea</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            {this.state ? <img src={this.state.imageURL} alt="Scrapped Idea" /> : null}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <h1>Finished Versions</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            {this.state ? this.state.finishedVersions.map((url) => {
              return <img src={this.state.imageURL} alt="Scrapped Idea" />
            }): null}
          </div>
        </div>
      </div>
    );
  }
}
