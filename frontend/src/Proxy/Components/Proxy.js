import React from "react";


class Proxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentPage: 1,
            itemsPerPage: 25,
            activeIndex: null,
            isBoxVisible: false

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({

            activeIndex: event,
            currentPage: event
        });
    }


    componentDidMount() {
        fetch(`http://127.0.0.1:8000/proxies/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result[0]
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderTableData() {
        const {items, currentPage, itemsPerPage} = this.state;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

        return currentItems.map((proxy, index) => {
            const {id, provider, ip, port, country, country_code, createdAt, updatedAt} = proxy; //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{provider}</td>
                    <td>{country}</td>
                    <td>{country_code}</td>
                    <td>{createdAt}</td>
                    <td>{ip}</td>
                    <td>{port}</td>
                    <td>{updatedAt}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.items[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTablePages(props) {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.items.length / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            return (
                <MyClickable
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    index={number}
                    isActive={this.state.activeIndex === number}
                >
                    {number}
                </MyClickable>
            );
        });


    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container-fluid text-center">
                    <div className="row content justify-content-md-center">
                        <div className="col-sm-8 text-left h5">
                            <h1 id='title'>React Dynamic Table</h1>
                            <div className="table-responsive-sm">
                                <table className="table table-striped table-bordered table-sm">
                                    <tbody>
                                    <tr>{this.renderTableHeader()}</tr>
                                    {this.renderTableData()}
                                    </tbody>
                                </table>
                                    <ul id='page-numbers'>
                                    {this.renderTablePages()}
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


class MyClickable extends React.Component {
    handleClick = () => this.props.onClick(this.props.index);

    render() {
        return <li
            type='button'
            className={
                this.props.isActive ? 'active' : 'album'
            }
            onClick={ this.handleClick }
        >
            { this.props.index }
        </li>
    }
}

export default Proxy;