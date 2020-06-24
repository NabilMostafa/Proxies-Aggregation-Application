import React from "react";
import TableButton from "./TableButton";
import TestUrlsProxy from "./TestUrlsProxy";

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ShowTestUrls: false,

        };
        this.handleTestUrlsTableClick = this.handleTestUrlsTableClick.bind(this);
    }

    handleTestUrlsTableClick(event) {
        this.setState({
            ShowTestUrls: !this.state.ShowTestUrls,
        });
    }



    render() {
        const id = this.props.BodyData[0];
        const working = this.props.BodyData[8];
        return (
            <tbody>
            <tr key={this.props.BodyData[0]}>
                <td>{this.props.BodyData[0]}</td>
                <td>{this.props.BodyData[1]}</td>
                <td>{this.props.BodyData[2]}</td>
                <td>{this.props.BodyData[3]}</td>
                <td>{this.props.BodyData[4]}</td>
                <td>{this.props.BodyData[5]}</td>
                <td>{this.props.BodyData[6]}</td>
                <td>{this.props.BodyData[7]}</td>
                <td>
                    {working ?
                        <span>
                            <i id={'i-t' + id} className={'fas fa-check'} style={{display: "block"}}/>
                            <i id={'i-f' + id} className={'fas fa-times'} style={{display: "none"}}/>
                            </span>
                        :
                        <span>
                            <i id={'i-t' + id} className={'fas fa-check'} style={{display: "none"}}/>
                            <i id={'i-f' + id} className={'fas fa-times'} style={{display: "block"}}/>
                            </span>

                    }</td>
                <td>



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
                    /> :
                    null
                }
            </tr>
            </tbody>

        )
    }
}

export default TableBody