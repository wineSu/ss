import React /*           */ from 'react';
import { createPage } /*  */ from 'nc-lightapp-front';
import ComList /*         */ from '@/component/List';
import { 
    event,
    onAfterEvent
}/*                       */ from './events/index';
import { LIST } /*        */ from './main/const';

let config = {
    LIST,
    event,
    onAfterEvent
}

function PageList(props){
    LIST.IS_VERSION = true;
    return (
        <ComList { ...props } { ...config }/>
    )
}

export default createPage({})(PageList)