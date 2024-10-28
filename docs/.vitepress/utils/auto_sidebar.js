import path from "node:path";
import fs from "node:fs";

// 文件根目录 resolve() 方法用于将相对路径转为绝对路径
const DIR_PATH = path.resolve('docs');
// 白名单,过滤不是文章的文件和文件夹
// WHITE_LIST为什么要把index.md放进去? 可能叫做blacklist 更合理 ,这里的文件名是用来排除的
// const WHITE_LIST = [
const BLACK_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
  "image"
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值: arr1中有的,且arr2中没有
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // path1 是文件夹的绝对路径
  // pathname 是遍历文件夹的名字
  // params 是文件夹下的所有文件或文件夹:
  // 存放结果
  const res = [];
  // 开始遍历params
  console.log('params', params)
  for (const file of params) {
    // 拼接目录
    // console.log('file', typeof file,path1)
    const dir = path.join(path1, file);
    console.log('dir', dir, file)
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 如果是文件夹,读取之后作为下一次递归参数
      const files = fs.readdirSync(dir);
      res.push({
        text: file,
        collapsible: true,
        items: getList(files, dir, `${pathname}/${file}`),
      });
    } else {
      // 获取名字
      const name = path.basename(file);
      // 排除非 md 文件
      const suffix = path.extname(file);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`,
      });
    }
  }
  // 对name做一下处理，把后缀删除
  res.map((item) => {
    item.text = item.text.replace(/\.md$/, "");
  });
  return res;
}

export const set_sidebar = (pathname) => {
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  // 读取pathname下的所有文件或者文件夹 , 如果是文件夹,不会递归文件夹中的子文件;
  const files = fs.readdirSync(dirPath);
  // 过滤掉
  const items = intersections(files, BLACK_LIST);
  // getList 函数后面会讲到
  return getList(items, dirPath, pathname);
};