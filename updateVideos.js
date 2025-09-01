const fs = require("fs");
const path = require("path");

const videosFolder = path.join(__dirname, "videoFolder");
const videosJson = path.join(__dirname, "videos.json");

function updateVideosJson() {
  fs.readdir(videosFolder, (err, files) => {
    if (err) return console.error("Error reading video folder:", err);

    const mp4Files = files.filter(f => f.endsWith(".mp4"));
    const videos = mp4Files.map((file, index) => ({
      id: index + 1,
      path: path.join("videoFolder", file)
    }));

    fs.writeFile(videosJson, JSON.stringify({ videos }, null, 2), (err) => {
      if (err) console.error("Error writing videos.json:", err);
      else console.log("✅ videos.json updated successfully!");
    });
  });
}

// Run once at startup
updateVideosJson();

// Watch for changes using fs.watch
fs.watch(videosFolder, (eventType, filename) => {
  if (filename && filename.endsWith(".mp4")) {
    console.log(`📂 Change detected (${eventType}): ${filename}`);
    updateVideosJson();
  }
});
