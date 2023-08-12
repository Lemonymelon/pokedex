const { PORT = 9090 } = process.env;
import app from "./src/app.js";

app.listen(PORT, (err) => {
  if (err) console.log('error, unable to connect');
  console.log(`listening on port ${PORT}`);
});
