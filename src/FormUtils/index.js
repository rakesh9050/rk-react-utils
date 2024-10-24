import React, {Component} from "react";
import S from "string";
import DatePicker from "../Elements/DatePicker";
import Form from "../Elements/Form";
import TimePicker from "../Elements/TimePicker";
import PhoneInput from "../Elements/PhoneInput";
import Switch from "../Elements/Switch";
import Radio from "../Elements/RadioButton";
import {SelectRc as Select} from "../Elements/Select";
import Checkbox from "../Elements/CheckBox";

import _ from "lodash"
import moment from "moment";

const FormItem = Form.Item;

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

export const dateOfBirthPicker = (data) => {
    data = data.replace("/", "").replace(/[^\d]/, "");
    let day = data.substring(0, 2);
    let month = data.substring(2, 4);
    let year = data.substring(4, 8);
    let date = "";
    if (day > 31) {
        day = "0" + day;
    }
    if (month > 12) {
        month = "0" + month;
    }
    /*if (day) {
        date = date + day;
    }*/
    if (month) {
        month = "/" + month;
    }
    if (year) {
        year = "/" + year;
    }
    return `${day}${month}${year}`;
};


class SimpleFormElement extends Component {
    state = {
        tempFiles: [],
        previewImage: null,
        previewVisible: false,
    };

    constructor(props) {
        super(props);
        this.fileRef = React.createRef()
    }

    section = (type = "text") => {
        let errors;
        let x = _.clone(this.props);
        let {item, getFieldError} = this.props;
        delete item['required']
        // console.log(item)
        let {
            placeholder = "",
            multiple = false,
            value,
            onChange,
            minHeight = 50
        } = item;
        switch (type) {
            case "select":
                if (!x.options) x.options = [];
                if (!x.item.defaultValue)
                    x.item.defaultValue = {key: "Please Select"};
                let defaultValue = multiple
                    ? value !== undefined
                        ? value
                        : []
                    : value ? value
                        : undefined;
                return (
                    <>
                        <Select
                            {...x}
                            // value={value ? value : undefined}
                            multiple={multiple} onChange={onChange}/>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "textarea":
                return (
                    <>
                        <textarea className="form-control" {...x} {...item} style={{minHeight: minHeight}}></textarea>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "checkbox":
                return (
                    <>
                        <Checkbox.Group {...x} {...item} onChange={onChange} value={this.props.value}
                                        listStyle={'inline'}/>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "radio":
                return (
                    <>
                        <Radio {...x} {...item} value={this.props.value}/>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "date":
                return (
                    <>
                        <DatePicker
                            {...x}
                            format={item.format}
                            className={"form-control"}
                            onChange={onChange}
                        />
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "time":
                return (
                    <><TimePicker
                        {...x}
                        format={item.format}
                        className={"form-control"}
                        onChange={onChange}
                    />
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "phone":
                return (
                    <><PhoneInput
                        {...x}
                        format={item.format}
                        onChange={onChange}
                    />
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "switch":
                return (
                    <>
                        <Switch {...item} onChange={onChange}/>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "file":
                let filename = x['value']
                let refreshKey = x['value'] ? x['value'] : moment()
                if (x.value && x.value.name) {
                    x.value.filename = x.value.name
                } else {
                    if (this.fileRef.current) {
                        this.fileRef.current.value = ""
                    }
                }
                delete x['value']
                return (
                    <>
                        <div className="input-group">
                            <input
                                type={type}
                                placeholder={`${placeholder}`}
                                {...x}
                                {...item}
                                ref={this.fileRef}
                                className="form-control"
                                onChange={({target}) => {
                                    item.onChange(target.files)
                                }}
                            />


                            {/*<a className="input-group-text" style={{paddingRight: 30}}>
                                <img src="../app/img/upload.svg" alt="" style={{paddingLeft: 15}}/>
                                {fileName && fileName.name ? fileName.name :
                                    "Upload Your File"}
                            </a>*/}
                        </div>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "customfile":
                let filenames = x['value']
                let refreshKeys = x['value'] ? x['value'] : moment()
                if (x.value && x.value.name) {
                    x.value.filenames = x.value.name
                } else {
                    if (this.fileRef.current) {
                        this.fileRef.current.value = ""
                    }
                }
                delete x['value']
                return (
                    <>

                        <label htmlFor="file-upload" className={'btn rounded-pill btn-label-secondary ml-4'}>

                            <i className={'bx bxs-file-pdf opacity-75'}/>

                            <input
                                type={type}
                                placeholder={`${placeholder}`}
                                {...x}
                                {...item}
                                ref={this.fileRef}
                                className="form-control"
                                onChange={({target}) => {
                                    item.onChange(target.files)
                                }}
                            />
                        </label>


                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
            case "custom":
                return (
                    <>
                        <input
                            type={type}
                            placeholder={`${placeholder}`}
                            {...item}
                            {...x}
                            className="form-control"
                        />
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}

                    </>
                );
            case "dateOfBirth":
                return (
                    <>
                        <div className="input-group">
                            <input
                                placeholder={`${placeholder}`}
                                {...item}
                                {...x}
                                type={'text'}
                                style={{height: 38}}
                                className="form-control"
                                onChange={({target}) => {
                                    let valueDate = target.value ? dateOfBirthPicker(target.value) : null
                                    item.onChange(valueDate)
                                }}
                            />
                            <span className="input-group-text cursor-pointer dateBirthBox">
                                 <DatePicker
                                     format={item.format}
                                     value={value ? moment(value, 'DD/MM/YYYY') : null}
                                     customCss={"birthPicker"}
                                     onChange={(value) => {
                                         if (value) {
                                             item.onChange(moment(value).format("DD/MM/YYYY"))
                                         }
                                     }}
                                 />
                                <i className="bx bx-calendar"></i>
                            </span>
                        </div>


                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}

                    </>
                );
            default:
                return (
                    <>
                        <div className="rowFlex">
                            <input
                                placeholder={`${placeholder}`}
                                {...item}
                                {...x}
                                type={'text'}
                                className="form-control"
                            />
                        </div>
                        {(errors = getFieldError(item.key)) ? (
                            <div className={"errorMsg"}>{errors.join(",")}</div>
                        ) : null}
                    </>
                );
        }
    };

    render() {
        const {item} = this.props;
        const {type, label, extra, required = false, customBtn = "", showStar = false} = item;
        return (
            <React.Fragment>
                <div className={'mb-2 d-flex flex-column'}>
                    <label className="form-label float-start">{label} {required ? <strong>*</strong> : ""}</label>
                    {this.section(type)}
                </div>
            </React.Fragment>
        );
    }
}

class getAllFormFields extends Component {
    state = {
        fileUploads: [],
    };

    checkEmailValidation = (rule, value, callback) => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (rule.required && !value) {
            callback(`${rule.label} a Mandatory Field`)
            return
        }
        if (value) {
            if (rule.key == "email") {
                if (!value.match(validRegex)) {
                    callback(`Enter valid ${rule.label} address`);
                } else {
                    callback()
                }
            } else {
                if (!moment(value, "DD/MM/YYYY", true).isValid()) {
                    callback(`Enter valid ${rule.label}`);
                } else {
                    callback();
                }
            }
        } else {
            callback()
        }
    }


    render() {
        const {
            inputSchema,
            getFieldDecorator,
            children,
            formItemLayout,
            item,
            getFieldError,
        } = this.props;

        // const { inputSchema, getFieldDecorator, children, formItemLayout, apiurl, item } = this.props


        let rules = [];

        let FIL = {};

        if (!formItemLayout) {
            FIL = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                    md: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                    md: {span: 12},
                },
            };
        } else {
            FIL = formItemLayout;
        }

        if (item.key == 'email' || item.key == 'dateOfBirth') {
            rules.push({
                required: item.required,
                label: item.label,
                key: item.key,
                validator: this.checkEmailValidation
            });
        } else {
            if (item.required) {
                rules.push({
                    required: true,
                    message: item.requiredMessage
                        ? item.requiredMessage
                        : `${item.label} a Mandatory Field`,
                });
            }
        }

        if (item.label === undefined) {
            item.label = S(item.key).humanize().titleCase().s;
        }

        let customEvent = {};

        let inputProps = {};

        if (!!item.placeholder) inputProps.placeholder = item.placeholder;

        if (!!item.options) {
            inputProps.options = item.options;
        } else {
            // inputProps.options = ['Choose']
        }

        if (!!item.type) inputProps.type = item.type;
        if (!!item.mode) inputProps.mode = item.mode;
        if (!!item.rows) inputProps.rows = item.rows;
        if (!!item.keyAccessor) inputProps.keyAccessor = item.keyAccessor;
        if (!!item.valueAccessor) inputProps.valueAccessor = item.valueAccessor;
        if (!!item.id) inputProps.id = item.id;
        return (
            <div style={styles.mainDiv}>
                <React.Fragment key={item.key}>
                    {!item.hidden && (
                        <React.Fragment>
                            {item.prefixComp ? item.prefixComp : null}
                            {item.customExtra ? item.customExtra : null}
                            <FormItem
                                {...FIL}
                                key={item.key}
                                style={item.itemStyle}
                                label={item.label}
                                extra={item.extra}>
                                {getFieldDecorator(item.key, {rules, ...customEvent})(
                                    <SimpleFormElement
                                        item={item}
                                        {...inputProps}
                                        getFieldError={getFieldError}
                                        allowClear={item.allowClear}
                                        disabledDate={item.disabledDate}
                                    />
                                )}
                                {item.rightComp ? item.rightComp : null}

                            </FormItem>


                        </React.Fragment>
                    )}
                </React.Fragment>

                {children}

                {this.props.loading ? (
                    <div style={styles.loadingBox}>{/*<Spin size='large' />*/}</div>
                ) : null}
            </div>
        );
    }
}

export default (getAllFormFields)
