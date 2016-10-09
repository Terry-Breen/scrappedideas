import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory} from 'react-router'
import StartPage from './components/startpage'
import ScrapPage from './components/scrappage'
import NewScrap from './components/newscrap'
import FinishScrap from './components/finishscrap'
import Navbar from './components/navbar'


class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={StartPage} />
      <Route path="scraps/:scrapid" component={ScrapPage} >
        <IndexRoute component={ScrapPage} />
        <Route path="url" component={ScrapURL} />
        <Route path="finish-scrap" component={FinishScrap} />
      </Route>
      <Route path="scraps-create" component={NewScrap} />
    </Route>
  </Router>
),document.getElementById('site'));
