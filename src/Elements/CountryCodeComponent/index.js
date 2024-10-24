import React from "react"
import CountryCodeFlagJson from '../../../assests/jsonFiles/countryCodeFlag.json'
import moment from "moment";
import Select from "rc-select";
import {InputBox} from "../appUtils";

const {Option} = Select

const CountryCodeWithFlag = props => {
    let {chooseCode, countryCode = '', customStyle = {}} = props
    return (
        <div style={customStyle}>
            <InputBox title={'* Choose country code'} type={'custom'}>

                <Select
                    className={'countryCode'}
                    showSearch={true}
                    placeholder="Country Code"
                    optionFilterProp={'label'}
                    value={countryCode || undefined}
                    filterOption={(input, options) => {
                        return (
                            options.props.label.toLowerCase().indexOf(input.toLowerCase()) >=
                            0
                        )
                    }}
                    onChange={e => {
                        chooseCode(e)
                    }}>
                    {CountryCodeFlagJson.length &&
                    CountryCodeFlagJson.map(item => {
                        return (
                            <Option
                                value={item.countryCode}
                                label={`${item.dialCode} ${item.name}`}
                                key={item.countryCode}>
                  <span>
                   {item.flag ? <img src={item.flag} height={18} width={20} alt={''}/> : null} (
                      {item.dialCode})
                  </span>
                            </Option>
                        )
                    })}
                </Select>

            </InputBox>
        </div>
    )
}

export default CountryCodeWithFlag;
