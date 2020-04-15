import React /*          */ from 'react';
import { createPage} /*  */ from 'nc-lightapp-front';
import ComCard /*        */ from '@/component/Card';
import { CARD } /*       */ from '../main/const';
import { 
    event,
    modifierMeta,
    onAfterEvent,
    tableAfterEvent,
    tableBeforeEvent
}/*                       */ from './events';

const { TABLE_ID, FORM_ID, PAGE_CODE } = CARD;
let config = {
    CARD,
    event,
    modifierMeta,
    onAfterEvent,
    tableAfterEvent,
    tableBeforeEvent
}

function Card(props){
    return (
        <ComCard { ...props } { ...config }/>
    )
}

export default createPage({
    billinfo:{
        billtype: 'extcard', 
        pagecode: PAGE_CODE, 
        headcode: FORM_ID,
        bodycode: TABLE_ID
    },
})(Card)
