import React from 'react';

export default class StartPage extends React.Component {
  render(){
    return (
      <div className="container">
        <div className="jumbotron text-center">
          <h1 className="cover-heading">Make a Scrap</h1>
          <p className="lead">Start half an idea for someone to finish.</p>
        </div>
        <div className="jumbotron text-center">
          <p className="lead"> Finish a scrapped idea.</p>
          <h1 className="cover-heading">Finish a Scrap</h1>
        </div>
      </div>
    );
  }
}
