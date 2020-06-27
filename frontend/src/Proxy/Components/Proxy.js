import React from "react";
import TableButton from "./TableComponents/TableButton";
import TableHeader from "./TableComponents/TableHeader";
import TableBody from "./TableComponents/TableBody";
import ProviderDataTable from "./TableComponents/ProviderDataTable";
import TestURLTable from "./TableComponents/TestURLTable";

class Proxy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            allItems: [],
            currentPage: 1,
            itemsPerPage: 50,
            activeIndex: 1,
            isBoxVisible: false,
            addClassCheck: false,
            providers: [],
            activeProvider: null,
            currentProvider: null,
            allActive: true,
            render: '',
            certainProxy: false,
            dataProxyProvider: [],
            ShowTestUrls: false,

        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleProviderClick = this.handleProviderClick.bind(this);
        this.handleTestUrlsTableClick = this.handleTestUrlsTableClick.bind(this);
        this.handleTableResetClick = this.handleTableResetClick.bind(this);
        this.handleUpdateProxyTableClick = this.handleUpdateProxyTableClick.bind(this);
    }

    handleTestUrlsTableClick(event) {
        this.setState({
            ShowTestUrls: !this.state.ShowTestUrls,
        });
    }

    handleTableResetClick(event) {
        this.setState({
            items: this.state.allItems,
            certainProxy: false,
            dataProxyProvider: [],
            activeProvider: null,
            currentProvider: null,
            allActive: true
        });

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
                    this.setState({
                        items: result['proxies'],
                        activeProvider: event,
                        currentProvider: event,
                        activeIndex: 1,
                        currentPage: 1,
                        certainProxy: true,
                        allActive: false,
                        dataProxyProvider: result['providers']
                    })
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            );
    }

    handleUpdateProxyTableClick() {
        this.setState({
            isLoaded: false,
        });
        this.componentDidMount()

    }

    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/proxies/`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result['proxies'],
                        providers: result['providers'],
                        allItems: result['proxies'],

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
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
            const {id, ip, port, createdAt, updatedAt, lastFoundAt, providerName} = proxy; //destructuring

            return (
                <TableBody
                    key={id}
                    BodyData={[
                        id, ip, port, createdAt, updatedAt, lastFoundAt, providerName
                    ]}
                />
            )
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
                <TableButton
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                    index={number}
                    text={number}
                    isActive={this.state.activeIndex === number}
                />
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
                    <div className="col-sm-9 text-left h5">
                        <h1 id='tableTitle'>Proxy Table</h1>
                        <ul id='provider-list' className='provider-ul'>
                            {this.state.ShowTestUrls === false ?
                                <TableButton
                                    key={Math.random()}
                                    onClick={this.handleTestUrlsTableClick}
                                    text={'Show Test URLs Data'}
                                /> : <TableButton
                                    key={Math.random()}
                                    onClick={this.handleTestUrlsTableClick}
                                    text={'Hide Test URLs Data!'}
                                />
                            }

                            <TableButton
                                key={Math.random()}
                                onClick={this.handleUpdateProxyTableClick}
                                text={'Update proxies Table'}
                            />
                        </ul>
                        <ul>
                            {this.state.ShowTestUrls ?
                                <TestURLTable/> :
                                ''
                            }
                        </ul>
                        <span className='prov-header'>Providers List : </span>
                        <ul id='provider-list' className='provider-ul'>

                            <TableButton
                                key={Math.random()}
                                onClick={this.handleTableResetClick}
                                text={'Show All Proxies'}
                                isActive={this.state.allActive}
                            />
                            {this.renderProviders()}
                        </ul>
                        {this.state.certainProxy ?
                            <ProviderDataTable
                                data={this.state.dataProxyProvider}
                                error={this.state.error}
                            /> :
                            null
                        }

                        <div className="table-responsive-sm">
                            <table className="table table-striped table-bordered table-sm">
                                <TableHeader
                                    headers={[
                                        'IP', 'Port',
                                        'CreatedAt',
                                        'Last successful functionality test date',
                                        'Last Found At',
                                        'Provider',
                                        '']
                                    }
                                />
                                {this.renderTableData()}
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