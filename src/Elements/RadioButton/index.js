import React from 'react';
import "./index.css";

const RadioButtonComponent = (props) => {
    let {
        defaultChecked = false,
        options = [],
        onChange = () => null,
        value = "",
        key,
        style = {},
        listStyle = "inline"
    } = props;

    let keyAccessor = props.keyAccessor ? props.keyAccessor : val => val.id ? val.id : val._id;
    let valueAccessor = props.valueAccessor ? props.valueAccessor : val => val.display;

    return (
        <div className={`${listStyle === "inline" ? "inlineStyle" : "blockStyle"} radio-wrapper`}>
            {options && options.length ? options.map((item) => {
                let valueField = typeof item === "object" ? valueAccessor(item) : item;
                let keyField = typeof item === "object" ? keyAccessor(item) : item;

                return (
                    <label
                        className={'group-radio'}
                        // onClick={() => onChange(keyField)}
                        key={keyField}
                    >
                        <input
                            type={'radio'}
                            defaultChecked={defaultChecked}
                            name={key}
                            value={keyField}
                            checked={value === keyField}
                            onChange={() => {
                                onChange(keyField)
                            }}
                            style={style}
                        />
                        <span className={'radio-label'}>{valueField}</span>
                    </label>
                );
            }) : null}
        </div>
    );
};

export default RadioButtonComponent;
