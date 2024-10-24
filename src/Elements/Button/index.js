import React, {useEffect, useState} from "react"

const Button = (props) => {
    let {children, type = 'primary', onClick, className = '', sm = false, htmlType = 'click'} = props;
    if (type == 'default') {
        type = 'primary'
    }
    const submitBtn = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick()
        }
    }
    return (

        htmlType == 'submit' ?
            <button
                className={`btn ${className}`}>
                {children}
            </button> :
            <button
                className={`btn ${className}`}
                onClick={submitBtn}>
                {children}
            </button>
    )
}
export default Button

