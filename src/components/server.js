const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Your other middleware and routes here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
