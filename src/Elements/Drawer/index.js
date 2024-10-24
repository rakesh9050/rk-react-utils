import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import React from "react";
import "./index.css";
import crossIcon from "./icons/cross.svg"
import {Card} from "../appUtils";

const DrawerComponent = (props) => {
    let {
        visible,
        onClose,
        title,
        children,
        closable = true,
        width = "50%",
        placement = "right",
        rightContent = "",
        className = ""
    } = props;
    return (
        <>
            <Drawer
                open={visible}
                onClose={onClose}
                onHandleClick={onClose}
                duration={"5s"}
                ease={"5s"}
                width={width}
                className={"customDrawer"}
                showMask={true}
                contentWrapperStyle={{width: width}}
                placement={placement}>
                <div className={"drawer-header"}>
                    <h5>{title}</h5>
                    {closable ? <span onClick={onClose}>
                        <img src={crossIcon}/>
                    </span> : null}
                </div>
                <div className={"drawer-body"}>
                    <div className={`${className}`}>
                        {children}
                    </div>
                </div>
            </Drawer>
        </>
    );
};
export default DrawerComponent;
