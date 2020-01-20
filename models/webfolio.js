var mongoose = require('mongoose')

var webFolioSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title: String,
    objective: String,
    linkdn: String,
    git: String,
    exclude:{type:[{name:String,imgURL:String}], default:[]},
    include:[{name:String,imgURL:String}],
    education: [{type:mongoose.Schema.ObjectId, ref:"Education"}],
    workExp: [{type:mongoose.Schema.ObjectId, ref:"WorkExp"}],
    project: [{type:mongoose.Schema.ObjectId, ref:"Project"}],
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
        organization: String,
        icon: String,
        year: String
    }],
    basic_wf_styles:{
        bg_link: {
            type: String,
            default: "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        font_body: String,
        font_title: String,
        font_header: String,
        font_quotes: String
    }
})

module.exports = mongoose.model("WebFolio",webFolioSchema)
