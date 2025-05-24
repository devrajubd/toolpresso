// const server = require("./src/app.js");
import server from "./src/app.js";

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
