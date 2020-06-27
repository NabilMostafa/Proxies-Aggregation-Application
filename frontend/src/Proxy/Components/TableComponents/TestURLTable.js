import React from "react";

class TestURLTable extends React.Component {

    render() {
        return (
            <div className="table-responsive-sm">
                <span>Data about Test URLs:</span>
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
                            This url returns Response [200] and Json object with the proxy ip if the request with proxy
                            worked, else it returns error and the
                            request fails.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ip8.com/ip
                        </td>
                        <td>
                            This url returns 200 success and the proxy ip address as text if the request with proxy
                            worked, else if the request fails it returns error.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            api.ipify.org
                        </td>
                        <td>
                            This url returns 200 success and the proxy ip address as text if the request with proxy
                            worked, else if the request fails it returns error.
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        )
    }
}

export default TestURLTable