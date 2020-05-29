import React, {Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import PageWrapper from "./Proxy/PageWrapper";

class App extends Component {
    render() {
        return (
            <Router>
                <PageWrapper>

                </PageWrapper>

            </Router>
        );
    }
}

export default App;