import { asyncComponent } from 'nc-lightapp-front';

const List = asyncComponent(() =>
	import(/* webpackChunkName: "<% this.basePath %>/list/list" */ /* webpackMode: "eager" */ '../list')
);

const Card = asyncComponent(() =>
	import(/* webpackChunkName: "<% this.basePath %>/card/card" */ /* webpackMode: "eager" */ '../card')
);

const Approve = asyncComponent(() =>
    //配置审批路由（可选）
	import(/* webpackChunkName: "<% this.basePath %>/card/card" */ /* webpackMode: "eager" */ '../approve')
);
<% if(this.isVersion){ %>
const Version = asyncComponent(() =>
    //配置历史版本路由（可选）
	import(/* webpackChunkName: "<% this.basePath %>/version/version" */ /* webpackMode: "eager" */ '../version')
);
<% } %>
<% if(this.isLadan){ %>
const Transfer = asyncComponent(() =>
    //配置拉单路由（可选）
	import(/* webpackChunkName: "<% this.basePath %>/transfer/transfer" */ /* webpackMode: "eager" */ '../transfer')
);
<% } %>
const routes = [
	{
		path: '/',
		component: List,
		exact: true
	},
	{
		path: '/list',
		component: List
	},
	{
		path: '/card',
		component: Card
	},
	{
		path: '/approve',
		component: Approve
	},
    <% if(this.isVersion){ %>
	{
		path: '/version',
		component: Version
	},
    <% } %>
	<% if(this.isLadan){ %>
	{
		path: '/transfer',
		component: Transfer
	}
    <% } %>
];

export default routes;
