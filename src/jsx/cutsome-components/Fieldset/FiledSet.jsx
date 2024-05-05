import { useState } from "react"

const FiledSet = (
    {
        legend,
        inputType,
        inputName,
        inputRef,
        onChange,
        contentComponent,
        fieldClassName,
        isRequired = false
    }
) => {


    const [focus, setFocus] = useState(false)



    const getInput = () => {
        if (contentComponent) return contentComponent


        if (inputType === "textarea") {
            return (<textarea
                name={inputName}
                cols="40"
                rows="10"
                required={isRequired}
                ref={inputRef}
                onChange={onChange}
            >
            </textarea>)
        } else {
            return <input onChange={onChange} ref={inputRef} type={inputType} name={inputName} required={isRequired} />
        }



    }



    return (
        <div className={fieldClassName}>
            <fieldset
                className={`${focus ? "focus" : ""} `}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
            >
                <legend>
                    {legend.svg}
                    <span>{legend.title}</span>
                </legend>
                <div className="content">
                    {
                        getInput()
                    }

                </div>
            </fieldset>
        </div>

    )
}

export default FiledSet