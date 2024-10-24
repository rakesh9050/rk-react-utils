import React from "react";

const Card = (props) => {
    let {
        title,
        children,
        actions = "",
        className = ''
    } = props;

    return (
        <>
            <div className={`card`}>
                {title ?
                    <div className="card-header text-md-start pb-0 d-flex justify-content-between align-items-center">
                        <h5 className={'pb-0 lh-inherit mb-2'}>{title}</h5>
                        {actions}
                    </div> : null}
                {/*<h5 className="card-header text-align-left">{title}</h5>*/}
                <div className={`card-body mt-3 pb-3 ${className}`}>
                    {children}
                </div>
            </div>

        </>
    );
};

const InnerCard = (props) => {
    let {
        children,
        className = "",
    } = props;
    return (
        <>
            <div className={`card-box border-grey p-4 mb-4`}>
                {children}
            </div>
        </>
    )
}
const TableCard = (props) => {
    let {
        children,
        className = "",
        title = "",
        actions = ""
    } = props;
    return (
        <>
            <div className="card">
                {title ?
                    <div className="card-header text-md-start pb-0 d-flex justify-content-between align-items-center">
                        <h5 className={'pb-0 mb-2 lh-inherit'}>{title}</h5>
                        {actions}
                    </div> : null}
                <div className={'mt-3 pb-3 '}>
                    {children}
                </div>
            </div>
        </>
    )
}

const FormTitle = (props) => {
    let {name, btn = ""} = props;
    return (
        <>
            <div className={'d-flex justify-content-between align-items-center'}>
                <h6 className={'form-title'}>{name}</h6>
                {btn}
            </div>
        </>
    )
}


export default Card;
Card.InnerCard = InnerCard;
Card.TableCard = TableCard;
Card.FormTitle = FormTitle;
