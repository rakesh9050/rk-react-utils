import React, {useState, useEffect} from 'react'
import {InputBox} from "./appUtils";
import {CKEditor} from 'ckeditor4-react';
import moment from "moment"

let fullConfig = {
    toolbar: [
        {
            name: 'document',
            groups: ['mode', 'document', 'doctools'],
            items: ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']
        },
        {
            name: 'clipboard',
            groups: ['clipboard', 'undo'],
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
        },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker'],
            items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']
        },
        {
            name: 'forms',
            items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
        },
        '/',
        {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup'],
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
        },
        {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
        },
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
        {
            name: 'insert',
            items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
        },
        '/',
        {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
        {name: 'colors', items: ['TextColor', 'BGColor']},
        {name: 'tools', items: ['Maximize', 'ShowBlocks']},
        {name: 'others', items: ['-']},
        {name: 'about', items: ['About']}
    ],

// Toolbar groups configuration.
    toolbarGroups: [
        {name: 'document', groups: ['mode', 'document', 'doctools']},
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['find', 'selection', 'spellchecker']},
        {name: 'forms'},
        '/',
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
        {name: 'links'},
        {name: 'insert'},
        '/',
        {name: 'styles'},
        {name: 'colors'},
        {name: 'tools'},
        {name: 'others'},
        {name: 'about'}
    ]
}
const configs = {
    minHeight: 100,
    autoGrow_bottomSpace: 50,
    toolbar: [
        {
            name: 'document',
            groups: ['mode', 'document', 'doctools'],
            items: ['Source']
        },
        {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup'],
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
        },
        {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
        },
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},

        {
            name: 'clipboard',
            groups: ['clipboard', 'undo'],
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
        },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker'],
            items: ['Scayt']
        },
        {
            name: 'insert',
            items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar']
        },
        {name: 'tools', items: ['Maximize']},

        {name: 'styles', items: ['Styles', 'Format']}
    ],
    toolbarGroups: [
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['spellchecker']},
        {name: 'links'},
        {name: 'insert'},
        {name: 'document', groups: ['mode']},
        '/',
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align']},
        {name: 'styles', groups: ['Styles', 'Format', 'Font']}
    ]
}
const configsStandard = {
    minHeight: 100,
    autoGrow_bottomSpace: 50,
    toolbar: [
        {
            name: 'clipboard',
            groups: ['clipboard', 'undo'],
            items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
        },
        {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker'],
            items: ['Scayt']
        },
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
        {
            name: 'insert',
            items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar']
        },
        {name: 'tools', items: ['Maximize']},
        {
            name: 'document',
            groups: ['mode', 'document', 'doctools'],
            items: ['Source']
        },
        '/',
        {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup'],
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
        },
        {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi'],
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
        },
        {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
        {name: 'colors', items: ['TextColor', 'BGColor']},
    ],
    toolbarGroups: [
        {name: 'clipboard', groups: ['clipboard', 'undo']},
        {name: 'editing', groups: ['spellchecker']},
        {name: 'links'},
        {name: 'insert'},
        {name: 'document', groups: ['mode']},
        '/',
        {name: 'styles'},
        {name: 'colors'},
        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align']},
        {name: 'styles', groups: ['Styles', 'Format', 'Font']}
    ]
}
const config = {
    minHeight: 100,
    autoGrow_bottomSpace: 50
}

class CustomCkEditor extends React.Component {
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
                <CKEditor
                    ref={ref}
                    editorUrl={'../ckeditor2013/ckeditor.js'}
                    initData={html}
                    onChange={({editor}) => {
                        onChange(editor.getData())
                    }}
                    config={configsStandard}
                />
            </InputBox>
        )
    }
}

export default CustomCkEditor

