import React from "react";
import PhoneInput2 from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import './index.css'

const PhoneInput = (props) => {
    let {
        value = "91", defaultCountry = "in", onChange = () => null
    } = props;
    return (
        <>
            <PhoneInput2
                country={defaultCountry}
                id="basic-default-email"
                class="form-control"
                searchPlaceholder={'Search'}
                enableSearch={true}
                disableSearchIcon={true}
                value={value}
                onChange={(mobile, country, e, formattedValue) => {
                    onChange(mobile, country.dialCode)
                }}
            />
        </>
    )
}
export default PhoneInput
