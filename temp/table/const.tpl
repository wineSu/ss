import { pageTo } from 'nc-lightapp-front';

/**
 *----------------------------------------------------------------
 * @Desc   【 列表配置 】
 * @Author -> Su
 * @Date   -> <% this.time %>
 * @param 【*必填参数】 PAGE_CODE                 页面code
 * @param 【*必填参数】 TABLE_ID                  表格标识
 * @param 【*必填参数】 EXCEPT_FIELDS             过滤空行 依据的字段
 * @param 【*必填参数】 PRIMARY_KEY               数据主键
 * @param 【*必填参数】 PRINT_FILE_NAME           国际化处理，打印名称
 * @param 【*必填参数】 FILTER_FIELDS             所要搜索表格数据中的属性
 * @param 【*必填参数】 SAVE_URL                  保存接口
 * @param 【*必填参数】 DELETE_URL                删除接口
 * @param 【*必填参数】 UNSEAL_URL                启用状态接口
 * @param 【*必填参数】 SEAL_URL                  停用状态接口
 * @param 【*必填参数】 PRINT_URL                 打印标识
 * @param 【*必填参数】 QUERY_URL                 查询列表数据
 * @param 【 可选参数】 NODE_TYPE                 默认为  GROUP_NODE
*----------------------------------------------------------------
*/
export let LIST = {
    PAGE_CODE : pageTo.getSearchParam('p'),
    <% this.param %>
}