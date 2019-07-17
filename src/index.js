import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import Post from './pages/post'
import PostForm from './pages/post_form'
import PasswordGenerator from './pages/post_form'
import NotFound from './pages/not_found'
import { HOME_PATH, POST_PATH, POST_FORM_PATH, PASSWORD_GENERATOR_PATH } from './urls'

export const Routing = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={HOME_PATH} component={Home} exact />
        <Route path={POST_PATH} component={Post} />
        <Route path={POST_FORM_PATH} component={PostForm} />
        <Route path={PASSWORD_GENERATOR_PATH} component={PasswordGenerator} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(
    <App>
      <Routing />
    </App>,
    document.getElementById('app')
)

module.hot.accept()