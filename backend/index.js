const app = require("./app");

const PORT = process.env.PORT || 5020;
const server = app.listen(PORT, (req, res) => {
  console.log(`Backend App successfully started at http://localhost:${PORT}`);
});
