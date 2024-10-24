import React, {useState} from "react"
import Dialog from "rc-dialog"
import 'rc-dialog/assets/index.css';
import "./index.css"
import ReactDOM from 'react-dom';

const Modal = (props) => {
    let {
        title,
        onCancel,
        visible,
        children,
        closable = true,
        maskClosable = true,
        width = 800,
        height = 500,
        mask = true,
        className = ''
    } = props;
    return (
        <Dialog
            width={width}
            height={height}
            title={title}
            closable={closable}
            maskClosable={maskClosable}
            mask={true}
            onClose={onCancel}
            className={className}
            visible={visible}>
            {children}
        </Dialog>
    )
}

const ConfirmElement = (props) => {
    let {
        width = "30%",
        height = 400
    } = props;
    let [visible, setVisible] = useState(true)
    let onClose = () => {
        setVisible(false)
        props.destroyFxn()
    }
    return (
        <Dialog
            width={width}
            height={height}
            visible={visible}
            {...props}
            onClose={onClose}
            destroyOnClose={true}
            maskClosable={false}
            className={'confirm-modal'}
            closeIcon={null}
        />
    )
}

const confirm = (props) => {
    let {onCancel = null, onSubmit = null} = props
    const destroyFxn = () => {
        ReactDOM.render(null, document.getElementById('confirm-dialog'))
    }
    const childProps = (
        <div className={'d-flex mb-5 mt-5 justify-content-end'}>
            <a className={'btn btn-label-dark rounded-pill btn-sm mr-2'} onClick={() => {
                destroyFxn()
                if (onCancel) {
                    onCancel()
                }
            }}>No</a>
            <a className={'btn btn-label-primary rounded-pill btn-sm'} onClick={() => {
                destroyFxn()
                if (onSubmit) {
                    onSubmit()
                }
            }}>Yes</a>
        </div>
    )
    let elementA = React.createElement(ConfirmElement, {
        ...props, destroyFxn
    }, childProps)
    return (
        ReactDOM.render(elementA, document.getElementById('confirm-dialog'))
    )
}


export default Modal
Modal.confirm = confirm;
