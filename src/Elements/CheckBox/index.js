import React, {useEffect, useState} from 'react';
import "./index.css"


const CheckBoxComponent = (props) => {
    let {
        defaultChecked = false,
        options = [],
        onChange = () => null,
        value = [],
        key,
        style = {},
        listStyle = "block",
        label = "",
        checked = false
    } = props;

    return (
        <>
            <label
                className={'group-checkbox'}
                onClick={(e) => {
                    onChange(e)
                }}>
                <input
                    type={'checkbox'}
                    defaultChecked={defaultChecked}
                    name={key}
                    key={key}
                    value={label}
                    checked={checked}
                    style={style}
                />
                {label ? <span className={'checkbox-label'}>{label}</span> : null}
            </label>
        </>
    )
}

const CheckboxGroupComponent = (props) => {
    let {
        defaultChecked = false,
        options = [],
        onChange = () => null,
        value = [],
        key,
        style = {},
        listStyle = "block"
    } = props;
    let valueAccessor = props.valueAccessor
        ? props.valueAccessor
        : (val) => val.label;
    let keyAccessor = props.keyAccessor
        ? props.keyAccessor
        : (val) => val.label;

    let [localValue, setLocalValue] = useState(value)

    const updateState = (item) => {
        let cloneD = value.map((x) => x)
        if (cloneD.includes(item)) {
            const index = cloneD.indexOf(item);
            if (index > -1) { // only splice array when item is found
                cloneD.splice(index, 1); // 2nd parameter means remove one item only
            }
        } else {
            cloneD.push(item)
        }
        setLocalValue(cloneD)
    }
    useEffect(() => {
        onChange(localValue)
    }, [localValue])

    return (
        <div className={`${listStyle == "inline" ? "inlineStyle" : "blockStyle"} checkbox-wrapper`}>
            {options && options.length ? options.map((item) => {
                let label = typeof item === "object" ? valueAccessor(item) : item
                let name = typeof item === "object" ? keyAccessor(item) : label
                return (
                    <>
                        <label
                            className={'group-checkbox'}
                            onClick={({target}) => {
                                updateState(label)
                            }}>
                            <input
                                type={'checkbox'}
                                defaultChecked={defaultChecked}
                                name={key}
                                key={key}
                                value={label}
                                checked={value.includes(label) ? true : false}
                                style={style}
                            /> <span className={'checkbox-label'}>{name}</span>
                        </label>
                    </>
                )
            }) : null}
        </div>
    )
}


export default CheckBoxComponent
CheckBoxComponent.Group = CheckboxGroupComponent
