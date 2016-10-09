import React from 'react';
import LC from 'literallycanvas';
import getScrapData from '../server';
import hashHistory from 'react-router';

export default class FinishScrap extends React.Component {
  constructor(props){
    super(props);
    this.state = {"editing": true, "haveScrap": false};
    getScrapData(this.props.params.scrapid, (scrapData) => {
      this.setState({"haveScrap": true, "scrap": scrapData});
    });
  }

  handleSubmitButtonPressed(e){
    e.stopPropagation();
    this.setState({"editing":false});
    var imageBounds = {
      x: 0, y: 0, width: 500, height: 350
    };
    var lc = this._lc;
    var imgData = lc.getImage({rect: imageBounds}).toDataURL();
    postFinishedIdea(this.props.params.scrapid, imgData, () => {
      hashHistory.push("/scraps/"+this.props.params.scrapid);
    });
  }

  render(){
    if(!this.state.haveScrap){
      return (<p>Loading scrap</p>);
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="literally">
              <LC.LiterallyCanvasReactComponent onInit={(lc)=>{
                  this._lc=lc;
                  var image = new Image();
                  image.src = this.state.scrap.scrapURL; //XXX ACCESSING URL XXX
                  lc.saveShape(LC.createShape('Image', {x: 0, y: 0, image: image}));
              }} imageURLPrefix="/imgs/img" />
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 col-md-offset-3">
            <a className="btn btn-default btn-lg" onClick={(e)=>this.handleSubmitButtonPressed(e)} disabled={!this.state.editing}>
              Submit
            </a>
          </div>
        </div>
      </div>
    );
  }
}
