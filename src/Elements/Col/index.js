import React from "react"

const Col = (props) => {
    let {children, span = "", md = "", sm = "", xs = "", lg = "", gutter = 12} = props;
    let width = 100 / 24;
    let paddingV = gutter / 2;
    let classes = ``
    if (span) {
        classes += `rc-col-${span} `
    }
    if (md) {
        classes += `rc-col-md-${md} `
    }
    if (sm) {
        classes += `rc-col-sm-${sm} `
    }
    if (xs) {
        classes += `rc-col-xs-${xs} `
    }
    if (lg) {
        classes += `rc-col-lg-${lg} `
    }

    return (
        <>
            <div className={classes} style={{paddingLeft: paddingV, paddingRight: paddingV}}>
                {children}
            </div>
        </>
    )
}
export default Col
