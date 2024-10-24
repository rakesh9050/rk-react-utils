import React from "react"

const Input = (props) => {
    let {placeholder, type, label, suffix, disabled = false} = props;
    return (
        <>
            <div className="input-group">
                <input className={'form-control'} placeholder={placeholder || label} type={type || "text"}
                       disabled={disabled}/>
                {suffix ? <div className="input-group-append">
                    <span className="input-group-text">{suffix}</span>
                </div> : null}
            </div>
        </>
    )
}
const TextArea = (props) => {
    let {placeholder, label} = props;
    return (
        <>
            <textarea className={'form-control'} placeholder={placeholder || label}/>
        </>
    )
}
export default Input
Input.TextArea = TextArea;
