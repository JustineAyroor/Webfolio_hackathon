var fields = [{name: "pdets", imgURL:"https://cdn2.iconfinder.com/data/icons/basic-39/140/list__menu__option__row__details-512.png"},{name: "WfStyles", imgURL:"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/letter_case_email_mail-512.png"},{name: "project", imgURL:"https://cdn.iconscout.com/icon/premium/png-512-thumb/project-development-615539.png"},{name: "education", imgURL:"https://cdn.iconscout.com/icon/premium/png-256-thumb/education-1512787-1282295.png"},{name: "wrkExp", imgURL:"https://cdn1.iconfinder.com/data/icons/happy-and-efficient-workplace/204/job-work-happy-006-512.png"},{name: "certifications", imgURL:"https://cdn1.iconfinder.com/data/icons/cv-resume-1/32/23-512.png"},{name: "tskills", imgURL:"https://cdn3.iconfinder.com/data/icons/office-189/64/16_hard_skills_skill_portfolio_book_business_office-512.png"}];
var include = [];
var exclude = [];
   
$(document).ready(function(){
    console.log("This is from home.js")
    console.log(fields)
    // Check type of page
    // if update make call to api 
    // update include and exclude
    var pageName = $('#page').val();
    if(pageName == "update"){
        getFields();
    }else{
        include = [{name: "pdets", imgURL:"https://cdn2.iconfinder.com/data/icons/basic-39/140/list__menu__option__row__details-512.png"},{name: "WfStyles", imgURL:"https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/letter_case_email_mail-512.png"},{name: "education", imgURL:"https://cdn.iconscout.com/icon/premium/png-256-thumb/education-1512787-1282295.png"}];
        exclude = [{name: "project", imgURL:"https://cdn.iconscout.com/icon/premium/png-512-thumb/project-development-615539.png"},{name: "wrkExp", imgURL:"https://cdn1.iconfinder.com/data/icons/happy-and-efficient-workplace/204/job-work-happy-006-512.png"},{name: "certifications", imgURL:"https://cdn1.iconfinder.com/data/icons/cv-resume-1/32/23-512.png"},{name: "tskills", imgURL:"https://cdn3.iconfinder.com/data/icons/office-189/64/16_hard_skills_skill_portfolio_book_business_office-512.png"}];
        addFields();
    }
    
    $('.fieldBox').on('click', 'span', function(){
        toggleField($(this).parent().parent().parent().parent());
    });

    $('#updateWf').on('click', function(){
        var Uid =  $('#userID').val();
        var updateWFurl = '/api/webFolio/'+Uid+'/Wf/';
        var WfData = {exclude: exclude, include: include};
        $.ajax({
            method: 'PUT',
            url: updateWFurl,
            data: WfData
        })
        .then(function(updatedWf){
            console.log(updatedWf);
            $('#updateWf').remove();
            $("div .field .icons").remove();
            $('#excluded').remove();
            var viewBtn = '<a class="btn btn-lg btn-warning btn-block" href="/webFolio/'+ Uid +'/Wf/'+updatedWf._id+'" id="viewWF"> View WebFolio </a>';
            $('#actionField').append(viewBtn);
        })  
        .catch(function(err){console.log(err);})
      });
    
    $('#createWf').on('click', function(){
      var Uid =  $('#userID').val();
      $.post('/api/webFolio/'+Uid+'/Wf/', {user: Uid, exclude: exclude, include: include})
      .then(function(CreatedWf){
          console.log(CreatedWf);
          $('#createWf').remove();
          $("div .field .icons").remove();
          $('#excluded').remove();
          var viewBtn = '<a class="btn btn-lg btn-warning btn-block" href="/webFolio/'+ Uid +'/Wf/'+CreatedWf._id+'" id="viewWF"> View WebFolio </a>';
          $('#actionField').append(viewBtn);
        })
      .catch(function(err){console.log(err);})  
    });
    // console.log(fieldsElmnt);
});

function getFields(){
    var uID =  $('#userID').val();
    $.getJSON('/api/webFolio/'+uID)
    .then(function(webFolio){
        console.log(webFolio)
        include = webFolio.include;
        exclude = webFolio.exclude;
        addFields();
    })
    .catch(function(err){
        console.log(err)
    })
}
function addFields(){
    console.log("adding Fields");
    console.log(include);
    include.forEach(field => {
        var newField = $('<div class="field card m-1" style="height: 7rem;"><div class="row"><div class="col-4"> <img style="height: 7rem;" src="' +field.imgURL+ '" class="card-img" alt="..."></div><div class="col-8"> <div class="card-body"><p class="card-text">'+ field.name +'</p><span class="icons"><i class="fas fa-minus-square"></i></span></div></div></div>');
        newField.data('fieldBox', "included");
        newField.data('name', field.name);
        $(newField).appendTo('#included');
    });
    exclude.forEach(field => {
        var newField = $('<div class="field card m-1" style="height: 7rem;"><div class="row"><div class="col-4"> <img style="height: 7rem;" src="' +field.imgURL+ '" class="card-img" alt="..."></div><div class="col-8"> <div class="card-body"><p class="card-text">'+ field.name +'</p><span class="icons"><i class="fas fa-plus-square"></i></span></div></div></div>');
        newField.data('fieldBox', "excluded");
        newField.data('name', field.name);
        $(newField).appendTo('#excluded');
    });
}

function toggleField(newField){
    if(newField.data('fieldBox') == "included" && newField.data('name') != "pdets" && newField.data('name') != "WfStyles"){
        var fName = $(newField).data('name');
        var tfData = fields.find(function(field){
            return field.name == fName;
        });
        var tField = $('<div class="field card m-1" style="height: 7rem;"><div class="row"><div class="col-4"> <img style="height: 7rem;" src="' +tfData.imgURL+ '" class="card-img" alt="..."></div><div class="col-8"> <div class="card-body"><p class="card-text">'+ tfData.name +'</p><span class="icons"><i class="fas fa-plus-square"></i></span></div></div></div>');
        console.log(tField);
        include = include.filter(function(field){
            return field.name != fName;
        });
        newField.remove();
        exclude.push(tfData);
        tField.data('name',tfData.name)
        tField.data('fieldBox',"excluded");
        $(tField).appendTo('#excluded')
    }else if(newField.data('fieldBox') == "excluded" && newField.data('name') != "pdets" && newField.data('name') != "WfStyles"){
        var fName = $(newField).data('name');
        var tfData = fields.find(function(field){
            return field.name == fName;
        });
        var tField = $('<div class="field card m-1" style="height: 7rem;"><div class="row"><div class="col-4"> <img style="height: 7rem;" src="' +tfData.imgURL+ '" class="card-img" alt="..."></div><div class="col-8"> <div class="card-body"><p class="card-text">'+ tfData.name +'</p><span class="icons"><i class="fas fa-minus-square"></i></span></div></div></div>');
        console.log(tField);
        exclude = exclude.filter(function(field){
            return field.name != fName;
        });
        newField.remove();
        include.push(tfData);
        tField.data('name',tfData.name)
        tField.data('fieldBox',"included");
        $(tField).appendTo('#included')
    }   
    console.log(include);
    console.log(exclude);
}