import React, {Component} from 'react';

class Intro extends Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row justify-content-md-center">
                    <div className="col-md-8 text-left h4">
                        <h1 style={{'textAlign': 'center'}}>Welcome To the Proxy Application</h1>
                        <h3> Tips for using the application: </h3>
                        <p>- Click on any proxy provider to view the details about that provider.</p>
                        <p>- Click Show test urls data to view the data about the test urls used in this project.</p>
                        <p>- Click Update proxy list to update and reload the list ( the list will not be updated if the
                            last updated was within the last 10 Minutes ).</p>
                        <p>- Click on Show Proxy Test URLs Data to view the test urls for that specific proxy</p>
                        <p>- Click on Re-check to recheck that proxy with the test url, if the test was successful the
                            Date of last successful functionality test will be updated, if the test fails nothing will
                            happen.</p>
                        <p>- In the Test Against Certain URL field user can enter a custom url to check the proxy
                            against,
                            To do that enter the url and press re-check button. The result will be shown after the test
                            is completed.
                        </p>
                        <hr/>

                    </div>
                </div>
            </div>
        )
    }
}

export default Intro;