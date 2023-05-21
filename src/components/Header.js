import React from 'react';

const Header = ({view, setView}) => {
    return(
        <div className='d-flex justify-content-between'>
            <div className={'header'+ (view === 1 ? ' selected' : '')}
                 onClick={()=>setView(1)}>
                גלריה
            </div>
            <div className={'header'+ (view === 2 ? ' selected' : '')}
                 onClick={()=>setView(2)}>
                התורים שלי
            </div>
            <div className={'header'+ (view === 3 ? ' selected' : '')}
                    onClick={()=>setView(3)}
            >
                הזמנת תור
            </div>
        </div>
    )
}

export default Header;
