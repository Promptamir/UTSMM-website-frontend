// Importing part
import {Icon} from '@iconify/react';

// Creating and exporting modal component as default
export default function Modal({children, title, isOpened, closeFn}) {
    // Returning JSX
    return (
        <div data-opened={isOpened} className={'modal'}>
            <div onClick={closeFn} className={'bg'} />
            <div className={'content'}>
                <div className={'header'}>
                    <span className={'title'}>{title}</span>
                    <button className={'close-btn'} onClick={closeFn}>
                        <Icon icon="ic:baseline-close"></Icon>
                    </button>
                </div>
                <div className={'body'}>
                    {children}
                </div>
            </div>
        </div>
    );
}