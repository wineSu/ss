/**
*----------------------------------------------------------------
* @Desc   【 日期转换 】
* @Author -> Su
* @Date   -> 2020-04-02 10:16:20
*----------------------------------------------------------------
*/
let formatDate = (date = new Date()) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let minute = date.getMinutes();
    let reg = /-(\d)(?!\d)/g;
    return (y + '-' + m + '-' + d + ' ' + h + ':' + minute).replace(reg, '-0$1');
};

/**
 *----------------------------------------------------------------
 * @Desc   【 模板解析 】
 * @Author -> Su
 * @Date   -> 2020-04-08 10:16:49
 *----------------------------------------------------------------
*/
let TemplateEngine = function(html, options) {
    let re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;
    let add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push(`' + line + '`);\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    //添加最后一段的逻辑
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code).apply(options);
}

module.exports = {
    TemplateEngine,
    formatDate
}