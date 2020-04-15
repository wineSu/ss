import { RenderRouter } from 'nc-lightapp-front';
import routes           from './router';
import { 
	initMultiLangByModule
} /*                 */ from '@/events/multiLangUtils';

let moduleIds = {ipmbd: ['common']}
initMultiLangByModule(moduleIds,()=>{
	RenderRouter(routes, 'app');
});
