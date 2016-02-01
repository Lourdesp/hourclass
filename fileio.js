
// $('#save').click(function(){
function saveData(d){
	$.ajax({
		type: "POST",
		url: "main.php",
		data: {toWrite: d},
		success: function(){
			// alert(d);
		}
	})
}

function loadData(d){
	$.ajax({
		type: "GET",
		url: "studentData.txt",
		success: function(d){
			data = JSON.parse(d);
		}
	})
}