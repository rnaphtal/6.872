$(document).ready(function(){
$("#peteButton").click(function() {
	var url = "/pete";    
$(location).attr('href',url);
  //alert( "Handler for .click() called." );
});



SMART.ready(function(){
	console.log(SMART.record);
	// http://localhost:8000/getData/patient/1993/amy
	$.get('http://localhost:8000/getData/patient/'+SMART.record.id+'/'+SMART.record.full_name, function(data){
	// $.get('/patient/'+SMART.record.id+"/"+SMART.record.full_name, , function(data){
               console.log(data);
           });
         // document.getElementById('name').innerHTML = SMART.record.full_name;
         SMART.get_medications().success(function(meds) {
           console.log(meds);
           var med_names = meds.graph
             .where("?med rdf:type sp:Medication")
             .where("?med sp:drugName ?drug_name_code")
             .where("?drug_name_code dcterms:title ?drugname")
             // .where("?medication sp:quantity ?quantity_code");
    //          .optional(" ?drug_code sp:code ?cui")
			 // .optional(" ?drug_code dcterms:title ?medlabel")
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
             console.log(med_names);
             addMedsToTable(med_names);
      //        var fulfillments = meds.graph
		    // .where("?med rdf:type sp:Medication")
		    // .where("?med sp:fulfillment ?f")
		    // .where("?f dcterms:date ?d")
		    // .optional("?f sp:dispenseDaysSupply ?q");
		    // console.log(fulfillments);
		    // var frequencies = meds.graph
		    // .where("?med rdf:type sp:Medication")
		    // .where("?med sp:frequency ?f")
		    // // .where("?f dcterms:date ?d")
		    // .optional("?f sp:value ?value")
		    // optional("?f sp:unit ?unit");
		    // console.log(frequencies);
      //       //  var med_dosages = meds.graph
      //       //  .where("?medication rdf:type sp:Medication")
      //       //  .where("?medication sp:quantity ?quantity_outer")
      //       //  .where("?medication sp:ValueAndUnit ?quantity_code")
      //       //  // .where("?quantity_outer sp:ValueAndUnit ?quantity_code")
      //       //  // .where("?quantity_code sp:value ?value")
      //       //  // .where("?quantity_code sp:unit ?unit");
      //       // console.log(med_dosages);
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
			'"> Edit Alarm</button></td></tr>');
	}

function updateModal(single_med) {
	console.log("Updating modal");
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
	for (i = 0; i < parseInt(freqvalue); i++) { 
    	$('#modalTimeSelections').append('Time '+i+': <input type="time" class="form-control" placeholder="Text input">');
    }

    $('#modalEmailDiv').html('Email: <input type="email" class="form-control" placeholder="email">');
	// console.log($('#myModal'));
	$('#myModal').modal('show');
}
});