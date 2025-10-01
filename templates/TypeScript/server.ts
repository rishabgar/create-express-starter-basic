import app from "./index";
import http from "http";

const server = http.createServer(app);

const s = server.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
s.on("error", (err: Error) => {
  console.log("Server Error Occured:", err.message);
});
