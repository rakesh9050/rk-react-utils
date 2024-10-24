import React, {useState, useEffect} from 'react'
import {InputBox} from "./appUtils";
import StyleEditor from 'react-style-editor';

import moment from "moment"

const configs = {
    toolbar: [
        ["Styles", "Format", "Font", "FontSize"],
        ["Bold", "Italic", "Underline", "Strike"]
    ]
}
const config = {
    minHeight: 100,
    autoGrow_bottomSpace: 50
}

class CustomStyleEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isLoaded: true})
        }, 500)
    }

    render() {
        let {title, onChange, feeds = [], html, extraBox = null, key, ref = null} = this.props;
        let {isLoaded} = this.state
        return (
            <InputBox title={title} extra={extraBox}>
                <StyleEditor
                    // ref={ref}
                    // scriptUrl={'/ckeditor/ckeditor.js'}
                    defaultValue={html}
                    onChange={(editor) => {
                        // console.log(editor,'editor')
                        onChange(editor)
                    }}
                    config={config}
                />
            </InputBox>

        )
    }
}

export default CustomStyleEditor

