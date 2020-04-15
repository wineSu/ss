import React /*           */ from 'react';
import { createPage } /*  */ from 'nc-lightapp-front';
import TreeList /*        */ from '@/component/DossierTree';
import { event }/*        */ from './events';
import { LIST }/*         */ from './events/const';
import { initMultiLangByModule }  from '@/events/multiLangUtils';

let config = {
    LIST,
    event
}

function PageList(props){
    return (
        <TreeList { ...props } { ...config }/>
    )
}

PageList = createPage({})(PageList);

initMultiLangByModule({ 
	ipmbd: [ 'common' ] 
}, () => {
	ReactDOM.render(<PageList />, document.querySelector('#app'));
});

