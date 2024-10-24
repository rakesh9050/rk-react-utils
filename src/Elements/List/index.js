import React from "react"
import {Card} from "../appUtils"
import {func} from "prop-types";

const ItemComponent = ({children, style = {}}) => {
    return (
        <>
            <div style={style}>
                {children}
            </div>
        </>
    )
}
const List = (data) => {
    let {dataSource = [], title = '', renderItem = func} = data;
    return (
        <>
            {dataSource && dataSource.length ? dataSource.map((item, index) => {
                return renderItem(item, index)
            }) : null}
        </>
    )
}
export default List;
List.Item = ItemComponent
