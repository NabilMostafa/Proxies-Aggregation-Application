import React from "react";

class MyClickable extends React.Component {
    handleClick = () => this.props.onClick(this.props.index);


    render() {
        return (
            <li
                type='button'
                className={
                    this.props.isActive ? 'active' : ''
                }
                onClick={this.handleClick}
            >
               ( {this.props.text} )
            </li>
        )
    }
}

export default MyClickable