import { pageTo } from 'nc-lightapp-front';

/**
 *---------------------------------------------------------------------------------------------------------------------------------------------------
 * @Desc   【 普通单据> 列表 & 卡片 】
 * @Author -> Su
 * @Date   -> <% this.time %>
 * @desc   COMMON 目前接收的值是如下所有列举  所有定义为大写和'_'分割 如下配置写法 皆为样例参考
 * @param 【*必填参数】 DATA_SOURCE              命名空间 数据缓存用到
 * @param 【*必填参数】 PRIMARY_KEY              主键
 * @param 【*必填参数】 MODULE_NAME              包名
 * @param 【*必填参数】 BILL_TYPE                单据类型
 * @param 【 可选参数】 LINK_FILED               为某个字段设置为超链接
 * @param 【 可选参数】 TITLE                    页面标题，默认取系统菜单配置名称
 * @param 【 可选参数】 DATA_KEY_NAME            每条数据取值依据字段，默认vbillcode  
 * @param 【 可选参数】 PRINT_NODEKEY            打印模板需要，默认null
 * @param 【 可选参数】 DELETE_URL               删除接口，某条或多条数据时，默认'/nccloud/ipm/ipmpub/pflowScript.do'
 * @param 【 可选参数】 COMMIT_URL               提交 或 收回，默认'/nccloud/ipm/ipmpub/pflowScript.do'
 * @param 【 可选参数】 BEFORE_EDIT_URL          编辑前判断是否可编辑，默认'/nccloud/ipm/ipmpub/IPMPermissAction.do'
 * @param 【 可选参数】 EXTEND_TABLE_BTN         列表或表头中按钮的配置（如果列表和卡片表头同时需要扩展按钮，可放在COMMON中，反之放在 LIST 或 CARD 单独配置）
 * @param 【 可选参数】 FORM_FILTER              查询区和表头区 数据过滤条件配置（如果列表和卡片表头同时需要过滤，可放在COMMON中，反之放在 LIST 或 CARD 单独配置）
  <% if(this.is_ladan && !this.is_yewuliu){ %>
 * @param 【*必填参数】 TRANSFER_PAGE_CODE       上游单据pagecode
 * @param 【*必填参数】 TRANSFER_APP_CODE        上游单据appcode
 * @param 【*必填参数】 TRANSFER_PRIMARY_KEY     上游单据主键
 * @param 【*必填参数】 TRANSFER_TITLE           拉单 title
 * @param 【*必填参数】 TRANSFER_SEARCH_URL      拉单查询url
 * @param 【*必填参数】 SRC_BILL_TYPE            上游 单据类型
 * @param 【 可选参数】 TRANSFER_URL             转换 url
 * @param 【 可选参数】 TRANSFER_DISABLE_FILEDS  转单字段不可编辑性设置
 <% }else if(this.is_yewuliu){ %>
 * @param 【*必填参数】 TRANSFER_PRIMARY_KEY     上游单据主键
 * @param 【 可选参数】 TRANSFER_URL             转换 url
 * @param 【 可选参数】 TRANSFER_DISABLE_FILEDS  转单字段不可编辑性设置
 * @param 【*必填参数】 BUSINESS_FLOW            设置为 true 适配业务流
 * @param 【*必填参数】 '4DB0'                   参考下方注释配置方式
 <% } %>
*/

let COMMON = {
    <% this.comStr %>
}

/**
 *----------------------------------------------------------------
 * @Desc   【 列表配置 】
 * @Author -> Su
 * @Date   -> <% this.time %>
 * @param 【*必填参数】 SEARCH_ID                 查询区域编码
 * @param 【*必填参数】 TABLE_ID                  列表表格区域编码
 * @param 【*必填参数】 DATA_FROM                 数据来源 区分 列表 或 卡片
 * @param 【*必填参数】 BTN_CUSTOMER              列表扩展按钮，如果传入 ['bill'] 则为单据类型，列表按钮展示由基础代码控制  如传入['Edit', 'Delete'] 则只展示编辑、删除按钮
 * @param 【 可选参数】 SEARCH_URL                查询列表数据接口 默认'/nccloud/ipm/ipmpub/listQuery.do'
 * @param 【 可选参数】 IS_ORG                    是否是集团 默认false
 * @param 【 可选参数】 SET_LINK_PARAM            列表跳转到卡片携带的参数（双击、点击链接 、修改按钮）触发
 * @param 【*必填参数】 ...COMMON                 引入公共配置参数
*----------------------------------------------------------------
*/
let LIST = {
    <% this.listSTr %>,
    ...COMMON
}

/**
 *----------------------------------------------------------------
 * @Desc   【 卡片配置 】
 * @Author -> Su
 * @Date   -> <% this.time %>
 * @param 【*必填参数】 PAGE_CODE                 页面编码
 * @param 【*必填参数】 FORM_ID                   表头编码
 * @param 【*必填参数】 TABLE_ID                  多子表格编码
 * @param 【*必填参数】 DATA_FROM                 数据来源 卡片
 * @param 【 可选参数】 OTHER_FORM_ID             表头含有其他区域 编码
 * @param 【 可选参数】 AFTER_IDS                 编辑后 配置这些字段名 会走编辑后接口（只包含表头字段）
 * @param 【 可选参数】 DISABLE_BTN               浏览状态不显示、不选组织时 此配置按钮不可点击 默认 'AddLine'
 * @param 【 可选参数】 CLEAR_VAL_BY_KEY          根据key字段清除value字段的值，适用于表头
 * @param 【 可选参数】 QUERY_CARD                获取卡片数据接口 默认'/nccloud/ipm/ipmpub/querycard.do'
 * @param 【 可选参数】 INIT_VALUE                为字段赋值初始值
 * @param 【 可选参数】 FORM_AFTER_EDIT_URL       表头编辑后事件接口
 * @param 【 可选参数】 BODY_AFTER_EDIT_URL       表体编辑后事件接口
 * @param 【 可选参数】 DATA_CONTRAST             结束时间和开始时间的判断校验，适用于表头表体
 * @param 【 可选参数】 CHECK_FILED               卡片页面需要的数据验证,目前仅支持 ipmpub中utils中校验方法 
 * @param 【 可选参数】 TABLE_FILTER              表体中参照 数据过滤配置 
 * @param 【 可选参数】 SAVE_URL                  保存接口 默认'/nccloud/ipm/ipmpub/pflowScript.do'
 * @param 【 可选参数】 ORG_FILTER_URL            组织过滤需要配置的url，默认'nccloud.web.ipmpub.reffilter.action.IPMOrg4LegalPersonRefFilterAction'
 * @param 【 可选参数】 ADDLINE_AUTOFOCUS         表体增行时，是否需要自动聚焦，默认true
 * @param 【 可选参数】 TABLE_ROWS_CAN_DEL        表体删行 根据条件判断哪些数据不可被删除
 * @param 【 可选参数】 TABLE_KEYS_CAN_EDIT       表体某些字段的可编辑性校验
 * @param 【 可选参数】 ADDLINE_SET_VAL           表体增行添加默认值
 * @param 【 可选参数】 TABLE_MULTI               表体选择参照时，有多选项目，自动铺开多行并赋值
 * @param 【 可选参数】 TABLE_SAVE_EMPTY_CHECK    表体保存时，不能为空校验
 * @param 【 可选参数】 TABLE_HIDE_MODEL_BTN      隐藏指定表体侧拉上的【增行】【删行】按钮
 * @param 【-特殊参数】 DOC_SET_TABLE_NAME        表体附件上传表名 【如果表体存在附件上传功能  则为必选  其他情况为可选参数】
 * @param 【*必填参数】 ...COMMON                 引入公共配置参数
*----------------------------------------------------------------
*/
let CARD = {
    PAGE_CODE: pageTo.getSearchParam('p').split('_')[0] + '_card',
    <% this.cardStr %>,
    ...COMMON
}

export {
    LIST,
    CARD
}