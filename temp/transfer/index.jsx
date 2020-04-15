import React /*           */ from 'react';
import { createPage } /*  */ from 'nc-lightapp-front';
import TransferList /*    */ from '@/component/List/transfer';
import { LIST } /*        */ from '../main/const';

let config = {
    LIST,
}
function TransferTable(props){
    return (
        <TransferList { ...props } { ...config }/>
    )
}

export default createPage({})(TransferTable)