<<<<<<< HEAD
const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
=======
const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
>>>>>>> 37d16293c0a0af7383dd9aa7fef12f8653a8ee8c
app.listen(port);