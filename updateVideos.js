const fs = require("fs");
const path = require("path");

// Path to your videos folder and JSON
const videosFolder = path.join(__dirname, "videoFolder");
const videosJson = path.join(__dirname, "videos.json");

// Read all .mp4 files in the folder
fs.readdir(videosFolder, (err, files) => {
  if (err) {
    console.error("Error reading video folder:", err);
    return;
  }

  // Filter only .mp4 files
  const mp4Files = files.filter(f => f.endsWith(".mp4"));

  // Create videos array
  const videos = mp4Files.map((file, index) => ({
    id: index + 1,
    path: path.join("videoFolder", file)
  }));

  // Save to videos.json
  fs.writeFile(videosJson, JSON.stringify({ videos }, null, 2), (err) => {
    if (err) {
      console.error("Error writing videos.json:", err);
    } else {
      console.log("videos.json updated successfully!");
    }
  });
});
