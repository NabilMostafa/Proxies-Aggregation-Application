import React from "react";
import MyClickable from "./TableButton";


class Proxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            currentPage: 1,
            itemsPerPage: 25,
            activeIndex: 1,
            isBoxVisible: false,
            addClassCheck: false

        };
        this.handleClick = this.handleClick.bind(this);
    }

    toggle() {
    }

    handleClick(event) {
        this.setState({
            activeIndex: event,
            currentPage: event
        });
    }


    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/proxies/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result[0],
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
            const {id, ip, port, country, country_code, createdAt, updatedAt, providerName, working} = proxy; //destructuring

            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{country}</td>
                    <td>{country_code}</td>
                    <td>{createdAt}</td>
                    <td>{ip}</td>
                    <td>{port}</td>
                    <td>{updatedAt}</td>
                    <td>{providerName}</td>
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
        })
    }

    reCheckProxy(id) {
        fetch(`http://127.0.0.1:8000/api/check/`, {
            method: 'PUT',
            body: JSON.stringify({
                    'id': id
                }
            )
        }).then(response => response.json())
            .then((result) => {
                let elementFalse = document.getElementById('i-f' + id);
                let elementTrue = document.getElementById('i-t' + id);

                console.log(result['working']);
                if (result['working']) {
                    elementFalse.style.display = (elementFalse.style.display = 'none');
                    elementTrue.style.display = (elementTrue.style.display = 'block');

                } else {
                    elementFalse.style.display = (elementFalse.style.display = 'block');
                    elementTrue.style.display = (elementTrue.style.display = 'none');

                }
            })
    }


    renderTableHeader() {
        return (
            <tr>
                <th>ID</th>
                <th>Country</th>
                <th>CountryCode</th>
                <th>CreatedAt</th>
                <th>Ip</th>
                <th>Port</th>
                <th>UpdatedAt</th>
                <th>Provider</th>
                <th>Working</th>
            </tr>
        )
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
                <div className="row content justify-content-md-center">
                    <div className="col-sm-8 text-left h5">
                        <h1 id='tableTitle'>Proxy  Table</h1>
                        <div className="table-responsive-sm">
                            <table className="table table-striped table-bordered table-sm">
                                <tbody>
                                {this.renderTableHeader()}
                                {this.renderTableData()}
                                </tbody>
                            </table>
                            <ul id='page-numbers'>
                                {this.renderTablePages()}
                            </ul>

                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default Proxy;