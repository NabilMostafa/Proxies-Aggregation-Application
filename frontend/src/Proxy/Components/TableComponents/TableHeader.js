import React from "react";

class TableHeader extends React.Component {

    render() {

        return (
            <tr >
                {this.props.headers.map((name)=>{
                    return <th key={Math.random()}>{name}</th>
                })}
            </tr>
        )
    }
}

export default TableHeader