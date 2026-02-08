const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const outDir = path.resolve(__dirname, "../public/images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const images = [
  "https://lalaniacademy.in/wp-content/themes/my_theme_child/images/logo.png",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project12_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/col-3.jpg",
  "https://lalaniacademy.in/wp-content/themes/my_theme_child/images/unnamed.png",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/logo-1.png",
  "https://lalaniacademy.in/wp-content/themes/my_theme_child/images/icon-7.png",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/university-4.png",
  "https://lalaniacademy.in/wp-content/themes/my_theme_child/images/service-2.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project10_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project9_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project8.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project7.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project6.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project4_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project3_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project2_jpg.jpg",
  "https://lalaniacademy.in/wp-content/uploads/2023/01/New-Project1_jpg.jpg",
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200)
        return reject(new Error("Failed " + url + " status " + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
      file.on("error", reject);
    });
    req.on("error", reject);
  });
}

(async () => {
  for (const url of images) {
    try {
      const name = path.basename(url.split("?")[0]);
      const dest = path.join(outDir, name);
      if (fs.existsSync(dest)) {
        console.log("Exists", name);
        continue;
      }
      console.log("Downloading", url);
      await download(url, dest);
      console.log("Saved", dest);
    } catch (err) {
      console.error("Error", url, err.message);
    }
  }
  console.log("Done");
})();
