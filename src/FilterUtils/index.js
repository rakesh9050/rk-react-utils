import React, {Component} from "react";
import S from "string";
import DatePicker from "../Elements/DatePicker";
import {SelectFilterComponent as SelectFilterComponent} from "../Elements/Select";
import TimePicker from "../Elements/TimePicker";


import "./floatingInput.css"

const styles = {
    mainDiv: {
        position: "relative",
    },
    loadingBox: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(255, 255,255, 0.5)",
        textAlign: "center",
        paddingTop: "10%",
    },
    selfAlign: {
        display: "flex",
        marginLeft: 5,
        fontWeight: 600,
        fontFamily: 'Public Sans',
        marginBottom: 5,
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        color: "#555",
    },
};


class SimpleFormElement extends Component {
    state = {
        tempFiles: [],
        previewImage: null,
        previewVisible: false,
    };

    section = (type = "text") => {
        let x = this.props;
        let {item} = this.props;
        const value = item.value
        let keyLabel = `form-${item.key}`
        let {onChange} = item;
        switch (type) {
            case "select":
                if (!x.options) x.options = [];
                if (!x.item.defaultValue)
                    x.item.defaultValue = {key: "Please Select"};
                return (
                    <SelectFilterComponent
                        {...x}
                        /*  onChange={({target}) => {
                              onChange(target.value)
                          }} */
                        onChange={(value) => {
                            onChange(value)
                        }}
                        id={keyLabel}
                        value={value}
                    />

                );

            case "date":
                return (
                    <>
                        <DatePicker
                            {...x}
                            format={item.format}
                            id={keyLabel}
                            customCss={"did-floating-input"}
                            placeholder={" "}
                            onChange={onChange}
                            value={value}
                        />
                    </>
                );
            case "time":
                return (
                    <TimePicker
                        {...x}
                        format={item.format}
                        className={"did-floating-input"}
                        id={keyLabel}
                        onChange={onChange}
                        value={value}
                    />
                );


            default:
                return (
                    <>
                        <input
                            id={keyLabel}
                            className="did-floating-input"
                            type="text"
                            placeholder={""}
                            onChange={({target}) => {
                                onChange(target.value)
                            }}
                            value={value}
                        />
                    </>
                );
        }
    };

    render() {
        const {item} = this.props;
        const {type, label} = item;
        let keyLabel = `form-${item.key}`

        return (
            <div className={'filter_group'}>
                <div className={'did-floating-label-content'}>
                    {this.section(type)}
                    <label className={'did-floating-label'}>{label}</label>
                </div>
            </div>
        );
    }
}

class getAllFormFields extends Component {
    state = {
        fileUploads: [],
    };

    render() {
        const {
            item
        } = this.props;

        if (item.label === undefined) {
            item.label = S(item.key).humanize().titleCase().s;
        }

        let inputProps = {};

        if (!!item.placeholder) inputProps.placeholder = item.placeholder;

        if (!!item.options) {
            inputProps.options = item.options;
        } else {

        }

        if (!!item.type) inputProps.type = item.type;
        if (!!item.mode) inputProps.mode = item.mode;
        if (!!item.rows) inputProps.rows = item.rows;
        if (!!item.keyAccessor) inputProps.keyAccessor = item.keyAccessor;
        if (!!item.valueAccessor) inputProps.valueAccessor = item.valueAccessor;
        if (!!item.id) inputProps.id = item.id;
        return (
            <div style={styles.mainDiv}>
                <React.Fragment>
                    <SimpleFormElement
                        item={item}
                        {...inputProps}
                        allowClear={item.allowClear}
                    />
                </React.Fragment>
            </div>
        );
    }
}

export default (getAllFormFields)
