import React, {Component} from 'react';
import NavBar from "./Components/nav";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

class PageWrapper extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid text-center" style={{"minHeight": "100vh"}}>

                    <NavBar/>
                    <Home/>

                </div>
                <div className="text-center">
                    <Footer/>
                </div>

            </div>
        )
    }
}

export default PageWrapper;