import React, {Component, useEffect, useState} from "react";
import Table from "rc-table";
import "rc-table/assets/index.css";
import _ from 'lodash'
import {Card, Checkbox} from "../appUtils";
import memoizeOne from 'memoize-one'
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import '../Pagination/index.css';
import faSearch from "./icons/search.svg"
import darkSearch from "./icons/darkSearch.svg"
import "./index.css";
import {FilterEachFields} from "../../_appUtils/filterUtils";
import async from "async"
import moment from "moment";

const defaultPagination = {
    defaultPageSize: 10, pageSizeOptions: ['10', '25', '50', '100', '200'], position: 'top'
}

const ColumnsComponent = (props) => {
    let {filterFields, columns, onChange, onSubmit, initialColumns: initCal} = props;
    let [state, setState] = useState({})
    let initialChecked = initCal && initCal.length ? columns.filter((col) => initCal.includes(col.key)) : columns;
    const [selectedColumns, setSelectedColumns] = useState(
        initialChecked.map((col) => col.key)
    );

    const handleCheckboxChange = (selected) => {
        setSelectedColumns(selected);
        // onChange(selected);
    };

    useEffect(() => {
        handleFilter()
    }, [selectedColumns])

    let handleFilter = () => {
        let newColumns = columns.filter(col => selectedColumns.includes(col.key));
        /*newColumns = [{
            title: 'Sr. No.',
            key: 'serialNumber',
            render: (text, record, index) => index + 1
        }, ...newColumns]*/
        if (newColumns.length == 0) {
            newColumns = [{
                title: 'Sr. No.',
                key: 'serialNumber',
                render: (text, record, index) => index + 1
            }]
        }
        onChange(newColumns);
    }

    let viewComponent = (
        <div className="dropdown" style={{float: "right"}}>
            <button
                className="btn btn-label-primary rounded-pill  dropdown-toggle hide-arrow btn-sm"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    marginRight: 0,
                    padding: "4px 15px 2px 8px"
                }}>
                <div className="position-relative">
                    <i className={"menu-icon tf-icons bx bx-list-ul"}
                       style={{marginRight: "3px !important"}}/>
                    View
                    <span className="badge rounded-pill bg-danger border"/>
                </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
                style={{minWidth: 200, width: "auto", animation: "slide-up 0.3s"}}
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className="menuBox"
                     style={{padding: "10px", minWidth: 200, width: "auto"}}>
                    <Checkbox.Group
                        options={columns}
                        keyAccessor={x => x.title}
                        valueAccessor={x => x.key}
                        value={selectedColumns}
                        onChange={handleCheckboxChange}
                        className="custom-checkbox-group"
                    />
                </div>
            </ul>
        </div>
    )

    const events = {
        initState: () => {

        },
        handleFilter: () => {
            let fieldKeys = {}
            async.forEachOf(state, (item, key, cb) => {
                if (item) {
                    fieldKeys[key] = item
                }
                cb()
            }, () => {
                onSubmit(fieldKeys);
            })
        },
        handleClear: () => {
            if (filterFields && filterFields.length) {
                let fieldKeys = {}
                _.each(filterFields, (item) => {
                    fieldKeys[item.key] = ""
                })
                setState(fieldKeys)
            }
            onSubmit({});
        },
        _updateState: (data) => {
            setState((prevState) => {
                return {
                    ...prevState,
                    ...data
                }
            })
        }
    }

    return (
        <>
            <Card className={'pt-0'}>
                {filterFields && filterFields.length ? <>
                    <div className={'row'}>
                        {filterFields.map((item) => (
                            <div className={item.span} key={item.key}>
                                <FilterEachFields
                                    item={{
                                        ...item,
                                        value: state[item.key] ? state[item.key] : undefined,
                                        onChange: (e) => {
                                            if (item.getValue) {
                                                item.getValue(e)
                                            }
                                            events._updateState({[item.key]: e})
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className={'d-flex'}>
                            <div className="search-wrap">
                                <a className="btn btn-label-primary rounded-pill btn-sm"
                                   onClick={events.handleFilter}>
                                    <i className={'bx bx-search'}/>&nbsp;Search
                                </a>
                            </div>
                            <div className="search-wrap ml-2">
                                <a className="btn btn-label-dark rounded-pill btn-sm"
                                   onClick={events.handleClear}>
                                    <i className={'bx bx-brush-alt'}/>&nbsp;Clear
                                </a>
                            </div>
                        </div>
                        <div>
                            {viewComponent}

                        </div>
                    </div>

                </> : <>
                    {viewComponent}
                </>}
            </Card>
        </>
    );
};

class MenuCallback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    setUpdateText = (target) => {
        let value = target && target.value ? target.value : null
        this.setState({searchText: value})
    }

    handleSearch = () => {
        let {searchText} = this.state;
        let {confirm, searchTextName, toggleMenu} = this.props;
        // confirm({[searchTextName]: searchText ? [searchText] : []})
        confirm(searchText, searchTextName)
        toggleMenu()

    }
    handleClear = () => {
        let {handleReset, searchTextName, toggleMenu} = this.props;
        this.setState({
            searchText: ""
        }, () => {
            handleReset(searchTextName)
            toggleMenu()
        })
    }

    render() {
        let {searchText} = this.state;
        return (
            <div className={'filterBtnGroup'}>
                <input type={'text'}
                       placeholder={'Search'}
                       autoFocus={true}
                       className={'searchInput'}
                       value={searchText}
                       onChange={e => this.setUpdateText(e.target)}
                />
                <button className={'btn btn-search'}
                        icon="search"
                        size="small"
                        style={{width: 90, marginRight: 8}}
                        onClick={() => this.handleSearch()}
                >
                    <img src={faSearch} className={'searchIcon'}/> {' '}
                    Search
                </button>
                <button
                    className={'btn btn-reset'}
                    onClick={() => {
                        this.handleClear()
                    }}
                    style={{width: 90}}>
                    Reset
                </button>
            </div>
        )
    }
}

const GetColumnSearchTitleProps = (props) => {
    let {title} = props;
    let [visible, setVisible] = useState(false)
    let toggleMenu = () => {
        setVisible(!visible);
    }
    return (
        <>
            {title}
            <Dropdown
                trigger={['click']}
                visible={visible}
                // onBlur={() => setVisible(false)}
                overlay={<MenuCallback {...props} toggleMenu={toggleMenu}/>}
                animation="slide-up"
                onVisibleChange={(visibleValue) => {
                    toggleMenu()
                }}>
                <button className={'searchBtn'}>
                    <img src={darkSearch} className={'searchIcon'}/>
                </button>
            </Dropdown>
        </>
    )
}

class TableMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            size: 'small',
            columns: [],
            pagination: this.props.pagination || defaultPagination,
            loading: true,
            searchText: '',
            dataSearchParams: {},
            selectedKeys: {},
            refreshKey: moment()
        }

        this.fetch2 = memoizeOne(this.fetch);
        this.setLocal2 = this.setLocal;

        // this.tableRef = React.createRef()
    }

    fetch = async (params = {}) => {
        let cloneA = Object.assign(this.state.selectedKeys, {})
        this.setState({
            loading: true,
            dataSearchParams: params,
        })
        params.count = params.results || this.state.pagination.defaultPageSize
        let data = await this.props.apiRequest({...params, ...cloneA})
        let pagination = {...this.state.pagination}
        pagination.total = data.total;
        this.setState({
            loading: false,
            data: data.data,
            pagination,
            refreshKey: moment()
        })

    }
    setLocal = () => {
        this.setState({
            loading: false,
            data: this.props.dataSource,
        }, () => {

        })
    }

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({searchText: selectedKeys[0]})
    }


    reload = () => {
        if (!!this.props.apiRequest) {
            this.fetch(this.state.dataSearchParams)
        }
    }


    reloadOnPageChange = () => {
        this.setState({loading: true})
        if (!!this.props.apiRequest) {
            let {pagination} = this.state
            this.fetch({
                results: pagination.defaultPageSize,
                page: pagination.current,
            })
        }
    }

    setDataState = async () => {


    }


    handleReset = (key) => {
        let {selectedKeys} = this.state;
        let cloneObj = Object.assign(selectedKeys, {})
        delete cloneObj[key];
        this.setState({selectedKeys: cloneObj}, () => {
            this.fetch()
        })
    }

    confirmFxn = (value, key) => {
        let {selectedKeys} = this.state;
        let cloneObj = Object.assign(selectedKeys, {})
        if (value) {
            cloneObj[key] = [value]
        } else {
            delete cloneObj[key]
        }
        this.setState({selectedKeys: cloneObj}, () => {
            this.fetch()
        })
    }

    componentDidMount() {
        this.setFieldsDefault()
    }


    setFieldsDefault = () => {
        let {pagination = defaultPagination, apiRequest, columns} = this.props
        let x = []
        _.each(columns, (i) => {
            if (typeof i.dataIndex == 'string') {
                i.dataIndex = i.dataIndex.split('.')
            }
            if (i.searchTextName) {
                i.placeHolder = `Search ${i.title}`
                i.title = <GetColumnSearchTitleProps
                    {...i}
                    confirm={this.confirmFxn}
                    handleReset={(value) => this.handleReset(value)}
                />
            }
            if (i.dataIndex === undefined && i.key !== 'actions' && i.type !== 'actions') {
                i.dataIndex = i.key
            }
            x.push(i)
        })

        this.setState({
            columns: x
        })

        if (!!apiRequest) {
            this.fetch2({
                results: pagination.defaultPageSize
            })
        } else {
            this.setLocal2()
        }
    }


    renderDynamic() {
        const {columns, pagination, refreshKey} = this.state;
        let {
            ref = null,
            extraProps = {},
            filterFields,
            initialColumns,
            showView = false,
            showPagination = true
        } = this.props

        return (
            <React.Fragment>
                {/* {initialColumns && initialColumns.length ?
                    : null}*/}

                {/* {showView ? <ColumnsComponent
                    columns={this.props.columns}
                    initialColumns={initialColumns}
                    filterFields={filterFields}
                    onSubmit={(data) => {
                        this.setState({
                            selectedKeys: data
                        }, () => {
                            this.reload()
                        })
                    }}
                    onChange={(newColumns) => {
                        this.setState({
                            columns: newColumns
                        })
                    }}
                /> : null}*/}

                <div>
                    {showPagination ? <div className={'pagination-box'}>
                        <Pagination
                            onChange={(item) => {
                                this.setState({
                                    pagination: {
                                        ...pagination,
                                        current: item
                                    }
                                }, () => {
                                    this.reloadOnPageChange()
                                })
                            }}
                            defaultPageSize={pagination.defaultPageSize}
                            current={pagination.current || 1}
                            total={pagination.total}
                        />
                    </div> : null}
                </div>
                <div className="card-datatable table-responsive" key={refreshKey}>
                    {/*{...extraProps}*/}


                    <Table
                        {...extraProps}
                        reference={ref}
                        bordered
                        className={'table text-start align-middle table-hover mb-0 data-table '}
                        columns={columns}
                        rowKey={record => record._id}
                        data={this.state.data}
                    />
                </div>

            </React.Fragment>
        )
    }

    renderStatic() {
        const {columns, data} = this.state;
        const {ref = null, extraProps = {}, dataSource} = this.props;
        return (
            <div className="card-datatable table-responsive">
                <Table
                    {...extraProps}
                    reference={ref}
                    bordered
                    className={'table text-start align-middle table-hover mb-0 data-table'}
                    columns={columns}
                    rowKey={record => record._id}
                    data={data}
                />
            </div>
        )
    }


    render() {
        const {apiRequest} = this.props
        return (
            <React.Fragment>
                {!!apiRequest ? this.renderDynamic() : this.renderStatic()}
            </React.Fragment>
        )
    }

}

export default TableMain
TableMain.TableColumnsComponent = ColumnsComponent;
