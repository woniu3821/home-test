const config = require("../../src/utils/config");
const sts = require("swagger-to-service");
const plugin = require("./plugin");
sts({
  url: config.pathYaml, // yaml uri
  apiPath: config.pathApi,
  servicePath: config.pathService,
  plugins: [plugin]
});
