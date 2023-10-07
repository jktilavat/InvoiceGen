import React from "react";

//type Props = {
//    label?: string;
//    placeholder?: string;
//    wrapperClass?:string;
//    inputClass?: string;
//    value?: string;
//    onChange?: (value: string) => void;
//}

export default function FormInput(props) {

    const {id, name, label, placeholder, wrapperClass, inputClass, value, onChange, step,type,list, } = props;
    const inputWrapper = `${wrapperClass ? wrapperClass : 'w-full flex flex-col mt-4'}`
    const inputFieldClass = `${inputClass ? inputClass : 'w-full flex px-2 py-1 border rounded-md mt-1 outline-none placeholder:text-14 placeholder:text-placeHolder leading-7'}`

    return (
        <div className={inputWrapper} >
            <label className='font-bold text-sm text-[#0a1747]'>{label}</label>
            <input id={id} name={name} list={list} value={value} onChange={(e) => onChange && onChange(e)} type={type} placeholder={placeholder} className={inputFieldClass} step={step}/>
        </div>
    )
}
