// Importing part
import {useState} from "react";

// Creating and exporting input component as default
export default function InputComponent({label, id, type}) {
    // Defining states of component
    const [isFocused, setFocused] = useState(false);

    // Returning JSX
    return (
        <div>
            <div className={'input-holder'}>
                <div data-opened={isFocused} className={'input-label-holder'}>
                    <label data-opened={isFocused} htmlFor={id} className={'input-label'}>
                        {label}
                    </label>
                </div>
                <input
                    required
                    type={type}
                    onFocus={() => setFocused(true)}
                    onBlur={(event) => (event.target.value === '') ? setFocused(false) : setFocused(true)}
                    data-opened={isFocused}
                    className={'input'}
                    id={id}
                    name={id}
                />
            </div>
        </div>
    );
}