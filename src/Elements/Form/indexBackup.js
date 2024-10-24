import React from "react"
import {createForm, formShape,} from 'rc-form';

const FormItem = (props) => {
    return (
        <>
            {props.children}
        </>
    )
}
const FormComponent = (props) => {
    let errors;
    console.log(props)
    let {onSubmit} = props;
    let submitForm = (e) => {
        if (onSubmit) {
            onSubmit(e)
        }
    }
    return (
        <>
            {/*  <form onSubmit={submitForm} noValidate={true}>
                {props.children}

            </form>*/}
            <div onClick={submitForm}>
                {props.children}

            </div>

        </>
    )
}
export default FormComponent
FormComponent.Item = FormItem;
FormComponent.create = createForm;
