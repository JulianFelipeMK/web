import React, { Component } from 'react';

import MainMenu from './Components/Views/MainMenu'
import ManagementPersonal from './Components/Views/ManagementPersonal'
import Graphs from './Components/Views/Graphs'
import Login from './Components/Views/Login'
import RequestTranspass from './Components/Views/RequestTranspass'
import Programations from './Components/Views/Programations'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class RoutesHandler extends Component {

    PrivateRoute = ({ component: Component, logged, ...rest }) => (
        <Route
            {...rest}
            render={(props) => localStorage.getItem("logged")
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )

    render() {
        return (
            <Router>
                <Route path="/" component={Login} exact ></Route>
                <this.PrivateRoute path='/request' component={RequestTranspass}></this.PrivateRoute>
                <this.PrivateRoute path='/personal' component={ManagementPersonal}></this.PrivateRoute>
                <this.PrivateRoute path='/statistics' component={Graphs}></this.PrivateRoute>
                <this.PrivateRoute path='/menu' component={MainMenu}></this.PrivateRoute>
                <this.PrivateRoute path='/programations' component={Programations}></this.PrivateRoute>
            </Router>
        )
    }
}

export default RoutesHandler