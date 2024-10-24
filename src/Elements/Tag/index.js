import React from "react"
import "./style.css"
const Spin=(props)=>{
    let {children, color, className=''}=props;
    return(
        <>
            <span className={`rc-tag ${className}`} style={{background:color}}>{children}</span>
        </>
    )
}
export default Spin
