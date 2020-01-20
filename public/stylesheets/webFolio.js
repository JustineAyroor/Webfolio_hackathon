var fields = [{name: "pdets", imgURL:"https://cdn2.iconfinder.com/data/icons/basic-39/140/list__menu__option__row__details-512.png"},{name: "WfStyles", imgURL:"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/letter_case_email_mail-512.png"},{name: "project", imgURL:"https://cdn.iconscout.com/icon/premium/png-512-thumb/project-development-615539.png"},{name: "education", imgURL:"https://cdn.iconscout.com/icon/premium/png-256-thumb/education-1512787-1282295.png"},{name: "wrkExp", imgURL:"https://cdn1.iconfinder.com/data/icons/happy-and-efficient-workplace/204/job-work-happy-006-512.png"},{name: "certifications", imgURL:"https://cdn1.iconfinder.com/data/icons/cv-resume-1/32/23-512.png"},{name: "tskills", imgURL:"https://cdn3.iconfinder.com/data/icons/office-189/64/16_hard_skills_skill_portfolio_book_business_office-512.png"}];
var courses = [];
var wrkExpTechUsed = [];
var wrkExpJDesc = [];
var fonts= ["Allan","Bonbon","Butcherman","Condiment","Creepster","Eater","Freckle Face","Gloria Hallelujah","Hanalei","Hanalei Fill","IM Fell English SC","Mrs Sheppards","Nosifer","Permanent Marker","Rock Salt","Satisfy","Slackey","Tulpen One"]
var fontFields = ["fontBodyPanel","fontTitlePanel","fontHeadPanel","fontQuotePanel"];


$(document).ready(function(){
    console.log(fields)
    setUpWf()
    updateBasicInf()
    updateSF()
    fonts.forEach(function(fontName){
        var fontRadio = '<div class="form-check badge badge-danger p-2 m-3"><input class="form-check-input selectFont d-none" type="radio" name="font" id="'+fontName+'" value="'+fontName+'"><label class="form-check-label" style="font-family:'+fontName+';" for="'+fontName+'"><h5>'+fontName+'</h5></label></div>';
        $('#fontPanel').append(fontRadio);
    });
    updateSFUI() 
    Addedu()
    showEduCourses()
    updateEdu()
    delEdu()
    AddWrkExp()
    showWrkExp()
    updateWrkExp()
    delWrk()
    AddCertDets()
    updateCertDets()
    delCert()
});

function delCert(){
    var CertId;
    var wfID  = $('#wfID').val();
    d3.select("#certPanel").selectAll(".delete-me").on("click", function(){
        CertId = $(this).parent().parent().parent().parent().parent().attr("id");
        console.log(CertId);
        $.ajax({
            method: 'DELETE',
            url: '/api/certifications/'+wfID+'/'+CertId
        })
        .then(function(removedCert){
            console.log(removedCert);
            $('#'+CertId).remove();
        });
    })
}

function updateCertDets(){
    var Certid;
    var wfID  = $('#wfID').val();
    d3.select("#certPanel").selectAll(".update-me").on("click", function(){
        Certid = $(this).parent().parent().parent().parent().parent().attr("id");
        console.log(Certid);
        $.get('/api/certifications/'+wfID+'/'+Certid)
        .then(function(foundCert){
            console.log(foundCert);
            $('#Ucname').val(foundCert.name);
            $('#Ucorg').val(foundCert.organization);
            $('#Ucicon').val(foundCert.icon);
            $('#UcDate').val(foundCert.year);
        });
    });
    $('#updateCert').on('click', function(){
        // var uID  = $('#uID').val();
        var cname = $('#Ucname').val();
        var corg = $('#Ucorg').val();
        var cicon = $('#Ucicon').val();
        var cDate = $('#UcDate').val();
        var WfData = {name:cname,organization:corg,icon:cicon,year:cDate};
        var updateWFurl = '/api/certifications/'+wfID+'/'+Certid;
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: WfData
        })
        .then(function(updateCert){
            console.log(updateCert);
            location.reload();
        })
        .catch(function(err){console.log(err);})

    });
}


function AddCertDets(){
    $('#addCert').on('click', function(){
        var wfID  = $('#wfID').val();
        var updateWFurl = '/api/certifications/'+wfID;
        var CertDetails = {name: $('#cname').val(), organization: $('#corg').val(), icon: $('#cicon').val(), year: $('#cDate').val()};
        $.post(updateWFurl, CertDetails)
            .then(function(createdCert){
                console.log(createdCert);
                location.reload();
                
            })
            .catch(function(err){
                console.log(err)
            })
        console.log("Adding Certification Now");
    });
}

function delWrk(){
    var wrkId;
    var wfID  = $('#wfID').val();
    d3.select("#wrkExpPanel").selectAll(".delete-me").on("click", function(){
        wrkId = $(this).parent().parent().parent().attr("id");
        console.log(wrkId);
        $.ajax({
            method: 'DELETE',
            url: '/api/workExp/'+wfID+'/'+wrkId
        })
        .then(function(removedWrk){
            console.log(removedWrk);
            $('#'+wrkId).remove();
        });
    })
}

function updateWrkExp(){
    var WrkExpId;
    var wfID  = $('#wfID').val();
    d3.select("#wrkExpPanel").selectAll(".update-me").on("click", function(){
        d3.select("#UjDescPanel")
            .selectAll("div")
            .remove();
        d3.select("#UtUsedPanel")
            .selectAll("div")
            .remove();
        WrkExpId = $(this).parent().parent().parent().attr("id");
        console.log(WrkExpId);
        $.get('/api/workExp/'+wfID+'/'+WrkExpId)
            .then(function(wrkDets){
                console.log(wrkDets)
                $('#Uwname').val(wrkDets.name);
                $('#UwrkeDate').val(wrkDets.eDate);
                // $('#UeisCurr').val(eduDets.isCurr);
                if(!wrkDets.isCurr){
                    d3.select("#UwisCurrSlider").attr("value", "1");
                    d3.select("#UwisCurr").attr("value", "false");
                    d3.select("#UwisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
                    d3.selectAll(".UwrkOpt").classed("d-none",false);
                }else{
                    // $('#UeisCurrSlider').val("2");
                    d3.select("#UwisCurrSlider").attr("value", "2");
                    d3.select("#UwisCurr").attr("value", "true");
                    d3.select("#UwisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
                    // hide gpa nd endDate
                    d3.selectAll(".UwrkOpt").classed("d-none",true);
                    
                }
                $('#UjobTitle').val(wrkDets.jobTitle);
                wrkExpJDesc = wrkDets.jDesc.jobDesc;
                wrkExpTechUsed = wrkDets.jDesc.techUsed;
                console.log(wrkExpJDesc);
                console.log(wrkExpTechUsed);
                wrkUpdateslider()
                d3.select("#UjDescPanel")
                    .selectAll("div")
                    .data(wrkExpJDesc)
                    .enter()
                    .append("div")
                        .classed("badge badge-warning m-2 p-1", true)
                        .html(d => d)
                            .append("span")
                                // .property("id",newJDesc)
                                .classed("badge badge-danger rmCourse m-2 p-1", true)
                                .html("X")
                                .on("click", function(d){
                                    wrkExpJDesc = wrkExpJDesc.filter(function(Jpoint){return Jpoint != d});
                                    $(this).parent().remove();
                                });
                d3.select("#UtUsedPanel")
                    .selectAll("div")
                    .data(wrkExpTechUsed)
                    .enter()
                    .append("div")
                        .classed("badge badge-warning m-2 p-1", true)
                        .html(d => d)
                            .append("span")
                                .property("id",d => d)
                                .classed("badge badge-danger rmCourse m-2 p-1", true)
                                .html("X")
                                .on("click", function(d){
                                    wrkExpTechUsed = wrkExpTechUsed.filter(function(tName){return tName != d});
                                    $(this).parent().remove();
                                });
                wrkUpdateDescGame()
                wrkUpdateTechGame()

            })
    });
    $('#updateWrk').on('click', function(){
        var wrkDetails = {name: $('#Uwname').val(), eDate: $('#UwrkeDate').val(), isCurr: $('#UwisCurr').val(), jobTitle: $('#UjobTitle').val(), jDesc:{jobDesc: wrkExpJDesc, techUsed:wrkExpTechUsed}};
        var updateWFurl = '/api/workExp/'+ wfID + '/' + WrkExpId;
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: wrkDetails
        })
        .then(function(UpdatedWrkDetails){
            console.log(UpdatedWrkDetails);
            location.reload();
        })
        .catch(function(err){console.log(err)})
        // console.log(EduDetails)
    });
    
}


function showWrkExp(){
    d3.selectAll(".JDescBtn").on("click", function(){
        // console.log($(this).parent().parent().parent().parent());
        var selectedWrkExpCard = $(this).parent().parent().parent().parent().attr("id"); 
        console.log(selectedWrkExpCard);
        if($('#'+selectedWrkExpCard+' .wrkExpJDesc').hasClass("d-none") && $('#'+selectedWrkExpCard+' .wrkExpJDesc').hasClass("d-none")){
            $('#'+selectedWrkExpCard+' .wrkExpJDesc').removeClass("d-none");
            $('#'+selectedWrkExpCard+' .wrkExpTused').removeClass("d-none");
        }else{
            $('#'+selectedWrkExpCard+' .wrkExpJDesc').addClass("d-none");
            $('#'+selectedWrkExpCard+' .wrkExpTused').addClass("d-none");
        }
    });
}

function AddWrkExp(){
    $('#wrkModalTrigger').on('click', function(){wrkExpTechUsed = []; wrkExpJDesc = [];})
    wrkAddslider()
    wrkAddTechGame()
    wrkAddDescGame()
    $('#addWrk').on('click', function(){
        var wfID  = $('#wfID').val();
        var updateWFurl = '/api/workExp/'+wfID;
        var WrkExpDetails = {name: $('#wname').val(), eDate: $('#wrkeDate').val(), isCurr: $('#wisCurr').val(), jobTitle: $('#jobTitle').val(), jDesc: {jobDesc: wrkExpJDesc, techUsed: wrkExpTechUsed}};
        $.post(updateWFurl, WrkExpDetails)
            .then(function(createdWrkExp){
                console.log(createdWrkExp);
                location.reload();
                
            })
            .catch(function(err){
                console.log(err)
            })
        console.log("Adding Job Now");
    });
    
    // console.log(IsCurr) 
}

function wrkUpdateDescGame(){
    d3.select("#UaddJnote").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newJDesc = d3.select("#UjobDesc").property("value");
        if(newJDesc != ""){
        wrkExpJDesc.push(newJDesc);
        d3.select("#UjobDesc").property("value","");
        // courses.forEach(function(courseName){
        d3.select("#UjDescPanel")
            .selectAll("div")
            .data(wrkExpJDesc)
            .enter()
            .append("div")
                .classed("badge badge-warning m-2 p-1", true)
                .html(d => d)
                    .append("span")
                        // .property("id",newJDesc)
                        .classed("badge badge-danger rmCourse m-2 p-1", true)
                        .html("X")
                        .on("click", function(d){
                            wrkExpJDesc = wrkExpJDesc.filter(function(Jpoint){return Jpoint != d});
                            $(this).parent().remove();
                        });
        // });
        }
        console.log(wrkExpJDesc);
    });
}


function wrkAddDescGame(){
    d3.select("#addJnote").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newJDesc = d3.select("#jobDesc").property("value");
        if(newJDesc != ""){
        wrkExpJDesc.push(newJDesc);
        d3.select("#jobDesc").property("value","");
        // courses.forEach(function(courseName){
        d3.select("#jDescPanel")
            .append("div")
            .classed("badge badge-warning m-2 p-1", true)
            .html(newJDesc)
                .append("span")
                    // .property("id",newJDesc)
                    .classed("badge badge-danger rmCourse m-2 p-1", true)
                    .html("X")
                    .on("click", function(){
                        wrkExpJDesc = wrkExpJDesc.filter(function(Jpoint){return Jpoint != newJDesc});
                        $(this).parent().remove();
                    });
        // });
        }
        console.log(wrkExpJDesc);
    });
}

function wrkUpdateTechGame(){
    d3.select("#updatetUsed").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newTName = d3.select("#UtechUsed").property("value");
        if(newTName != ""){
        wrkExpTechUsed.push(newTName);
        d3.select("#UtechUsed").property("value","");
        d3.select("#UtUsedPanel")
            .selectAll("div")
            .data(wrkExpTechUsed)
            .enter()
            .append("div")
                .classed("badge badge-warning m-2 p-1", true)
                .html(d => d)
                    .append("span")
                        .property("id",d => d)
                        .classed("badge badge-danger rmCourse m-2 p-1", true)
                        .html("X")
                        .on("click", function(d){
                            wrkExpTechUsed = wrkExpTechUsed.filter(function(tName){return tName != d});
                            $(this).parent().remove();
                        });
        // });
        }
        console.log(wrkExpTechUsed);
    });
}

function wrkAddTechGame(){
    d3.select("#addtUsed").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newTName = d3.select("#techUsed").property("value");
        if(newTName != ""){
        wrkExpTechUsed.push(newTName);
        d3.select("#techUsed").property("value","");
        // courses.forEach(function(courseName){
        d3.select("#tUsedPanel")
            .append("div")
            .classed("badge badge-warning m-2 p-1", true)
            .html(newTName)
                .append("span")
                    .property("id",newTName)
                    .classed("badge badge-danger rmCourse m-2 p-1", true)
                    .html("X")
                    .on("click", function(){
                        wrkExpTechUsed = wrkExpTechUsed.filter(function(tName){return tName != newTName});
                        $(this).parent().remove();
                    });
        // });
        }
        console.log(wrkExpTechUsed);
    });
}

function wrkUpdateslider(){
    d3.select("#UwisCurrSlider").on("input",function(){
        var IsCurr = d3.select("#UwisCurrSlider").attr("value");
        if(IsCurr == "1"){
            d3.select("#UwisCurrSlider").attr("value", "2");
            // update form value
            d3.select("#UwisCurr").attr("value", "true");
            d3.select("#UwisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
            // hide gpa nd endDate
            d3.selectAll(".UwrkOpt").classed("d-none",true);
            // d3.select("#eDate").classed("d-none",true);
            // d3.select("#gpa").classed("d-none",true);
        }else if(IsCurr == "2"){
            d3.select("#UwisCurrSlider").attr("value", "1");
            d3.select("#UwisCurr").attr("value", "false");
            d3.select("#UwisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
            d3.selectAll(".UwrkOpt").classed("d-none",false);
            // d3.select("#gpa").classed("d-none",false);
        } 
        console.log(IsCurr)
    });
}


function wrkAddslider(){
    d3.select("#wisCurrSlider").on("input",function(){
        var IsCurr = d3.select("#wisCurrSlider").attr("value");
        if(IsCurr == "1"){
            d3.select("#wisCurrSlider").attr("value", "2");
            // update form value
            d3.select("#wisCurr").attr("value", "true");
            d3.select("#wisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
            // hide gpa nd endDate
            d3.selectAll(".wrkOpt").classed("d-none",true);
            // d3.select("#eDate").classed("d-none",true);
            // d3.select("#gpa").classed("d-none",true);
        }else if(IsCurr == "2"){
            d3.select("#wisCurrSlider").attr("value", "1");
            d3.select("#wisCurr").attr("value", "false");
            d3.select("#wisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
            d3.selectAll(".wrkOpt").classed("d-none",false);
            // d3.select("#gpa").classed("d-none",false);
        } 
        console.log(IsCurr)
    });
}

function showEduCourses(){
    d3.selectAll(".courseBtn").on("click", function(){
        // console.log($(this).parent().parent());
        var selectedEduCard = $(this).parent().parent().attr("id"); 
        console.log(selectedEduCard);
        if($('#'+selectedEduCard+' .keyCourses').hasClass("d-none")){
            $('#'+selectedEduCard+' .keyCourses').removeClass("d-none");
        }else{
            $('#'+selectedEduCard+' .keyCourses').addClass("d-none");
        }
    });
}


function delEdu(){
    var eduId;
    var wfID  = $('#wfID').val();
    d3.select("#eduCardPanel").selectAll(".delete-me").on("click", function(){
        eduId = $(this).parent().parent().parent().attr("id");
        console.log(eduId);
        $.ajax({
            method: 'DELETE',
            url: '/api/education/'+wfID+'/'+eduId
        })
        .then(function(removedEdu){
            console.log(removedEdu);
            $('#'+eduId).remove();
        });
    })
}

function updateEdu(){
    var eduId;
    var wfID  = $('#wfID').val();
    d3.select("#eduCardPanel").selectAll(".update-me").on("click", function(){
        d3.select("#updateCoursePanel")
            .selectAll("div")
            .remove();
        eduId = $(this).parent().parent().parent().attr("id");
        console.log(eduId);
        $.get('/api/education/'+wfID+'/'+eduId)
            .then(function(eduDets){
                console.log(eduDets)
                $('#Uename').val(eduDets.name);
                $('#UeDate').val(eduDets.eDate);
                // $('#UeisCurr').val(eduDets.isCurr);
                if(!eduDets.isCurr){
                    d3.select("#UeisCurrSlider").attr("value", "1");
                    d3.select("#UeisCurr").attr("value", "false");
                    d3.select("#UeisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
                    d3.selectAll(".UeduOpt").classed("d-none",false);
                }else{
                    // $('#UeisCurrSlider').val("2");
                    d3.select("#UeisCurrSlider").attr("value", "2");
                    d3.select("#UeisCurr").attr("value", "true");
                    d3.select("#UeisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
                    // hide gpa nd endDate
                    d3.selectAll(".UeduOpt").classed("d-none",true);
                    
                }
                $('#Uemajor').val(eduDets.major);
                $('#Uegpa').val(eduDets.gpa);
                courses = eduDets.courses;
                eduUpdateslider()
                d3.select("#updateCoursePanel")
                    .selectAll("div")
                    .data(courses)
                    .enter()
                    .append("div")
                        .classed("badge badge-warning m-2 p-1", true)
                        .html(d => d)
                            .append("span")
                                .property("id",d => d)
                                .classed("badge badge-danger rmCourse m-2 p-1", true)
                                .html("X")
                                .on("click", function(d){
                                    courses = courses.filter(function(cName){return cName != d});
                                    $(this).parent().remove();
                                });
                eduUpdCourseGame()

            })
    });
    $('#updateEdu').on('click', function(){
        var EduDetails = {name: $('#Uename').val(), eDate: $('#UeDate').val(), isCurr: $('#UeisCurr').val(), major: $('#Uemajor').val(), gpa: $('#Uegpa').val(), courses: courses};
        var updateWFurl = '/api/education/'+ wfID + '/' + eduId;
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: EduDetails
        })
        .then(function(UpdatededuDetails){
            console.log(UpdatededuDetails);
            location.reload();
            // var header = $('#'+UpdatededuDetails._id+' .card-header');
            // // console.log(header);
            // header.html(UpdatededuDetails.name);
            // var title = $('#'+UpdatededuDetails._id+' .card-title');
            // // console.log(title);
            // var grade = $('#'+UpdatededuDetails._id+' .grade');
            // grade.html("GPA:" + UpdatededuDetails.gpa);
            // var major = $('#'+UpdatededuDetails._id+' .degree');
            // major.html("DEGREE: " + UpdatededuDetails.major);
            // if(UpdatededuDetails.isCurr){
            //     title.html("Present");
            //     grade.addClass("d-none").removeClass("d-block");
            // }else{
            //     title.html("End Date: " + UpdatededuDetails.eDate);
            //     grade.addClass("d-block").removeClass("d-none");
            // }
            // $('#'+UpdatededuDetails._id+' .keyCourses .badge').remove();
            // UpdatededuDetails.courses.forEach(function(course){
            //     var courseElemnt = '<div><span style="font-size: medium;" class="badge badge-warning mx-2 my-1">'+course+'</span></div>'
            //     $('#'+UpdatededuDetails._id+' .keyCourses').append(courseElemnt);
            // });
        })
        .catch(function(err){console.log(err)})
        // console.log(EduDetails)
    });
    
}

function eduAddslider(){
    d3.select("#eisCurrSlider").on("input",function(){
        var IsCurr = d3.select("#eisCurrSlider").attr("value");
        if(IsCurr == "1"){
            d3.select("#eisCurrSlider").attr("value", "2");
            // update form value
            d3.select("#eisCurr").attr("value", "true");
            d3.select("#eisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
            // hide gpa nd endDate
            d3.selectAll(".eduOpt").classed("d-none",true);
            // d3.select("#eDate").classed("d-none",true);
            // d3.select("#gpa").classed("d-none",true);
        }else if(IsCurr == "2"){
            d3.select("#eisCurrSlider").attr("value", "1");
            d3.select("#eisCurr").attr("value", "false");
            d3.select("#eisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
            d3.selectAll(".eduOpt").classed("d-none",false);
            // d3.select("#gpa").classed("d-none",false);
        } 
        console.log(IsCurr)
    });
}

function eduUpdateslider(){
    d3.select("#UeisCurrSlider").on("input",function(){
        var IsCurr = d3.select("#UeisCurrSlider").attr("value");
        if(IsCurr == "1"){
            d3.select("#UeisCurrSlider").attr("value", "2");
            // update form value
            d3.select("#UeisCurr").attr("value", "true");
            d3.select("#UeisCurrBadge").html("Yes").classed("badge-danger",false).classed("badge-success", true);
            // hide gpa nd endDate
            d3.selectAll(".UeduOpt").classed("d-none",true);
            // d3.select("#eDate").classed("d-none",true);
            // d3.select("#gpa").classed("d-none",true);
        }else if(IsCurr == "2"){
            d3.select("#UeisCurrSlider").attr("value", "1");
            d3.select("#UeisCurr").attr("value", "false");
            d3.select("#UeisCurrBadge").html("No").classed("badge-danger",true).classed("badge-success", false);
            d3.selectAll(".UeduOpt").classed("d-none",false);
            // d3.select("#gpa").classed("d-none",false);
        } 
        console.log(IsCurr)
    });
}

function eduUpdCourseGame(){
    
    d3.select("#UpdateCourse").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newCName = d3.select("#Uecourses").property("value");
        if(newCName != ""){
        courses.push(newCName);
        d3.select("#Uecourses").property("value","");
        // courses.forEach(function(courseName){
        d3.select("#updateCoursePanel")
            .selectAll("div")
            .data(courses)
            .enter()
            .append("div")
                .classed("badge badge-warning m-2 p-1", true)
                .html(d => d)
                    .append("span")
                        .property("id",d => d)
                        .classed("badge badge-danger rmCourse m-2 p-1", true)
                        .html("X")
                        .on("click", function(d){
                            courses = courses.filter(function(cName){return cName != d});
                            $(this).parent().remove();
                        });
        }
        console.log(courses);
    });
}

function eduAddCourseGame(){
    d3.select("#addCourse").on("click",function(){
        // console.log(d3.select("#courses").property("value"));
        d3.event.preventDefault();
        var newCName = d3.select("#ecourses").property("value");
        if(newCName != ""){
        courses.push(newCName);
        d3.select("#ecourses").property("value","");
        // courses.forEach(function(courseName){
        d3.select("#coursePanel")
            .append("div")
            .classed("badge badge-warning m-2 p-1", true)
            .html(newCName)
                .append("span")
                    .property("id",newCName)
                    .classed("badge badge-danger rmCourse m-2 p-1", true)
                    .html("X")
                    .on("click", function(){
                        courses = courses.filter(function(cName){return cName != newCName});
                        $(this).parent().remove();
                    });
        // });
        }
        console.log(courses);
    });
}

function Addedu(){
    $('#eduModalTrigger').on('click', function(){courses = [];})
    eduAddslider()
    eduAddCourseGame()
    $('#addEdu').on('click', function(){
        var wfID  = $('#wfID').val();
        var updateWFurl = '/api/education/'+wfID;
        var EduDetails = {name: $('#ename').val(), eDate: $('#eDate').val(), isCurr: $('#eisCurr').val(), major: $('#emajor').val(), gpa: $('#egpa').val(), courses: courses};
        $.post(updateWFurl, EduDetails)
            .then(function(createdEdu){
                console.log(createdEdu);
                location.reload();
                
            })
            .catch(function(err){
                console.log(err)
            })
        console.log("Adding Edu Now");
    });
    
    // console.log(IsCurr) 
}

function updateSFUI(){
    $('#next').on('click', function(){
        var fNum = $('#next').val();
        if(fNum == 0){
            fNum++;
            $('#fontBgPanel').addClass("d-block").removeClass("d-none")
            $('#fontPanel').addClass("d-none").removeClass("d-block")
            $('#fontBodyPanel').addClass("d-none").removeClass("d-block")
            $('#fontTitlePanel').addClass("d-none").removeClass("d-block")
            $('#fontHeadPanel').addClass("d-none").removeClass("d-block")
            $('#fontQuotePanel').addClass("d-none").removeClass("d-block")
            $('#next').val(fNum)
        }else if(fNum == 1){
            fNum++;
            $('#fontBgPanel').addClass("d-none").removeClass("d-block")
            $('#fontPanel').addClass("d-block").removeClass("d-none")
            $('#fontBodyPanel').addClass("d-block").removeClass("d-none")
            $('#fontTitlePanel').addClass("d-none")
            $('#fontHeadPanel').addClass("d-none")
            $('#fontQuotePanel').addClass("d-none")
            $('#next').val(fNum)
        }
        else if(fNum == 2){
            fNum++;
            $('#fontBodyPanel').removeClass("d-block").addClass("d-none")
            $('#fontTitlePanel').removeClass("d-none").addClass("d-block")
            $('#next').val(fNum)
        }else if(fNum == 3){
            fNum++;
            $('#fontTitlePanel').removeClass("d-block").addClass("d-none")
            $('#fontHeadPanel').removeClass("d-none").addClass("d-block")
            $('#next').val(fNum)
            
        }else if(fNum == 4 ){
            fNum++;
            $('#fontHeadPanel').removeClass("d-block").addClass("d-none")
            $('#fontQuotePanel').removeClass("d-none").addClass("d-block")
            $('#next').val(fNum)
        }else if(fNum == 5){
            fNum = 0;
            d3.select("#SampleBG").select("img").attr("src",$('#bg_link').val());
            $('#fontBgPanel').removeClass("d-none").addClass("d-block")
            $('#fontBodyPanel').removeClass("d-none").addClass("d-block")
            $('#fontTitlePanel').removeClass("d-none").addClass("d-block")
            $('#fontHeadPanel').removeClass("d-none").addClass("d-block")
            $('#next').val(fNum)
            $('#fontPanel').addClass("d-none").removeClass("d-block")
        }
    })

    
    $('#fontPanel .selectFont').on('click',function(){
        var fontFamily = $(this).val();
        var fNum = $('#next').val();
        if(fNum == 2){
            $('#font_body').val(fontFamily)
            d3.select("#fontBodySVG").select("text").style("font-family", fontFamily);
        }else if(fNum == 3){
            $('#font_title').val(fontFamily)
            d3.select("#fontTitleSVG").select("text").style("font-family", fontFamily);
        }else if(fNum == 4){
            $('#font_header').val(fontFamily)
            d3.select("#fontHeadSVG").select("text").style("font-family", fontFamily);
        }else if(fNum == 5){
            $('#font_quotes').val(fontFamily)
            d3.select("#fontQuoteSVG").select("text").style("font-family", fontFamily);
        }
        console.log(fontFamily);
    })
}

function updateSF(){
    $('#updateSF').on('click', function(){
        var uID  = $('#uID').val();
        var wfID  = $('#wfID').val();
        var bg_link = $('#bg_link').val();
        var font_body = $('#font_body').val();
        var font_title = $('#font_title').val();
        var font_header = $('#font_header').val();
        var font_quotes = $('#font_quotes').val();
        var WfData = {basic_wf_styles:{bg_link:bg_link,font_body:font_body,font_title:font_title,font_header:font_header,font_quotes:font_quotes}};
        var updateWFurl = '/api/webFolio/'+uID+'/Wf/'+wfID;
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: WfData
        })
        .then(function(updatedWf){
            console.log(updatedWf);
            $('#fontBgPanel').removeClass("d-none").addClass("d-block")
            $('#fontBodyPanel').removeClass("d-block").addClass("d-none")
            $('#fontTitlePanel').removeClass("d-block").addClass("d-none")
            $('#fontHeadPanel').removeClass("d-block").addClass("d-none")
            $('#fontQuotePanel').removeClass("d-block").addClass("d-none")
            $('#next').val(1)
            $('#fontPanel').addClass("d-none").removeClass("d-block")
            // d3.select("body").style("background-image","url("+updatedWf.basic_wf_styles.bg_link +")");
            d3.select("body")
                .style("background-image","url("+updatedWf.basic_wf_styles.bg_link +")")
                .selectAll(".jumbotron")
                    .style("font-family", updatedWf.basic_wf_styles.font_header)
                .select("#wfTitle")
                    .style("font-family", updatedWf.basic_wf_styles.font_title);
            d3.selectAll(".card-header")
                    .style("font-family", updatedWf.basic_wf_styles.font_header);
            d3.selectAll(".card-body")
                    .style("font-family", updatedWf.basic_wf_styles.font_body);
            d3.select("#wfObjective")
                .style("font-family", updatedWf.basic_wf_styles.font_quotes);
            // $('#next').val(0);
        })
        .catch(function(err){console.log(err);})
        // console.log(WfData);
        // console.log(updateWFurl);
    })
} 

function updateBasicInf(){
    $('#updateBI').on('click', function(){
        var uID  = $('#uID').val();
        var wfID  = $('#wfID').val();
        var title = $('#title').val();
        var objective = $('#objective').val();
        var linkdn = $('#linkdn').val();
        var git = $('#git').val();
        var WfData = {title: title, objective: objective,linkdn: linkdn,git: git};
        var updateWFurl = '/api/webFolio/'+uID+'/Wf/'+wfID;
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: WfData
        })
        .then(function(updatedWf){
            console.log(updatedWf);
            $('#wfTitle').html(updatedWf.title);
            $('#wfObjective').html(updatedWf.objective);
            $('#wfLinkdn').attr("href", updatedWf.linkdn);
            $('#wfGit').attr("href", updatedWf.git);
        })
        .catch(function(err){console.log(err);})
        // console.log(WfData);
        // console.log(updateWFurl);

    });
}

function setUpWf(){
    var uID  = $('#uID').val();
    // console.log(uID)
    $.getJSON('/api/webFolio/'+uID)
        .then(function(webFolio){
            console.log(webFolio)
            addFields()
            orderFields(webFolio.include)
            hideFields(webFolio.exclude)
            d3.select("body")
                .style("background-image","url("+webFolio.basic_wf_styles.bg_link +")")
                .selectAll(".jumbotron")
                    .style("font-family", webFolio.basic_wf_styles.font_header)
                .select("#wfTitle")
                    .style("font-family", webFolio.basic_wf_styles.font_title)
                .selectAll(".card-header")
                    .style("font-family", webFolio.basic_wf_styles.font_header);
            d3.selectAll(".card-body")
                    .style("font-family", webFolio.basic_wf_styles.font_body);
            d3.select("#wfObjective")
                .style("font-family", webFolio.basic_wf_styles.font_quotes);
        })
        .catch(function(err){
            console.log(err)
        })
}

function orderFields(include){
    var orderNum = 1;
    include.forEach(function(field){
        // $('#'+field.name+'').style.order = orderNum;
        document.getElementById(field.name).style.order = orderNum;
        orderNum += 1;
    });
}

function addFields(){
    fields.forEach(function(field){
        var fImgDesc = '<img src="' +field.imgURL+ '" class="card-img" style="width:5rem; height: 5rem;" alt="...">';
        if(field.name === "WfStyles"){
            $('#'+field.name+' .fimg').append(fImgDesc);
        }else{
            $('#'+field.name+' .Fimg').append(fImgDesc);
        }
    });
}

function hideFields(exclude){
    exclude.forEach(function(excludeField){
        $('#'+excludeField.name+'').addClass("d-none")
    });
}
console.log("This is from webFolio.js")