import App from "./app";
import { connect } from "./database";

// const app = new App();
// connect();

// app.start();
async function init() {
  await connect()
    .then(() => {
      const app = new App();
      app.start();
    })
    .catch((err) => {
      console.log(err);
    });
}

init();
