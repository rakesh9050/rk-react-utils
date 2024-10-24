import React from "react"

const Icon = (props) => {
    let {type = "", onClick = null, style = {}, theme = 'normal'} = props;
    let iconType = 'bx'
    switch (theme) {
        case 'normal':
            iconType = 'bx'
            break;
        case 'filled':
            iconType = 'bxs'
            break;
    }
    return (
        <>
            {type ? <i className={`bx ${iconType}-${type}`} onClick={onClick} style={style}></i> : null}
        </>
    )
}
export default Icon
