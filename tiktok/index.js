const express = require('express')
const path = require('path')
const { getVideoUrl } = require('./functions/Utils')
const port = 3000

const app = express()

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/video', function (req, res) {

    if (req.query.p !== undefined && req.query.p.length > 0) {
        getVideoUrl(req.query.p).then((response) => {

            let videoUrl = {
                found: response.found,
                type: response.type,
                download: []
            }

            if (response.found == true) {
                for (let i = 0; i < response.download.length; i++) {
                    if (response.download[i].width !== null) {
                        videoUrl.download.push(response.download[i])
                    }
                }
            }

            res.render('video', { video: videoUrl });
        })
    } else {
        res.render('404')
    }
});

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`)
})
