import React from "react"
// import "./index.css"

const AvatarComponent = (props) => {
    let {size = "md", name, type = 'primary'} = props;
    return (
        <>
            {name ? <div className={`avatar avatar-${size} me-2`}>
                <span className={`avatar-initial rounded-circle bg-label-${type}`} style={{border: "none"}}>
                    {name.charAt(0)}
                </span>
            </div> : null}
        </>
    )
}
export default AvatarComponent
