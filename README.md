Rating Suture Form uses Express.js, Node.js, HTML, JS, CSS.

INSTRUCTIONS:
Open a terminal in the project folder.

    1.Run:
    ==> npm install

    This installs all dependencies (express) automatically.

    2.Start the server:
    ==> npm start

    3.Open your browser at:
    http://localhost:3000


MAPPING: 

rating-suture-form/
│
├── index.html         # Main HTML page: displays video and form
├── app.js             # Client-side JS: handles video rendering, question display, navigation, saving responses
├── styles.css         # Optional CSS for styling the form and layout
├── questions.html     # HTML fragment containing the questions
├── videos.json        # JSON metadata about videos (auto-updated by server or updateVideos.js)
├── responses.csv      # Collected responses (one row per participant)
├── server.js          # Express.js server: serves files, handles POST for saving responses, auto-updates videos.json
├── updateVideos.js    # Optional script to scan videoFolder and update videos.json
├── package.json       # Node.js project file, dependencies, scripts
├── package-lock.json  # Lock file for Node dependencies
├── README.md          # Project documentation
├── .gitattributes     # Git configuration
└── videoFolder/       # Folder containing uploaded video files
    ├── vid1.mp4
    ├── vid2.mp4
    └── ...


NOTES
Change number of videos per session
-Config variable in app.js
    - const VIDEOS_PER_FORM = 5; // change this to however many videos you want per session