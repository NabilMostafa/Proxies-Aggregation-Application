import React from "react";

class ProviderDataTable extends React.Component {

    render() {
        return (
            <div className="table-responsive-sm">
                Data about Proxy:
                <table className="table table-striped table-bordered table-sm">
                    <tbody>
                    <tr>
                        <th>URL</th>
                        <th>Name</th>
                        <th>Date of Last Update</th>
                    </tr>
                    <tr>
                        <td>
                            {this.props.data.provider_url}
                        </td>
                        <td>
                            {this.props.data.provider_name}
                        </td>
                        <td>
                            {this.props.data.last_time_update}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default ProviderDataTable