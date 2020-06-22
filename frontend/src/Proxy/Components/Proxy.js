import React from "react";
import TableButton from "./TableComponents/TableButton";
import TableHeader from "./TableComponents/TableHeader";
import TableBody from "./TableComponents/TableBody";
import ProviderDataTable from "./TableComponents/ProviderDataTable";

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
            addClassCheck: false,
            providers: [],
            activeProvider: null,
            currentProvider: null,
            render: '',
            certainProxy: false,
            dataProxyProvider: [],
            headers: [
                'ID', 'IP', 'Port', 'Country', 'CountryCode',
                'CreatedAt',
                'UpdatedAt',
                'Provider',
                'Working']

        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleProviderClick = this.handleProviderClick.bind(this);
        this.handleTableChangeClick = this.handleTableChangeClick.bind(this);
        this.handleTableResetClick = this.handleTableResetClick.bind(this);
    }

    handleTableChangeClick(event) {
        this.setState({
            render: event,
        });
    }

    handleTableResetClick(event) {
        fetch(`http://127.0.0.1:8000/api/proxies/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result['proxies'],
                        certainProxy: false,
                        dataProxyProvider: [],
                        activeProvider: null,
                        currentProvider: null,
                    });
                })
    }

    handlePageClick(event) {
        this.setState({
            activeIndex: event,
            currentPage: event,
        });
    }

    handleProviderClick(event) {
        fetch(`http://127.0.0.1:8000/api/provider-list/${event}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result['providers']);
                    this.setState({
                        items: result['proxies'],
                        activeProvider: event,
                        currentProvider: event,
                        activeIndex: 1,
                        currentPage: 1,
                        certainProxy: true,
                        dataProxyProvider: result['providers']
                    })
                });
    }


    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/proxies/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result['proxies'],
                        providers: result['providers']
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
                <TableBody
                    key={id}
                    BodyData={[
                        id, ip, port, country, country_code, createdAt, updatedAt, providerName, working
                    ]}
                />
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


    renderProviders() {
        return this.state.providers.map(provider => {
                const {id, provider_name} = provider;
                return (
                    <TableButton
                        key={id}
                        onClick={this.handleProviderClick}
                        index={id}
                        text={provider_name}
                        isActive={this.state.activeProvider === id}>
                    </TableButton>
                )
            }
        )
    }

    renderTablePages() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.items.length / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => {
            return (
                <div key={number}>
                    <TableButton
                        key={number}
                        id={number}
                        onClick={this.handlePageClick}
                        index={number}
                        text={number}
                        isActive={this.state.activeIndex === number}
                    >
                        {number}
                    </TableButton>
                </div>
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
                        <h1 id='tableTitle'>Proxy Table</h1>
                        <ul id='provider-list'>
                            Providers List :
                            <TableButton
                                key={Math.random()}
                                onClick={this.handleTableResetClick}
                                text={'Show All'}
                            />
                            {this.renderProviders()}
                        </ul>
                        {this.state.certainProxy ?
                            <ProviderDataTable
                                data={this.state.dataProxyProvider}
                            /> :
                            ''
                        }

                        <div className="table-responsive-sm">
                            <table className="table table-striped table-bordered table-sm">
                                <tbody>
                                <TableHeader
                                    headers={this.state.headers}
                                />
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