/**
 *----------------------------------------------------------------
 * @Desc   【 定义事件策略 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:41
 * @tip    每个节点的特殊事件 推荐使用 _fun 下划线开头  如需要请放开注释
 *----------------------------------------------------------------
*/
export let event = {
    // //固定写在event中，卡片页面中表体行中的按钮自定义（默认表体中按钮为展开、删除）返回值为数组 根据条件返回按钮名称
	// ExtendBodyTableBtn: (props, record, tableid) => {
		
    // },
    // //固定写在event中 表头编辑后成功事件回调
	// HeadAfterEditCallback: () => {
		
	// },
    // //固定写在event中  卡片渲染后事件
    // AfterRenderCard: (props, config, data) => {

    // },
    // //固定写在event中，金额多币种 表体 编辑回调
    // MultiCurrencyEditCallBack({props, config, tableId, key, value, record, index}){

    // },
    // //扩展预置事件，如果有需要  属于事件的一层中间件
    // Save: async (next, props, config) => {
	// 	//before save do something
	// 	await next()  //  如果不调用next  则代码完全覆盖基础代码中方法， 调用则会执行基础代码中方法
	// 	//fater save do something
    // }
}

/**
 *----------------------------------------------------------------
 * @Desc   【 数据初始过滤设置 modifierMeta 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:35
 *----------------------------------------------------------------
*/
export let modifierMeta = (props, meta) => {
	return meta;
}

/**
 *----------------------------------------------------------------
 * @Desc   【 页面初次渲染之后 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:27
 *----------------------------------------------------------------
*/
export let afterInit = (props, conf) => {
}

/**
 *----------------------------------------------------------------
 * @Desc   【 表头编辑后事件 onAfterEvent 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:20
 *----------------------------------------------------------------
*/
export let onAfterEvent = (props, moduleId, key) => {
}

/**
 *----------------------------------------------------------------
 * @Desc   【 表体编辑前事件 ableBeforeEvent 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:14
 *----------------------------------------------------------------
*/
export let tableBeforeEvent = (props, moduleId, key, value, index, record, status) => {	
    return true
}

/**
 *----------------------------------------------------------------
 * @Desc   【 表体编辑后事件 tableAfterEvent 】
 * @Author -> Su
 * @Date   -> 2020-04-03 13:31:08
 *----------------------------------------------------------------
*/
export let tableAfterEvent = async ( props, tableId, key, value, changedrows, index, record ) => {
	// if(key == 'pk_enterprise_person'){
	// 	// do something
	// }
}