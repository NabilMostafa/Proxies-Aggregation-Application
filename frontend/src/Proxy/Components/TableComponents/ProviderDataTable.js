import React from "react";

class ProviderDataTable extends React.Component {

    render() {
        console.log(this.props.data)
        return (
            <div className="table-responsive-sm">
                Data about Proxy:
                <table className="table table-striped table-bordered table-sm">
                    <tbody>
                    <tr>
                        <th>URL</th>
                        <th>Name</th>
                        <th>Date of Last Update</th>
                        <th>Number of records found</th>
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
                        <td>
                            {this.props.data.number_of_records} record was found in last request
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default ProviderDataTable