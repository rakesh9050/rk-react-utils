import React from "react"
import Switch from 'rc-switch';
import "rc-switch/assets/index.css";
import "./index.css"

const SwitchComponent = (props) => {
    let {value, checkedText = '', unCheckedText = '', onChange = () => null, disabled = false} = props;
    return (
        <>
            <div className={'switch-box'}>
                <Switch
                    disabled={disabled}
                    checkedChildren={checkedText}
                    unCheckedChildren={unCheckedText}
                    onChange={(toggle) => {
                        onChange(toggle);
                    }}
                    checked={value}/>
            </div>
        </>
    )
}
export default SwitchComponent
