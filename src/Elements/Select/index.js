import _ from "lodash";
import Select, {Option} from "rc-select";
import "rc-select/assets/index.less";
import React from "react";
import "./index.css";

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option key={i.toString(36) + i} disabled={i === 10}>
            label{i}
        </Option>
    );
}
const filterOption = (input, options) => {
    return options.props.children.match(new RegExp(`${input}`, 'ig'))
}
const SelectRc = (props) => {
    let keyAccessor = props.keyAccessor
        ? props.keyAccessor
        : (val) => (val.id ? val.id : val._id);
    let valueAccessor = props.valueAccessor
        ? props.valueAccessor
        : (val) => val.display;
    let {
        onChange = null,
        multiple = false,
        allowClear = false,
        value,
        dropdownRender = null,
        options = [],
        item,
        customClass = ""
    } = props;
    /* let {
         onSearch = () => {}
     } = item;*/
    // console.log(item);

    const dropdownMenuStyle = {
        maxHeight: 200,
    };

    return (
        item ? <>
            <Select
                value={value}
                animation={"slide-up"}
                dropdownMenuStyle={dropdownMenuStyle}
                style={{width: "100%"}}
                // disabled={item.disabled ? item.disabled : false}
                mode={multiple ? "multiple" : "single"}
                showSearch={item.showSearch ? item.showSearch : false}
                // showSearch={true}
                allowClear={allowClear}
                dropdownRender={dropdownRender}
                // onSearch={onSearch}
                showAction={["focus", "click"]}
                optionFilterProp="children"
                optionLabelProp="children"
                placeholder={item.placeholder ? item.placeholder : `Choose ${item.label}`}
                onChange={onChange}
                onFocus={() => console.log("focus")}
            >
                {options.map((val, index) => {
                    if (typeof val === "object") {
                        return (
                            <Option key={index} value={keyAccessor(val)}>
                                {valueAccessor(val)}
                            </Option>
                        );
                    } else {
                        return (
                            <Option key={index} value={val}>
                                {val}
                            </Option>
                        );
                    }
                })}
            </Select>
        </> : null
    );
};
const SelectComponent = (props) => {
    let keyAccessor = props.keyAccessor
        ? props.keyAccessor
        : (val) => (val.id ? val.id : val._id);
    let valueAccessor = props.valueAccessor
        ? props.valueAccessor
        : (val) => val.display;
    let {
        onChange = null,
        multiple = false,
        allowClear = false,
        value,
        options = [],
        disabled,
        showSearch,
        onSearch = {},

        placeholder,
        label,
        customClass = "",
        style = {width: "100%"},
    } = props;
    const dropdownMenuStyle = {
        maxHeight: 200,
    };

    return (
        <Select
            className={`rc-select ${customClass}`}
            value={value}
            choiceTransitionName="rc-select-selection__choice-zoom"
            dropdownMenuStyle={dropdownMenuStyle}
            style={style}
            disabled={disabled ? disabled : false}
            multiple={multiple}
            onSearch={onSearch}
            showSearch={showSearch ? showSearch : false}
            allowClear={allowClear}
            showAction={["focus", "click"]}
            optionFilterProp="children"
            optionLabelProp="children"
            placeholder={placeholder ? placeholder : `Choose ${label}`}
            onChange={onChange}
            onFocus={() => console.log("focus")}
        >
            {options.map((val, index) => {
                if (typeof val === "object") {
                    return (
                        <Option key={index} value={keyAccessor(val)}>
                            {valueAccessor(val)}
                        </Option>
                    );
                } else {
                    return (
                        <Option key={index} value={val}>
                            {val}
                        </Option>
                    );
                }
            })}
        </Select>
    );
};
const SelectComponent2 = (props) => {
    let keyAccessor = props.keyAccessor
        ? props.keyAccessor
        : (val) => (val.id ? val.id : val._id);
    let valueAccessor = props.valueAccessor
        ? props.valueAccessor
        : (val) => val.display;
    let {
        onChange = null,
        multiple = false,
        allowClear = false,
        value,
        options = [],
        disabled,
        showSearch,
        placeholder,
        label = "",
        customClass = "",
        onSearch = {},
        dropdownRender = null,
        style = {width: "100%"},
    } = props;
    const dropdownMenuStyle = {
        maxHeight: 200,
    };
    let mode = multiple ? "multiple" : "single";

    return (
        <Select
            className={`rc-select ${customClass}`}
            value={value}
            choiceTransitionName="rc-select-selection__choice-zoom"
            dropdownMenuStyle={dropdownMenuStyle}
            style={style}
            disabled={disabled ? disabled : false}
            //   multiple={multiple}
            onSearch={onSearch}
            mode={mode}
            showSearch={showSearch ? showSearch : false}
            allowClear={allowClear}
            showAction={["focus", "click"]}
            optionFilterProp="children"
            optionLabelProp="children"
            dropdownRender={dropdownRender}
            placeholder={placeholder ? placeholder : `Choose ${label}`}
            onChange={onChange}
            onFocus={() => console.log("focus")}
        >
            {options.map((val, index) => {
                if (typeof val === "object") {
                    return (
                        <Option key={index} value={keyAccessor(val)}>
                            {valueAccessor(val)}
                        </Option>
                    );
                } else {
                    return (
                        <Option key={index} value={val}>
                            {val}
                        </Option>
                    );
                }
            })}
        </Select>
    );
};
const SelectFilterComponent = (props) => {
    let keyAccessor = props.keyAccessor
        ? props.keyAccessor
        : (val) => (val.id ? val.id : val._id);
    let valueAccessor = props.valueAccessor
        ? props.valueAccessor
        : (val) => val.display;
    let {
        onChange = null,
        value = undefined,
        options = [],
        disabled,
        showSearch = false,
        allowClear = false,
        id = null,
        style = {width: "100%"},
        children,
        placeholder = "",
        name = "",
        size = 'normal'
    } = props;
    let className = size === 'small' ? "select-small" : ""
    return (
        <div className={`select-component`}>
            <Select
                className={className}
                value={value}
                style={style}
                id={id}
                showSearch={showSearch}
                placeholder={placeholder ? placeholder : name}
                allowClear={allowClear}
                disabled={disabled ? disabled : false}
                onChange={onChange}
                filterOption={filterOption}
                onFocus={() => console.log("focus")}>
                {options && options.length ?<>
                    {options.map((val, index) => {
                        if (typeof val === "object") {
                            return (
                                <Option key={index} value={keyAccessor(val)}>
                                    {valueAccessor(val)}
                                </Option>
                            );
                        } else {
                            return (
                                <Option key={index} value={val}>
                                    {val}
                                </Option>
                            );
                        }
                    })}
                </> :<>
                    {children}
                </>}
            </Select>
        </div>
    );
};
export {SelectComponent, SelectComponent2, SelectRc, SelectFilterComponent,};
SelectFilterComponent.Option=Option
