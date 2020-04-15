// 创建文件夹
const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp')

/**
*----------------------------------------------------------------
* @Desc   【 创建文件夹 】
* @Author -> Su
* @Date   -> 2020-04-01 16:15:59
*----------------------------------------------------------------
*/
function mkdirsSync(dirname, callback) {  
    if (fs.existsSync(dirname)) { 
        callback(dirname)
        return true; 
    } else {  
        if (mkdirsSync(path.dirname(dirname), callback)) {  
            fs.mkdirSync(dirname, callback);  
            return true;  
        }  
    }  
} 

/**
*----------------------------------------------------------------
* @Desc   【 创建文件 】
* @Author -> Su
* @Date   -> 2020-04-01 16:16:22
*----------------------------------------------------------------
*/
const getDirName = path.dirname
function writeFile (path, contents, cb) {
  mkdirp(getDirName(path)).then(res => {
    fs.writeFile(path, contents, cb)
  }).catch(err => {
    cb(err)
  })
}

/**
 *----------------------------------------------------------------
 * @Desc   【 路径是否存在 】
 * @Author -> Su
 * @Date   -> 2020-04-02 16:23:03
 *----------------------------------------------------------------
*/
function existFolder(dirname){
    return fs.existsSync(dirname)
}

/**
 *----------------------------------------------------------------
 * @Desc   【 复制文件夹/文件 】
 * @Author -> Su
 * @Date   -> 2020-04-02 16:15:26
 *----------------------------------------------------------------
*/
let stat = fs.stat;
let copy = function(src, dst){
    //读取目录
    fs.readdir(src, (err, paths) => {
        if(err){
            throw err;
        }
        // console.log(paths, '111111')
        paths.forEach(function(path){
            // console.log(src)
            var _src = src+'\\'+path;
            var _dst = dst+'\\'+path;
            var readable;
            var writable;
            stat(_src, (err,st) => {
                if(err){
                    throw err;
                }
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    copyFolder(_src, _dst);
                }
            });
        });
    });
}

let copyFolder = function(src, dst){
    //测试某个路径下文件是否存在
    fs.exists(dst, function(exists){
        if(exists){//存在
            copy(src,dst);
        }else{
            fs.mkdir(dst, function(){//创建目录
                copy(src, dst)
            })
            //递归创建 如果调用 先生成了页面模板 此处可采取上面的写法
            // mkdirp(dst, (err) => {
            //     if (err) return false;
            //     copy(src, dst)
            // })
        }
    })
}

function readFile(file_path, callback) {
    fs.readFile(file_path, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data.toString());
        }
    })
}


module.exports = {
    mkdirsSync,
    writeFile,
    existFolder,
    copyFolder,
    readFile
};
