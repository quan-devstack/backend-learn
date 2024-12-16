//build http server with node.js
const http = require("http");
const url = require("url");
const { getName, getEmail } = require("./src/utils/function");

const server = http.createServer((req, res) => {
  // req: nhận request từ client
  const method = req.method;
  const userAgent = req.headers["user-agent"];
  const cookies = req.headers["cookie"];
  const parse = url.parse(req.url);
  const path = parse.pathname;
  const searchParam = new URLSearchParams(parse.search);

  let content;
  if (path === "/") {
    content = `
    <h1>This is first page of Node Server. Do you copy ?</h1>
    <h2>Call getName: ${getName()}</h2>
    <h2>Call getEmail: ${getEmail()}</h2>
    `;
  } else if (path === "/second-page") {
    content = `
    <h1>This is second page of Node Server. Do you copy ?</h1>
    <h2>Status: ${searchParam.get("status")}</h2>
    <h2>Status: ${searchParam.get("message")}</h2>
    `;
  } else {
    content = `<h1>Page not found, What the F is this ? =))</h1>`;
  }

  // res: trả response cho client
  res.setHeader("Set-Cookie", "name=khacquan;path=/;max-age=86400; HttpOnly");
  res.setHeader("Content-Type", "text/html charsets=utf=8");
  res.end(content);
});

const hostname = "localhost";
const port = 3003;
server.listen(port, hostname, () => {
  console.log(`Node server is running on http://localhost:${port}`);
});
