import React from "react"

const RenderHTML = (data) => {
    return (
        <>
            <div dangerouslySetInnerHTML={{__html: data}}/>
        </>
    )
}
export default RenderHTML
