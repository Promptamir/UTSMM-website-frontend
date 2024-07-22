// Importing part
import '../../css/DrawerStyles.css';

// Creating and exporting drawer component as default
export default function Drawer({children, isOpened, closeFn}) {
    // Returning JSX
    return (
        <div className={'drawer'}>
            <div data-opened={isOpened} onClick={closeFn} className="bg" />
            <div data-opened={isOpened} className={'content'}>
                <div className={'close-btn'} onClick={closeFn} />
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}