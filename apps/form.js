const { readFile, writeFile, existFolder, copyFolder } = require("./modules");
const { TemplateEngine, formatDate } = require("./engine");
const {ipcRenderer: ipc} = require('electron');

let $ = layui.$,
    layer = layui.layer,
    form = layui.form;

$(function(){
    let basePath = localStorage.getItem("filePathaCache");

    $('.reload').click(() => {
        window.location.reload(true)
    });
    $('.clearCache').click(() => {
        localStorage.clear();
        layer.msg('缓存清除，即将返回初始化！');
        setTimeout(() => {
            window.location.href = "./index.html"
        }, 2000)
    })
    $('.smallwin').click(() => {
        ipc.send('small');
    })

    $('.input__field').focus(function(){
        $(this).parent().addClass('input--filled')
    }).blur(function(){
        if($(this).val() == ''){
            $(this).parent().removeClass('input--filled')
        }
    })

    //格式化
    let reg = /"([A-Za-z_-]{1,})":/g,
        filterStr = /(?<={)[^{}]+(?=})/,
        filterStrs = /^\{|^\}/gm,
        removeLine = /^\s*|\s*$/g;

    let tranReg = (data) => (
        JSON.stringify(data, null, "\t").replace(filterStrs, '').replace(reg, '$1:').replace(removeLine, '')
    )
        //是否拉单
    form.on('checkbox(selDanju)', function(data){
        let flag = data.elem.checked
        if(flag){
            $('.ladan input').attr('lay-verify', 'required')
            $('.ladan').css('display', 'inline-block')
        }else{
            $('.hide').hide();
            $('.ladan input').attr('lay-verify', false)
        }
        form.render()
    });

    form.on('submit(formDemo)', function(data){
        let { 
            is_ladan,
            address,
            is_version,
            is_yewuliu
        } = data.field;
        let paramArr = [{
            DATA_SOURCE: address.split('/')[0],
            MODULE_NAME: address.split('/').join('.')
        }, {
            DATA_FROM: 'listData',
        }, {
            DATA_FROM: 'cardData',
        }];
        for(let key in data.field){
            if(data.field[key] != ''){
                if(key.includes('COM_')){
                    paramArr[0][key.replace('COM_', '')] = data.field[key]
                }
                if(key.includes('LIST_')){
                    paramArr[1][key.replace('LIST_', '')] = data.field[key]
                }
                if(key.includes('CARD_')){
                    paramArr[2][key.replace('CARD_', '')] = data.field[key]
                }
            }
        }
        //拉单
        if(is_ladan){
            paramArr[0].TRANSFER_PAGE_CODE = paramArr[0].TRANSFER_APP_CODE + '_list'
        }
        //业务流
        if(is_yewuliu){
            paramArr[0].BUSINESS_FLOW = true;
            let billtype = paramArr[0].SRC_BILL_TYPE,
                searchUrl = paramArr[0].TRANSFER_SEARCH_URL,
                srcappcode = paramArr[0].TRANSFER_APP_CODE,
                srcpagecode = paramArr[0].TRANSFER_PAGE_CODE,
                srctitle = paramArr[0].TRANSFER_TITLE;
            //拉单特殊格式转换
            paramArr[0][billtype] = {
                TRANSFER_PAGE_CODE: srcpagecode,
                TRANSFER_APP_CODE : srcappcode,
                TRANSFER_TITLE    : srctitle,
                TRANSFER_SEARCH_URL: searchUrl
            }
            delete paramArr[0].SRC_BILL_TYPE
            delete paramArr[0].TRANSFER_SEARCH_URL
            delete paramArr[0].TRANSFER_APP_CODE
            delete paramArr[0].TRANSFER_PAGE_CODE
            delete paramArr[0].TRANSFER_TITLE
        }
        //参数赋值
        let strArr = [];
        paramArr.map((item, index) => {
            // strArr[index] = JSON.stringify(item, null, "\t").match(filterStr)[0].replace(reg, '$1:').replace(removeLine, '')
            strArr[index] = tranReg(item)
        })
        //路径
        let sourcePath = __dirname.replace('apps', 'temp\\'),
            targetPath = basePath + address;
        if(existFolder(targetPath)){
            layer.msg('当前目录已存在！');
            return false
        }
        $('.loadModel').show()
        //模板赋值 配置
        readFile(sourcePath + 'const.tpl', (err, data) => {
            //获取转换模板值
            let fileGet = TemplateEngine(data, {
                comStr: strArr[0],
                listSTr: strArr[1],
                cardStr: strArr[2],
                is_ladan: is_ladan,
                is_yewuliu: is_yewuliu,
                time: formatDate()
            });
            writeFile( targetPath + "/main/const.js", fileGet, err => {
                if(err){
                    layer.msg(JSON.stringify(err));
                    return false;
                }
                //公共目录
                copyFolder((sourcePath + 'common'), targetPath);
                //多版本
                if(is_version){
                    copyFolder((sourcePath + 'version'), targetPath + '/version');
                }
                //拉单
                if(is_ladan){
                    copyFolder((sourcePath + 'transfer'), targetPath + '/transfer');
                }
            })
        })
        //模板赋值 路由
        readFile(sourcePath + 'router.tpl', (err, data) => {
            //获取转换模板值
            let routerFile = TemplateEngine(data, {
                basePath: address,
                isVersion: is_version,
                isLadan: is_ladan
            });
            // 路由写入
            writeFile( targetPath + "/main/router.js", routerFile, err => {
                if(err){
                    layer.msg(JSON.stringify(err));
                }
                $('.moveCont').html('创建成功...')
                setTimeout(() => {
                    $('.loadModel').hide()
                },1000)
            })
        })
        return false;
    });

    let commonCrad = (formData, path) => {
        let { 
            address
        } = formData.field;
        delete formData.field.address;
        if(formData.field.TREE_TITLE){
            formData.field.IS_ORG = !!formData.field.IS_ORG
            formData.field.SHOW_UNIT = !!formData.field.SHOW_UNIT
        }
        //路径
        let sourcePath = __dirname.replace('apps', `temp\\${ path }\\`),
            targetPath = basePath + address;
        //模板赋值 配置
        readFile(sourcePath + 'const.tpl', (err, data) => {
            if(existFolder(targetPath)){
                layer.msg('当前目录已存在！');
                return false
            }
            $('.loadModel').show()
            //获取转换模板值
            let fileGet = TemplateEngine(data, {
                param: tranReg(formData.field),
                time: formatDate()
            });
            writeFile( targetPath + "/events/const.js", fileGet, err => {
                if(err){
                    layer.msg(JSON.stringify(err));
                    return false;
                }
                //公共目录
                copyFolder((sourcePath + 'list'), targetPath);
                $('.moveCont').html('创建成功...')
                setTimeout(() => {
                    $('.loadModel').hide()
                },1000)
            })
        })
    }
    //表格档案\树卡
    form.on('submit(formTable)', function(formData){
        commonCrad(formData, 'table')
        return false;
    });

    //表格档案\树卡
    form.on('submit(formCard)', function(formData){
        commonCrad(formData, 'treeCard')
        return false;
    });
})