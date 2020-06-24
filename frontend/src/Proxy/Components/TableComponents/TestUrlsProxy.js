import React from "react";

class TestUrlsProxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: null

        };
    }

    reCheckProxy(url) {
        console.log(this.props.id);
        console.log(url);
        let id = this.props.id;
        fetch(`http://127.0.0.1:8000/api/check/`, {
            method: 'PUT',
            body: JSON.stringify({
                    'id': id,
                    'test_url':url
                }
            )
        }).then(response => response.json())
            .then((result) => {
                    this.setState({
                        data: result,
                        isLoaded: true,

                    });
                    let elementFalse = document.getElementById('i-f' + id);
                    let elementTrue = document.getElementById('i-t' + id);

                    console.log(result['working']);
                    if (result['working']) {
                        elementFalse.style.display = (elementFalse.style.display = 'none');
                        elementTrue.style.display = (elementTrue.style.display = 'block');

                    } else {
                        elementFalse.style.display = (elementFalse.style.display = 'block');
                        elementTrue.style.display = (elementTrue.style.display = 'none');

                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
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
                            http://httpbin.org/ip
                        </td>
                        <td>
                            25junT14215
                        </td>
                        <td>
                            <button onClick={(event) => {
                                this.reCheckProxy('http://httpbin.org/ip')
                            }} type="button"
                                    className="btn btn-primary">Re-Check
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2url
                        </td>
                        <td>
                            2desc
                        </td>
                        <td>
                            <button onClick={(event) => {
                                this.reCheckProxy(this.props.id)
                            }} type="button"
                                    className="btn btn-primary">Re-Check
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            3url
                        </td>
                        <td>
                            3desc
                        </td>
                        <td>
                            <button onClick={(event) => {
                                this.reCheckProxy(this.props.id)
                            }} type="button"
                                    className="btn btn-primary">Re-Check
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>

        )
    }
}

export default TestUrlsProxy