const config = require('config');
import connect from "./utils/connect";
import log from "./utils/logger";
import createServer from "./utils/server";

const app = createServer();
const port = process.env.PORT || config.get('port');

app.listen(port, async () => {
  log.info(`Server started on port ${port}`);
  await connect();
});
