import React from "react";

class TableBody extends React.Component {

    render() {
        const id = this.props.BodyData[0];
        const working = this.props.BodyData[8];
        return (
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

                    }
                    <button onClick={(event) => {
                        this.reCheckProxy(id)
                    }} type="button"
                            className="btn btn-primary">Re-Check
                    </button>

                </td>
            </tr>

        )
    }
}

export default TableBody