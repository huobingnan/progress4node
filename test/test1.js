import { Progress } from "../index.js";

const p = new Progress({
  title: "Download Videos:",
  total: 233,
  color: "#0f0",
  width: 50,
});

let id;
id = setInterval(() => {
  if (p.done) {
    console.log("done");
    clearInterval(id);
    return;
  }
  p.tick(2);
}, 100);
