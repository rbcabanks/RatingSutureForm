const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML, JS, CSS

const responsesFile = path.join(__dirname, "responses.json");

// POST endpoint to save responses
app.post("/saveResponses", (req, res) => {
  const newResponses = req.body; // array of objects
  if (!Array.isArray(newResponses) || newResponses.length === 0) {
    return res.status(400).json({ error: "No responses provided" });
  }

  // Read existing responses
  let existing = [];
  if (fs.existsSync(responsesFile)) {
    try {
      const text = fs.readFileSync(responsesFile, "utf8");
      existing = text ? JSON.parse(text) : [];
    } catch (err) {
      console.error("Error reading JSON:", err);
      return res.status(500).json({ error: "Server error reading file" });
    }
  }

  // Append new responses and save
  try {
    fs.writeFileSync(responsesFile, JSON.stringify([...existing, ...newResponses], null, 2));
  } catch (err) {
    console.error("Error writing JSON:", err);
    return res.status(500).json({ error: "Server error writing file" });
  }

  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
