import React from "react"
import {HyperLink} from "./appUtils";

const PageHeader = (props) => {
    let {children, title, extraLink} = props;
    return (
        <>
            <div className="container-fluid pt-4 px-4">
                {children}
            </div>
        </>
    )
}
export default PageHeader
