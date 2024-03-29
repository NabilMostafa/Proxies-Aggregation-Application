import React from "react";
import TableButton from "./TableButton";
import TestUrlsProxy from "./TestUrlsProxy";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ShowTestUrls: false,
            data: [],
            error: null,
            lastCheckedAt: this.props.BodyData[4]

        };
        this.handleTestUrlsTableClick = this.handleTestUrlsTableClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val) {
        this.setState({
            lastCheckedAt: val
        })
    }

    handleTestUrlsTableClick(event) {
        fetch(`http://127.0.0.1:8000/api/check_test_url/`, {
            method: 'PUT',
            body: JSON.stringify({
                    'id': this.props.BodyData[0],
                }
            )
        }).then(response => response.json())
            .then((result) => {
                    this.setState({
                        data: result,
                        ShowTestUrls: !this.state.ShowTestUrls,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                })

    }


    render() {
        const id = this.props.BodyData[0];
        return (
            <tbody>
            <tr key={this.props.BodyData[0]}>
                <td>{this.props.BodyData[1]}</td>
                <td>{this.props.BodyData[2]}</td>
                <td>{this.props.BodyData[3]}</td>
                <td>{this.state.lastCheckedAt === null ? 'Not yet tested' : this.state.lastCheckedAt}</td>
                <td>{this.props.BodyData[5]}</td>
                <td>{this.props.BodyData[6]}</td>
                <td id='show_test_button'>
                    {this.state.ShowTestUrls === false ?
                        <TableButton
                            key={Math.random()}
                            onClick={this.handleTestUrlsTableClick}
                            text={'Show Proxy Test URLs Data'}
                        /> : <TableButton
                            key={Math.random()}
                            onClick={this.handleTestUrlsTableClick}
                            text={'Hide Proxy Test URLs Data!'}
                        />
                    }
                </td>

            </tr>
            <tr>
                {this.state.ShowTestUrls ?
                    <TestUrlsProxy
                        key={id}
                        id={id}
                        data={this.state.data}
                        changeLastDate={this.handleChange}
                    /> :
                    null
                }
            </tr>
            </tbody>

        )
    }
}

export default TableBody