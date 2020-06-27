import React from "react";

class ProviderDataTable extends React.Component {

    render() {
        if (this.props.error) {
            return <div>Error: {this.props.error.message}</div>;
        } else {
            return (
                <div className="table-responsive-sm">
                   <span> Data about Proxy: </span>
                    <table className="table table-striped table-bordered table-sm">
                        <tbody>
                        <tr>
                            <th>URL</th>
                            <th>Name</th>
                            <th>Details of Extraction</th>
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
                                {this.props.data.provider_details}
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
}

export default ProviderDataTable