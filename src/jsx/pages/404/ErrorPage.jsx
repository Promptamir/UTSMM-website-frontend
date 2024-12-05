// Importing part
import '../../../css/pages/404-page/404PageStyle.css';

// Creating and exporting 404 page as default
export default function ErrorPage() {
    // Returning JSX
    return (
        <main className="not-found-page">
            <h1 className={'title'}>The page you are looking for, <br/> Is not Found</h1>
        </main>
    )
}
