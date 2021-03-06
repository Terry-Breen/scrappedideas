import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory} from 'react-router'
import StartPage from './components/startpage'
import ScrapPage from './components/scrappage'
import NewScrap from './components/newscrap'
import FinishScrap from './components/finishscrap'
import Navbar from './components/navbar'
import ScrapURL from './components/scrapurl'
import AboutPage from './components/about'


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
      <Route path="scraps/:scrapid" component={ScrapPage} />
      <Route path="scraps/:scrapid/url" component={ScrapURL} />
      <Route path="scraps/:scrapid/finish-scrap" component={FinishScrap} />
      <Route path="scraps-create" component={NewScrap} />
      <Route path="about" component={AboutPage} />
    </Route>
  </Router>
),document.getElementById('site'));
