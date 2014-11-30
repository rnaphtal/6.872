$(document).ready(function(){
$("#peteButton").click(function() {
	var url = "/pete";    
$(location).attr('href',url);
  //alert( "Handler for .click() called." );
});

var currentMedicationsForRecord={};

SMART.ready(function(){

	
	$.get('http://localhost:8000/getData/patient/'+SMART.record.id+'/'+SMART.record.full_name, function(data){

           });
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
       });

String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}

function addMedsToTable (med_names) {
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
		$.get('http://localhost:8000/getData/medication/', data, function(result) {
			// console.log("Medication post called");
			for (x in result) {
   		 		// console.log(result[x].pk)
   		 		currentMedicationsForRecord[result[x].pk]=data;
   		 		// console.log(result[x].fields.setAlarms.length);
   		 		// if (result[x].fields.setAlarms.length>0) {
   		 		// 	console.log("should change text");
   		 		// 	$('#editButton'+data.rowValue).html("I took it!")
   		 		// }
			}
			// console.log(currentMedicationsForRecord);
			//console.log(result[0].pk);
		});

		var newRowText = '<tr><td>'+drugname+'</td><td>'+startDate+
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
		updateModal(currentMedication);
	})
};

function generateButtonDivText (currentMedication, currentgeneratingrowNumber) {
	// console.log(currentgeneratingrowNumber);
		return ('<td><button type="button" class="btn btn-default editButton" id="editButton'+currentgeneratingrowNumber+
			'"> I took it! </button></td></tr>');
	}

function updateModal(single_med) {
	// console.log("Updating modal");
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

	$('#myModalLabel').html("Record dose of "+drugname);
	if (parseInt(freqvalue)==1) {
		$('#modalFrequency').html("This medication should be taken "+freqvalue+" time " + formattedFrequency+".");
	} else{
		$('#modalFrequency').html("This medication should be taken "+freqvalue+" times " + formattedFrequency+".");
	}
	
	$('#modalTimeSelections').html("Time taken: ");
	for (i = 0; i < 1; i++) { 
    	$('#modalTimeSelections').append('<input type="time" class="form-control" placeholder="Text input">');
    }

    // $('#modalEmailDiv').html('Email: <input type="email" class="form-control" placeholder="email">');
	// console.log($('#myModal'));
	$("#saveButton").click(function () {
		$('#myModal').modal('hide');
	})
	$('#myModal').modal('show');
}
});