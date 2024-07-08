// Importing part
import '../../../css/pages/docs-page/DocsPageStyle.css';
import ApiPanel from "../../primaries/apiPanel";

// Creating and exporting Docs page as default
export default function DocsPage() {
    // Returning JSX
    return (
        <div className={'auth-page'}>
            <main className={'container'}>
                <ApiPanel />
            </main>
        </div>
    )
}

