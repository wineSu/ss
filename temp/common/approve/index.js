import React /*           */ from 'react';
import { createPage } /*  */ from 'nc-lightapp-front';
import ComApprove /*      */ from '@/component/Approve';
import { CARD } /*        */ from '../main/const';

let config = {
    CARD
}

function Approve(props){
    return (
        <ComApprove { ...props } { ...config }/>
    )
}

export default createPage({
    
})(Approve)
