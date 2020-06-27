import React from "react";

class TestUrlsProxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: null,
            customUrlMessage:null,
            currentlyChecking: false,
            url1CheckedAt: this.props.data[0] ? this.props.data[0].checkedAt : null,
            url2CheckedAt: this.props.data[1] ? this.props.data[1].checkedAt : null,
            url3CheckedAt: this.props.data[2] ? this.props.data[2].checkedAt : null,
            inputUrl: ''


        };
        this.updateInputUrl = this.updateInputUrl.bind(this);

    }

    updateInputUrl(event) {
        this.setState({
            inputUrl: event.target.value
        });
    }

    reCheckCustomUrl(url) {
        if (url.includes('http')) {
            this.setState({
                currentlyChecking: true,
                customUrlMessage: null
            });
            let id = this.props.id;
            fetch(`http://127.0.0.1:8000/api/check/`, {
                method: 'PUT',
                body: JSON.stringify({
                        'id': id,
                        'test_url': url
                    }
                )
            }).then(response => response.json())
                .then((result) => {
                    if (result['working']){
                        this.setState({
                            customUrlMessage:'200 Ok! Success'
                        })
                    } else{
                        this.setState({
                            customUrlMessage:'Not working, Error was returned'
                        })
                    }
                        this.setState({
                            data: result,
                            isLoaded: true,
                            currentlyChecking: false,
                        });

                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            customUrlMessage: error
                        });
                    })
        } else {
            this.setState({
                customUrlMessage: 'You must include http or https in url (scheme: http://address)'
            });
        }

    }

    reCheckProxy(url, urlnum) {
        this.setState({
            currentlyChecking: true

        });
        let id = this.props.id;
        fetch(`http://127.0.0.1:8000/api/check/`, {
            method: 'PUT',
            body: JSON.stringify({
                    'id': id,
                    'test_url': url
                }
            )
        }).then(response => response.json())
            .then((result) => {
                    console.log(result);
                    if (urlnum === 1 && result['test_url']) {
                        this.setState({url1CheckedAt: result['test_url'].checkedAt});
                        this.props.changeLastDate(result['test_url'].checkedAt)

                    } else if (urlnum === 2 && result['test_url']) {
                        this.setState({url2CheckedAt: result['test_url'].checkedAt});
                        this.props.changeLastDate(result['test_url'].checkedAt)
                    } else if (urlnum === 3 && result['test_url']) {
                        this.setState({url3CheckedAt: result['test_url'].checkedAt});
                        this.props.changeLastDate(result['test_url'].checkedAt)
                    }

                    this.setState({
                        data: result,
                        isLoaded: true,
                        currentlyChecking: false,
                    });
                    // let elementFalse = document.getElementById('i-f' + id);
                    // let elementTrue = document.getElementById('i-t' + id);
                    //
                    // if (result['working']) {
                    //     elementFalse.style.display = (elementFalse.style.display = 'none');
                    //     elementTrue.style.display = (elementTrue.style.display = 'block');
                    //
                    // } else {
                    //     elementFalse.style.display = (elementFalse.style.display = 'block');
                    //     elementTrue.style.display = (elementTrue.style.display = 'none');
                    //
                    // }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                })

    }

    render() {
        return (
            <td colSpan={10}>
                <table className="table table-striped table-bordered table-sm">
                    <tbody>
                    <tr>
                        <th>URL</th>
                        <th>Date of last successful functionality test</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            httpbin.org/ip
                        </td>
                        <td>
                            {this.state.url1CheckedAt ? this.state.url1CheckedAt : 'Not Checked here yet'}
                        </td>
                        <td>
                            {!this.state.currentlyChecking ?
                                <button onClick={(event) => {
                                    this.reCheckProxy('http://httpbin.org/ip', 1)
                                }} type="button"
                                        className="btn btn-primary">Re-Check
                                </button> :
                                <p>Checking in progress</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ip8.com/ip
                        </td>
                        <td>
                            {this.state.url2CheckedAt ? this.state.url2CheckedAt : 'Not Checked here yet'}
                        </td>
                        <td>
                            {!this.state.currentlyChecking ?
                                <button onClick={(event) => {
                                    this.reCheckProxy('http://ip8.com/ip', 2)
                                }} type="button"
                                        className="btn btn-primary">Re-Check
                                </button> :
                                <p>Checking in progress</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            api.ipify.org
                        </td>
                        <td>
                            {this.state.url3CheckedAt ? this.state.url3CheckedAt : 'Not Checked here yet'}
                        </td>
                        <td>
                            {!this.state.currentlyChecking ?
                                <button onClick={(event) => {
                                    this.reCheckProxy('http://api.ipify.org', 3)
                                }} type="button"
                                        className="btn btn-primary">Re-Check
                                </button> :
                                <p>Checking in progress</p>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Test Against Certain URL:
                        </td>
                        <td>
                            <input value={this.state.inputUrl} onChange={this.updateInputUrl}/>
                            {this.state.customUrlMessage != null ? <li>
                                {this.state.customUrlMessage}
                            </li> : null}
                        </td>
                        <td>
                            {!this.state.currentlyChecking ?
                                <button onClick={(event) => {
                                    this.reCheckCustomUrl(this.state.inputUrl)
                                }} type="button"
                                        className="btn btn-primary">Re-Check
                                </button> :
                                <p>Checking in progress</p>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>

        )
    }
}

export default TestUrlsProxy