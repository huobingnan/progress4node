import { Progress } from "../index.js";

const p = new Progress({
  title: "Download Videos:",
  total: 233,
  color: "#0f0",
  width: 50,
});

new Promise((resolve) => {
  let id;
  id = setInterval(() => {
    if (p.done) {
      console.log("done");
      clearInterval(id);
      resolve();
      return;
    }
    p.tick(~~(Math.random() * 10));
  }, 50);
}).then(() => {
  p.reset({
    value: 0,
    total: 100,
  });
  let id;
  id = setInterval(() => {
    if (p.done) {
      console.log("done");
      clearInterval(id);
      return;
    }
    p.tick();
  });
});
