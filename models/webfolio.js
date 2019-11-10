var mongoose = require('mongoose')

var webFolioSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title: String,
    objective: String,
    linkdn: String,
    git: String,
    education: [{type:mongoose.Schema.ObjectId, ref:"Education"}],
    workExp: [{type:mongoose.Schema.ObjectId, ref:"WorkExp"}],
    tSkills: [
            {
                name: String, 
                level: {
                    type: Number, 
                    default: 0, 
                    min: 0, 
                    max: 10
                }
            }
        ],
    certifications: [{
        name: String,
        year: String
    }],
    basic_wf_styles:{
        bg_link: {
            type: String,
            default: "https://www.solidbackgrounds.com/images/950x350/950x350-light-blue-solid-color-background.jpg"
        },
        font_body: String,
        font_title: String,
        font_header: String,
        font_quotes: String
    }
})

module.exports = mongoose.model("WebFolio",webFolioSchema)
