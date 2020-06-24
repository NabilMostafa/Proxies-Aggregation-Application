import React from "react";

class TableHeader extends React.Component {

    render() {

        return (
            <thead>
            <tr>
                {this.props.headers.map((name) => {
                    return <th key={Math.random()}>{name}</th>
                })}
            </tr>
            </thead>
        )
    }
}

export default TableHeader