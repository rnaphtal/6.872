$(document).ready(function(){


var currentMedicationsForRecord={};

SMART.ready(function(){

reloadTable();

	
	// console.log(SMART.record);
	// http://localhost:8000/getData/patient/1993/amy
	
       });

function reloadTable () {
	currentMedicationsForRecord={}
	//jQuery.ajaxSetup({async:false});
	$.get('http://localhost:8000/getData/patient/'+SMART.record.id+'/'+SMART.record.full_name, function(data){
	// $.get('/patient/'+SMART.record.id+"/"+SMART.record.full_name, , function(data){
               console.log(data);
           });
         // document.getElementById('name').innerHTML = SMART.record.full_name;
         SMART.get_medications().success(function(meds) {
           // console.log(meds);
           var med_names = meds.graph
             .where("?med rdf:type sp:Medication")
             .where("?med sp:drugName ?drug_name_code")
             .where("?drug_name_code dcterms:title ?drugname")
			 .optional(" ?med sp:strength ?strength")
			 .optional(" ?med sp:strengthUnit ?strengthUnit")
			 .optional(" ?med sp:form ?form")
			 .optional(" ?med sp:dose ?dose")
			 .optional(" ?med sp:doseUnit ?doseUnit")
			 .optional(" ?med sp:route ?route")
			 .optional(" ?med sp:instructions ?notes")
			 .where(" ?med sp:frequency ?freq")
			 .where(" ?med sp:quantity ?quantity")
			 .optional(" ?med dcterms:identifier ?val")
			 .optional(" ?med sp:startDate ?sd")
			 .optional(" ?med sp:endDate ?ed")
		    // .where("?f dcterms:date ?d")
		    .where("?freq sp:value ?freqvalue")
		    .where("?freq sp:unit ?frequnit")
		    .where("?quantity sp:value ?quantityvalue")
		    .where("?quantity sp:unit ?quantityunit");
             // console.log(med_names);
             addMedsToTable(med_names);
         }).error(function(err) { alert ("An error has occurred"); });

}
String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}

function addMedsToTable (med_names) {
	$('#medTable').empty();
	$("#medTable").append('<tr> <th> Medication</th><th> Start Date</th><th> Frequency</th><th> Dosage</th><th> Alarms</th></tr>');
	currentRowNumber=0;
	med_names.each(function(i, single_med) {
		// console.log(single_med.freq..where("?med sp:ValueAndUnit"))
		var drugname = single_med.drugname.toString().substring(1,single_med.drugname.toString().length-1);
		var startDate = single_med.sd.toString().substring(1,single_med.sd.toString().length-1);
		var freqvalue = single_med.freqvalue.toString().substring(1,single_med.freqvalue.toString().length-1);
		var frequnit = single_med.frequnit.toString().substring(1,single_med.frequnit.toString().length-1);
		var quantityvalue = single_med.quantityvalue.toString().substring(1,single_med.quantityvalue.toString().length-1);
		var quantityunit = single_med.quantityunit.toString().substring(2,single_med.quantityunit.toString().length-2);
		var instructions = single_med.notes.toString().substring(1,single_med.notes.toString().length-1);
		var formattedFrequency = frequnit;
		if (frequnit.valueOf()=="/d") {
			formattedFrequency=" per day"
		}
		if (frequnit.valueOf()=="/wk") {
			formattedFrequency=" per week"
		}
		if (frequnit.valueOf()=="/mo") {
			formattedFrequency=" per month"
		}

		data={
			'drugname' : drugname,
			'startDate' : startDate,
			'freqvalue' : freqvalue,
			'frequnit' : frequnit,
			'quantityvalue' : quantityvalue,
			'quantityunit' : quantityunit,
			'patient_id' : SMART.record.id, 
			'instructions': instructions,
			'rowValue': currentRowNumber
		}

		// console.log("Should call Medication post called");
		// console.log(data);
		$.get('http://localhost:8000/getData/medication/', data, function(result) {
			console.log(result);
			for (x in result) {
   		 		currentMedicationsForRecord[result[x].fields.drugName]=result;
   		 		// console.log(result[x].fields.setAlarms.length);
   		 		if (result[x].fields.setAlarms.length>0) {
   		 			// console.log("should change text");
   		 			$('#editButton'+result[x].fields.row).html("Edit Alarm");
   		 			$('#editButtonDiv'+result[x].fields.row).append('<button type="button" class="btn btn-danger editButton" style="margin-left: 5px;"id="deleteButton'+result[x].fields.row+'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
   		 			$("#deleteButton"+result[x].fields.row).click (function () {
   		 				$.get('http://localhost:8000/deleteAlarm/'+result[x].pk, function(result) {});
   		 				reloadTable();
   		 			})
   		 		}
			}
			console.log(currentMedicationsForRecord);
			//console.log(result[0].pk);
		});

		formattedDrugName = drugname.replaceAll(" ","+");
		drugLink = "http://dailymed.nlm.nih.gov/dailymed/search.cfm?adv=1&labeltype=all&query=%28"+formattedDrugName+"%29";
		console.log(drugLink);
		var newRowText = '<tr><td><a target="_blank" href="'+drugLink+'">'+drugname+'</a></td><td>'+startDate+
			'</td><td>'+freqvalue+" "+formattedFrequency+'</td><td>'+
			quantityvalue+" "+quantityunit+'</td>';
			// console.log(newRowText);

		newRowText+=generateButtonDivText(single_med,currentRowNumber);
		$('#medTable').append(newRowText);
		makeButtonListener(single_med, currentRowNumber);
		currentRowNumber++;
     });
};

function makeButtonListener(currentMedication, currentRowNumber) {
	$("#editButton"+currentRowNumber).click(function() {
		console.log(currentRowNumber);
		updateModal(currentMedication, currentMedicationsForRecord[currentRowNumber]);
	})
};

function generateButtonDivText (currentMedication, currentgeneratingrowNumber) {
	// console.log(currentgeneratingrowNumber);
		return ('<td id="editButtonDiv'+currentgeneratingrowNumber+'"><button type="button" class="btn btn-default editButton" id="editButton'+currentgeneratingrowNumber+
			'"> Create Alarm</button></td></tr>');
	}

function updateModal(single_med) {
	// console.log("Updating modal");
	var medRecord = currentMedicationsForRecord[single_med.drugname.toString().substring(1,single_med.drugname.toString().length-1)];
	console.log(medRecord);
	console.log(single_med);
	var drugname = single_med.drugname.toString().substring(1,single_med.drugname.toString().length-1);
	var freqvalue = single_med.freqvalue.toString().substring(1,single_med.freqvalue.toString().length-1);
	var frequnit = single_med.frequnit.toString().substring(1,single_med.frequnit.toString().length-1);
	var formattedFrequency = frequnit;
	if (frequnit.valueOf()=="/d") {
		formattedFrequency=" per day"
	}
	if (frequnit.valueOf()=="/wk") {
		formattedFrequency=" per week"
	}
	if (frequnit.valueOf()=="/mo") {
		formattedFrequency=" per month"
	}

	$('#myModalLabel').html("Modify alarm for "+drugname);
	if (parseInt(freqvalue)==1) {
		$('#modalFrequency').html("This medication should be taken "+freqvalue+" time " + formattedFrequency+".");
	} else{
		$('#modalFrequency').html("This medication should be taken "+freqvalue+" times " + formattedFrequency+".");
	}
	
	$('#modalTimeSelections').html("");
	var setAlarms = medRecord[0].fields.setAlarms;
	for (i = 0; i < parseInt(freqvalue); i++) { 

		    timepickertext='<div class="input-append bootstrap-timepicker"><input id="timepicker'+i+'" type="text" class="input-small">'
            +'<span class="add-on"><i class="icon-time"></i></span></div>'
    	$('#modalTimeSelections').append('Time '+(i+1)+':'+timepickertext);
    	// $('#timepicker'+i).timepicker();
    	if (i<setAlarms.length) {
    		console.log(setAlarms[i]);
    		getSetAlarm(setAlarms[i],i);

    		
    	}
    	$('#timepicker'+i).timepicker();
    	console.log($('#timepicker'+i).val());
    }

    $('#modalEmailDiv').html('Email: <input type="email" id="emailInput" class="form-control" placeholder="email">');
	$("#saveButton").click(function () {
		updateSetAlarm(medRecord[0].pk, freqvalue);
		reloadTable();
		$('#myModal').modal('hide');
	});
	$('#myModal').modal('show');
}
});

function getSetAlarm (id, i) {
	console.log("attempting to get"+'http://localhost:8000/getData/getAlarm/'+id);
	$.get('http://localhost:8000/getData/getAlarm/'+id,function(result) {
			console.log(result);
			$('#timepicker'+i).val(result[0].fields.dateSetFor)
			$('#emailInput').val(result[0].fields.email)
			//console.log(result[0].pk);
		});
}

function updateSetAlarm (medicationpk, numAlarms) {

	$.get('http://localhost:8000/deleteAlarm/'+medicationpk, function(result) {});
	console.log("deleted")
	for (i=0;i<numAlarms;i++) {
		data={'time': $('#timepicker'+i).val(),'email':$('#emailInput').val()};
		$.get('http://localhost:8000/addAlarm/'+medicationpk, data, function(result) {});
	}
	
	
}
