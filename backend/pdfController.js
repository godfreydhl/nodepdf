
const pdf = require('html-pdf')
const path = require('path')
const nodemailer = require('nodemailer')
const fs =  require('fs')

const pdfTemplate = require("./documents/document")

exports.createPdf = (req, res)=>{
    pdf.create(pdfTemplate(req.body,{}).toFile('invoice.pdf', (err)=>{
        if(err){
            console.log(err);
        }
        res.send('pdf generated')
    }))

}

exports.fetchPdf= (req, res)=>{
    res.sendFile(path.join(path.dirname(__dirname),'invoice.pdf'))

}

exports.sendPdf=(req, res)=>{
    pathToAttachment = path.join(path.dirname(__dirname), 'invoice.pdf')
    attatchment = fs.readFileSync(pathToAttachment).toString("base64")

    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gamil.com',
        service:'Gmail',
        port: 465,
        secure: true,
        auth:{
            user: process.env.USER,
            password: process.env.PASSWORD
        },
        tls:{rejectUnauthorized:false}
    })

    smtpTransport.sendMail({
        from: process.env.EMAIL,
        to:req.body.email,
        subject:'PDF Document',
        html: `Testing Pdf Generate Document, Thanks,`,
        attatchments:[
            {
                content:attatchment,
                filename: 'invoice.pdf',
                contentType: 'application/pdf',
                disposition: 'attatchment',
                path:pathToAttachment
            }
        ]
    }, function(error, info){
        if(error){
            console.log(error);
        }
        res.send('Mail has been sent. Check your email')
    })

}