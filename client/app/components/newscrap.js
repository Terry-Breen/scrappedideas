import React from 'react';
import LC from 'literallycanvas';
import {postScrap} from '../server';
import {hashHistory} from 'react-router';

export default class NewScrap extends React.Component {
  constructor(props){
    super(props);
    this.state = {"editing": true};
  }

  handleSubmitButtonPressed(e){
    e.stopPropagation();
    this.setState({"editing":false});
    var imageBounds = {
      x: 0, y: 0, width: 500, height: 350
    };
    var lc = this._lc;
    var imgData = lc.getImage({rect: imageBounds}).toDataURL();
    postScrap(imgData, (scrapData) => {
      hashHistory.push("/scraps/" + scrapData._id + "/url");
    });
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="literally">
              <LC.LiterallyCanvasReactComponent onInit={(lc)=>{this._lc=lc}} imageURLPrefix="/imgs/img" />
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 col-md-offset-3">
            <a className="btn btn-default btn-lg" onClick={(e)=>{this.handleSubmitButtonPressed(e)}} disabled={!this.state.editing}>
              Submit
            </a>
          </div>
        </div>
      </div>
    );
  }
}
