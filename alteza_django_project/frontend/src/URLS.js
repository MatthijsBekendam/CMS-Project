import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import App from "./App";
import UserPage from "./components/UserPage";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path='/' component={App}></Route>
                <Route exact path='/users' component={UserPage}></Route>
            </Switch>
        </Router>)
    }
}