import React, {Component} from 'react';
import NavBar from "./Components/nav";
import Home from "./Components/Home";

class PageWrapper extends Component{
    render(){
        return(
                <div>
                    <NavBar/>
                    <Home/>
                </div>
        )
    }
}

export default PageWrapper;