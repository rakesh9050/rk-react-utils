import React, {Component} from 'react'

class InputComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let {title = '', className = '', extra, labelCls = '', children, type} = this.props
        let extraCls = type == "select" ? "select-box" : ""
        return (
            <>
                <div className={`form-floating mb-3 ${extraCls}`}>
                    {children}
                    <label htmlFor="floatingInput">{title}</label>
                </div>
            </>
        )
    }
}

export default InputComponent

