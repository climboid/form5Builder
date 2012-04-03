var glb = {}; //global namespaced object
glb.rowId = 0;
glb.rowInEditCheck, glb.rowInEditRadio;

function logThis( text ){
	if( (window['console'] !== undefined) ){
		console.log( text );
	}
}


function makeFormElement(type){
	var e = $("#"+type).clone().attr({
		'id':glb.rowId,
		'kind':type
	});
	$("#formContent").prepend(e);
	glb.rowId++;

	return false;
}

function populateModal(kind,id){
	var modal = $("#modalBox");
	modal.find("h3").text(makeModalHeader(kind));
	modal.find(".modal-body").html(makeContent(kind,id));

	return;
}

function makeModalHeader(kind){
	switch(kind)
	{
	case "inputRowTemplate":
	  return "Edit Input"
	  break;
	case "textAreaTemplate":
	  return "Edit Text area"
	  break;
	case "checkboxTemplate":
	  return "Edit Checkbox"
	  break;
	case "radioTemplate":
	  return "Edit Radio buttons"
	  break;
	case "submitTemplate":
	  return "Edit Submit button"
	  break;
	case "submitAndCancelTemplate":
	  return "Edit Submit and Cancel Text"
	  break;
	case "buttonTemplate":
	  return "Edit Button Label"
	  break;
	default:
	  return;
	}
}

function makeContent(kind,id){
	switch(kind)
	{
	case "inputRowTemplate":
	  return populateModalInput(id);
	  break;
	case "textAreaTemplate":
	  return populateModalTextarea(id)
	  break;
	case "checkboxTemplate":
	  return makeCheckboxes(id)
	  break;
	case "radioTemplate":
	  return makeRadios(id)
	  break;
	case "submitTemplate":
	  return "Edit Submit button"
	  break;
	case "submitAndCancelTemplate":
	  return "Edit Submit and Cancel Text"
	  break;
	case "buttonTemplate":
	  return "Edit Button Label"
	  break;
	default:
	  return;
	}
}

//////////////////////////////////////////
///////// moda box population ////////////
//////////////////////////////////////////

function populateModalInput(id){
	var title = $("#"+id).find('h3').text();
	var inp = $("#inputEditTemplate");
	inp.find("input").attr({
		'placeholder':title,
		'value':''
	});

	$(".modal-footer").find(".btn.btn-primary").attr({
		'id':'saveEditInput',
		'fromRow':id
	});
	inp.clone();

	return inp;
}




function populateModalTextarea(id){
	var title = $("#"+id).find('h3').text();
	var inp = $("#textAreaEditTemplate");
	inp.find("input").attr({
		'placeholder':title,
		'value':''
	});

	$(".modal-footer").find(".btn.btn-primary").attr({
		'id':'saveEditTextArea',
		'fromRow':id
	});
	inp.clone();

	return inp;
}


function makeCheckboxes(id){
	var existing = $("#"+id), cVals=[];
	var inp = $("#checkBoxCreateTemplate");

	if(existing.size()!==0){
		existing.find(".span6").children("label").each(function(){
			cVals.push($(this).find(".txt").text());
		});
		inp.find("input").attr({'placeholder':cVals,'value':''});
		glb.rowInEditCheck = true;
	}else{
		inp.find("input").attr({'placeholder':"America, Asia, Europe",'value':''});
	}

	$(".modal-footer").find(".btn.btn-primary").attr({'id':'saveCreateCheckboxes','fromRow':id});
	inp.clone();

	return inp;	

}

function makeRadios(id){
	var existing = $("#"+id), cVals=[];
	var inp = $("#radiosCreateTemplate");

	if(existing.size()!==0){
		existing.find(".span6").children("label").each(function(){
			cVals.push($(this).find(".txt").text());
		});
		inp.find("input").attr({'placeholder':cVals,'value':''});
		glb.rowInEditRadio = true;
	}else{
		inp.find("input").attr({'placeholder':"America, Asia, Europe",'value':''});
	}
	
	$(".modal-footer").find(".btn.btn-primary").attr({'id':'saveCreateRadios','fromRow':id});
	inp.clone();

	return inp;
	
}

function editCheckBoxes(){
	var el = $("#saveCreateCheckboxes").attr('fromRow');
	var prev = $("#"+el);

	var e = $("#checkboxTemplate").clone().attr({
		'id':el,
		'kind':"checkboxTemplate"
	});

	var row = e.find("label.checkbox").clone();
	e.find("label.checkbox").remove();
	var list = $("#firstCheckboxes").val();
	list = list.split(",");

	for(var i=0; i<list.length; i++){
		var clRow = row.clone();
		clRow.find(".txt").text(list[i]);
		e.find(".span6").append(clRow);
	}

	prev.before(e);
	prev.remove();

	return;

}

function editRadios(){
	var el = $("#saveCreateRadios").attr('fromRow');
	var prev = $("#"+el);

	var e = $("#radioTemplate").clone().attr({
		'id':el,
		'kind':"radioTemplate"
	});

	var row = e.find("label.radio").clone();
	e.find("label.radio").remove();
	var list = $("#firstRadios").val();
	list = list.split(",");

	for(var i=0; i<list.length; i++){
		var clRow = row.clone();
		clRow.find(".txt").text(list[i]);
		e.find(".span6").append(clRow);
	}

	prev.before(e);
	prev.remove();

	return;

}


jQuery(document).ready(function($){


	$(".actionElements").on('click','li',function(){
		var type = $(this).attr('type');
		if(type=="checkboxTemplate"){
			populateModal(type,glb.Id);
			glb.Id++;
			$('#modalBox').modal({
				keyboard:true
			});

			return;
		}

		if(type=="radioTemplate"){
			populateModal(type,glb.Id);
			glb.Id++;
			$('#modalBox').modal({
				keyboard:true
			});

			return;
		}

		makeFormElement(type);

		return false;
	});

	$(".btn-danger").live('click',function(){
		$(this).parents('li').fadeOut("slow");
	});


	$(".launchModal").live('click',function(){
		var row = $(this).parents('li');
		var kind = row.attr('kind');
		var id = row.attr('id');

		populateModal(kind,id);

		$('#modalBox').modal({
			keyboard:true
		});
	});

////////////////////////////////////////////
// save once edited form elements         //
////////////////////////////////////////////


	$("#saveEditInput").live('click',function(){
		var newInput = $("#inputEditTemplate").find('input').val();
		var toRow = $(this).attr('fromRow');
		$("#"+toRow).find('h3').text(newInput);
		$('#modalBox').modal('hide');

		return;

	});


	$("#saveEditTextArea").live('click',function(){
		var newInput = $("#textAreaEditTemplate").find('input').val();
		var toRow = $(this).attr('fromRow');
		$("#"+toRow).find('h3').text(newInput);
		$('#modalBox').modal('hide');

		return;

	});

	$("#saveCreateCheckboxes").live('click',function(){
		if(glb.rowInEditCheck){
			editCheckBoxes();
			glb.rowInEditCheck=false;
			$('#modalBox').modal('hide');
			return;
		}
			

		var e = $("#checkboxTemplate").clone().attr({
			'id':glb.rowId,
			'kind':"checkboxTemplate"
		});

		var row = e.find("label.checkbox").clone();
		e.find("label.checkbox").remove();
		var list = $("#firstCheckboxes").val();
		list = list.split(",");

		for(var i=0; i<list.length; i++){
			var clRow = row.clone();
			clRow.find(".txt").text(list[i]);
			e.find(".span6").append(clRow);
		}

		$("#formContent").prepend(e);

		glb.rowId++;

		//$("#"+toRow).find('h3').text(newInput);
		$('#modalBox').modal('hide');

		return;
	});

	$("#saveCreateRadios").live('click',function(){

		if(glb.rowInEditRadio){
			editRadios();
			glb.rowInEditRadio=false;
			$('#modalBox').modal('hide');
			return;
		}
		var e = $("#radioTemplate").clone().attr({
			'id':glb.rowId,
			'kind':"radioTemplate"
		});

		var row = e.find("label.radio").clone();
		e.find("label.radio").remove();
		var list = $("#firstRadios").val();
		list = list.split(",");

		for(var i=0; i<list.length; i++){
			var clRow = row.clone();
			clRow.find(".txt").text(list[i]);
			e.find(".span6").append(clRow);
		}
		
		$("#formContent").prepend(e);
		glb.rowId++;

		//$("#"+toRow).find('h3').text(newInput);
		$('#modalBox').modal('hide');

		return;
	});
})