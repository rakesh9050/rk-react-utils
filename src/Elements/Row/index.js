import React from "react"
import "./index.css"

const Spin = (props) => {
    let {children, gutter = 16, className = ''} = props;
    return (
        <>
            <div className={`rc-row ${className}`}>
                {children}
            </div>
        </>
    )
}
export default Spin
