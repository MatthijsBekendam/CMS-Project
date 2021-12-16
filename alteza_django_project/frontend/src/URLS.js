import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import App from "./App";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path='/home' component={App}></Route>
            </Switch>
        </Router>)
    }
}