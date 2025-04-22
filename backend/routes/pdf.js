const express = require('express');
const router = express.Router();

const pdf = require('html-pdf');

const pdfTemplate = require('./documents');

//this will get the detalils to add in the pdf
router.post('/details', (req,res)=>{
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
})



// this route will download the pdf on the users device

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


module.exports = router;