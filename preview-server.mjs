import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = normalize(join(import.meta.dirname, ".."));
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".zip": "application/zip", ".md": "text/markdown; charset=utf-8" };

createServer((request, response) => {
  const relative = decodeURIComponent(new URL(request.url, "http://localhost").pathname).replace(/^\/+/, "");
  let file = normalize(join(root, relative || "portfolio-site/index.html"));
  if (!file.startsWith(root)) return response.writeHead(403).end("Forbidden");
  try {
    if (statSync(file).isDirectory()) file = join(file, "index.html");
    response.writeHead(200, { "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream", "Accept-Ranges": "bytes" });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(Number(process.env.PORT || 8080), "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${process.env.PORT || 8080}/portfolio-site/`));
