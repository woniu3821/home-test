// generateComponent.js`
const { Log, File } = require("./buildCore");
const log = new Log();

const file = new File();
const {
  vueTemplate,
  entryTemplate,
  styleTmplate
} = require("./template/vueTemplate");

log.info(
  "请输入要生成的组件名称、会生成在 components/目录下(请使用大驼峰命名规范 例：BaseModal)"
);
let componentName = "";
process.stdin.on("data", async chunk => {
  const inputName = String(chunk)
    .trim()
    .toString();

  //驼峰转连字符

  const lower = file.toLower(inputName);

  /**
   * 组件目录路径
   */
  const componentDirectory = file.resolve("../src/components", inputName);

  /**
   * vue组件路径
   */
  const componentPath = file.resolve(componentDirectory, "main.vue");
  /**
   * 入口文件路径
   */
  const entryComponentPath = file.resolve(componentDirectory, "index.js");
  /**
   * 样式文件路径
   */
  const entryStylusPath = file.resolve(componentDirectory, "mian.styl");

  const hasComponentDirectory = file.exist(componentDirectory);
  if (hasComponentDirectory) {
    log.error(`${inputName}组件目录已存在，请重新输入`);
    return;
  } else {
    log.info(`正在生成 component 目录 ${componentDirectory}`);
    await file.mkdir(componentDirectory);
  }
  try {
    if (inputName.includes("/")) {
      const inputArr = inputName.split("/");
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log.info(`正在生成 vue 文件 ${componentPath}`);
    await file.creat(componentPath, vueTemplate(componentName, lower));
    log.info(`正在生成 entry 文件 ${entryComponentPath}`);
    await file.creat(entryComponentPath, entryTemplate);
    log.info(`正在生成 stylus 文件 ${entryStylusPath}`);
    await file.creat(entryStylusPath, styleTmplate(lower));
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
