// generateView.js
const { vueTemplate } = require("./template/viewTemplate");
const { Log, File } = require("./buildCore");
const log = new Log();

const file = new File();

log.info(
  "请输入要生成的全局组件名称、会生成在 components/global目录下(请使用大驼峰命名规范 例：BaseModal)"
);

let componentName = "";

process.stdin.on("data", async chunk => {
  const inputName = String(chunk)
    .trim()
    .toString();
  /**
   * Vue页面组件路径
   */
  //驼峰转连字符
  const lower = file.toLower(inputName);
  let componentVueName = file.resolve("../../src/components/global", inputName);
  // 如果不是以 .vue 结尾的话，自动加上
  if (!componentVueName.endsWith(".vue")) {
    componentVueName += ".vue";
  }
  /**
   * vue组件目录路径
   */
  const componentDirectory = file.dirname(componentVueName);

  const hasComponentExists = file.exist(componentVueName);

  if (hasComponentExists) {
    log.error(`${inputName}页面组件已存在，请重新输入`);
    return;
  } else {
    log.info(`正在生成 components/global 目录 ${componentDirectory}`);
    await file.mkdir(componentDirectory);
  }
  try {
    if (inputName.includes("/")) {
      const inputArr = inputName.split("/");
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log.info(`正在生成 vue 文件 ${componentVueName}`);
    await file.creat(componentVueName, vueTemplate(componentName, lower));
    log.success("生成成功");
  } catch (e) {
    log.error(e.message);
  }

  process.stdin.emit("end");
});
process.stdin.on("end", () => {
  log.info("exit");
  process.exit();
});
