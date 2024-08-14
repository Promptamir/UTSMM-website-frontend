// Importing part
import {useState} from "react";
import {Icon} from "@iconify/react";

// Creating and exporting user dashboard acardion item as default
export default function UserDashboardAcardion({question, answer}) {
    // Defining states of the component
    const [isOpened, setOpened] = useState(false);

    // Returning JSX
    return (
        <div data-opened={isOpened} className={'custom-acardion'}>
            <button onClick={() => setOpened(prevState => !prevState)} className={'toggler'}>
                <span className={'question'}>{question}</span>
                <Icon icon="bxs:up-arrow" className={'arrow'} />
            </button>
            <div className={'answer-holder'}>
                <p className={'answer'}>{answer}</p>
            </div>
        </div>
    );
}