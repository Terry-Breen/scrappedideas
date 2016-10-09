import React from 'react';

export default class FinishScrap extends React.Component {
  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="literally">
              <LC.LiterallyCanvasReactComponent imageURLPrefix="/imgs/img" />
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 col-md-offset-3">
            <a href="#" className="btn btn-default btn-lg">
              Submit
            </a>
          </div>
        </div>
      </div>
    );
  }
}
