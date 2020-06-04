import React, {Component} from 'react';
import Intro from './Intro';

import Proxy from "./Proxy";

class Home extends Component {
    render() {
        return (
            <div>
                <Intro/>
                <Proxy/>
            </div>

        );
    }
}

export default Home;