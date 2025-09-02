# Rating Suture Form uses Express.js, Node.js, HTML, JS, CSS.

## For the sake of patient confidentiality, I have replaced real surgury videos with random nature videos

### INSTRUCTIONS:
Open a terminal in the project folder.

    1.Run:
    ==> npm install

    This installs all dependencies (express) automatically.

    2.Start the server:
    ==> npm start

    3.Open your browser at:
    http://localhost:3000

### UPLOAD NEW VIDEO AND UPDATE THE WEBSITE (SO THOSE NEW VIDEOS ARE IN THE RANDOMIZED CHOICE OF VIDEOS)

    1. node updateVideos.js

### ACCESS RESPONSES
    1. url + /responses.html

    
### MAPPING:
rating-suture-form/
│
├── index.html         # Main HTML page: displays video and form
├── app.js             # Client-side JS: handles video rendering, question display, navigation, saving 
├── styles.css         # Optional CSS for styling the form and layout
├── questions.html     # HTML fragment containing the questions
├── videos.json        # JSON metadata about videos (auto-updated by server or updateVideos.js)
├── responses.json     # Collected responses (one row per participant)
├── responses.html     # Spreadsheet organizing the responses.json
├── server.js          # Express.js server: serves files, handles POST for saving responses, auto-updates ├── videos.json        # json containing information about videos with id and path
├── updateVideos.js    # Optional script to scan videoFolder and update videos.json
├── package.json       # Node.js project file, dependencies, scripts
├── package-lock.json  # Lock file for Node dependencies
├── README.md          # Project documentation
├── .gitattributes     # Git configuration
└── videoFolder/       # Folder containing uploaded video files
    ├── vid1.mp4
    ├── vid2.mp4
    └── ...


### NOTES
Change number of videos per session
-Config variable in app.js
    - const VIDEOS_PER_FORM = 5; // change this to however many videos you want per session
