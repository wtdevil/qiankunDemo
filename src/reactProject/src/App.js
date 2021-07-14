import './App.css';
import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import PageOne from './page/pageone'
import PageTwo from './page/pagetwo'

const App = (props) => {
  const goToParent = () => {
    props.route?.pushState({}, '', '/child')
  }
  return (
    <div className="App">
      <button onClick={() => goToParent()}>返回到主应用</button>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/childone' : '/'}>
        <Route path="/" component={PageOne} exact />
        <Route component={PageOne} path="/PageOne" exact />
        <Route component={PageTwo} path="/PageTwo" exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
