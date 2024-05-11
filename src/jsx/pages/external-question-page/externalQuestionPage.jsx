// Importing part
import {useFetch} from "../../../lib/useFetch";
import {Icon} from "@iconify/react";
import '../../../css/pages/external-question-page/extenralQuestionStyle.css';

// Creating and exporting external question page as default
export default function ExternalQuestionPage() {
    // Retrieving data from database
    const [data, error, loading, setUrl, refreshData] = useFetch('https://utsmm.liara.run/api/external-reviews');

    // Returning JSX
    return (
        <div className={'external-question-page'}>
            {
                (loading)
                    ? (
                        <div className={'centred-container'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40}/>;
                        </div>
                    ) : (error)
                        ? <h1>There was an error</h1>
                        : JSON.stringify(data)
            }
        </div>
    );
}