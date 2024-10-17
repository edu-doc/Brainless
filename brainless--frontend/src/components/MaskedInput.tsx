import React from "react";
import InputMask from "react-input-mask";

const MaskedInput = ({value, onChange}: {value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {

    return <InputMask
        id="cpf"
        name="cpf"
        type="cpf"
        required
        autoComplete="cpf"
        className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        mask="999.999.999-99" 
        value={value}
        onChange={onChange}
    />;
}

export default MaskedInput;