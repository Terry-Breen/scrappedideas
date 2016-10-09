import React from 'react';

export default class ScrapURL extends React.Component {
  render(){
    return (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2>URL: website/scraps/{this.props.params.scrapid}</h2>
          </div>
        </div>
      </div>
    );
  }
}
