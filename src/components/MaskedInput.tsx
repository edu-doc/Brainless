import React from "react";
import InputMask from "react-input-mask";

const MaskedInput = ({ value , onChange }) => {

    const handleChange(e) {
        onChange((
            ...e,
            target: {
                ...e.target,
                value: onlyNumbers(e,target)
            }
        ))
    }



    return <InputMask 
        mask="999.999.999-99" 
        value={value}
        onChange={onChange}
    />;
}

export default MaskedInput;