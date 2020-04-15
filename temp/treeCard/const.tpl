import { pageTo } from 'nc-lightapp-front';

/**
*----------------------------------------------------------------
* @Desc   【 列表配置 】
* @Author -> Su
* @Date   -> <% this.time %>
* @param 【*必填参数】 SHOW_UNIT                 是否展示业务单元选择
* @param 【*必填参数】 FORM_ID                   表单id
* @param 【*必填参数】 TREE_TITLE                树 title
* @param 【 可选参数】 IS_ORG                    是否是集团
* @param 【*必填参数】 QUERY_TREE                查询树列表数据接口
* @param 【*必填参数】 ADD_DATA                  添加数据 接口
* @param 【*必填参数】 SAVE_URL                  保存接口
* @param 【*必填参数】 DELETE_URL                删除接口
* @param 【*必填参数】 EANBLE_URL                启用标记接口
* @param 【*必填参数】 PRINT_URL                 打印地址
* @param 【*必填参数】 NODE_KEY                  打印标识
*----------------------------------------------------------------
*/
export let LIST = {
    PAGE_CODE : pageTo.getSearchParam('p'),
    <% this.param %>
}