import React from "react";

class TestURLTable extends React.Component {

    render() {
        return (
            <div className="table-responsive-sm">
                Data about Test URLs:
                <table className="table table-striped table-bordered table-sm">
                    <tbody>
                    <tr>
                        <th>URL</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>
                            httpbin.org/ip
                        </td>
                        <td>
                            1desc
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ip8.com/ip
                        </td>
                        <td>
                            2desc
                        </td>
                    </tr>
                    <tr>
                        <td>
                            api.ipify.org
                        </td>
                        <td>
                            3desc
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default TestURLTable