import React from "react"

const ActionButton = (props) => {
    let {size = 'md', type, text, onClick} = props;
    return (
        <>
            <a className={`btn `} onClick={onClick}>
                {type ?
                    <>
                        <i className={`bx bx-${type}`}></i> &nbsp;
                    </>
                    : null}
                {text ? `${text}` : ""}
            </a>
        </>
    )
};
export default ActionButton
