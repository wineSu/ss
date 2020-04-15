import React /*                */ from 'react';
import { createPage } /*       */ from 'nc-lightapp-front';
import { initMultiLangByModule }  from '@/events/multiLangUtils';
import TableList /*            */ from '@/component/DossierTable';
import { event }/*             */ from './events';
import { LIST }/*              */ from './events/const';

let config = {
    LIST,
    event
}

function PageList(props){
    return (
        <TableList { ...props } { ...config }/>
    )
}

PageList = createPage({
	billinfo: {
		billtype: 'grid',
		pagecode: LIST.PAGE_CODE,
		bodycode: LIST.TABLE_ID
	}
})(PageList);

initMultiLangByModule({ 
	ipmbd: [ 'common' ] 
}, () => {
	// 显示页面
	ReactDOM.render(<PageList />, document.querySelector('#app'));
});
