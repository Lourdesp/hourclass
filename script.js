var data;

function resetData() {
    data = {
        teacherPass: "",
        studentData: [],
    }
}

function now() {
    x = new Date().getTime();
    return x;
}

function addStudent(name, aClass, id) {
    data['studentData'].push({
        sName: name,
        sClass: aClass,
        sID: id,
        state: "in",
        lateTimes: [],
        outTimes: [],
        totalOutTime: 0,
    })
}

function signOut(id) {
    data['studentData'].forEach(function(d) {
        if (d.sID == id) {
            d.outTimes.push({
                timeOut: now(),
                timeIn: null,
                timeMissed: null
            })
        }
    });
}

function signIn(id) {
    data['studentData'].forEach(function(d, i) {
        if (d.sID == id) {
            var lastindex = d.outTimes.length - 1;
            data['studentData'][i].outTimes[lastindex]['timeIn'] = now();
            var tOut = data['studentData'][i].outTimes[lastindex]['timeIn'] - data['studentData'][i].outTimes[lastindex]['timeOut'];
            data['studentData'][i].outTimes[lastindex]['timeMissed'] = tOut
            data['studentData'][i].totalOutTime += tOut;
        }
    })
}

// $('#import').click(alert("I was clicked"));

// function setupPage(){
//     importRoster();
//     dummy();
//     generateButtons();
// }

// function dummy(){
//     console.log('asdf');
// }

function importRoster() {
    var cont = confirm("This will erase all saved data. continue?");
    if (cont == true) {

        resetData()
        var rosterPath = 'roster';

        $.get(rosterPath, function(d) {
            studentList = d.split('\n');

            studentList.forEach(function(s) {
                var sData = s.split(',');
                addStudent(sData[0], sData[1], sData[2])
            });

            // alert(JSON.stringify(data))
            // alert(JSON.stringify(data))
        });

        // generateButtons();
    }
}

function generateButtons() {
    // alert(JSON.stringify(data));
    data['studentData'].forEach(function(d) {
        // alert(JSON.stringify(data));
        var n = d.sName;
        var id = d.sID;
        $('#students').append('<div class="col-lg-6"><button id=' + id + ' type="button" class="btn btn-success btn-lg student">' + n + '</button><div class="col-lg-6">')
    })
    setClickListener();
    generateTable();
    resetState();
}



function setClickListener() {
    $(".student").click(function() {
        $(this).toggleClass("btn-danger");
        var id = $(this).attr('id');
        data['studentData'].forEach(function(d, i) {
            if (d.sID == id) { //if IDs match
                if (d.state == "in") { //if student is in the classroom
                    signOut(id);
                    data['studentData'][i]['state'] = 'out';
                    console.log("out");
                }
                else { // if student is out of the classroom
                    signIn(id);
                    saveData(JSON.stringify(data));
                    data['studentData'][i]['state'] = 'in';
                    updateTable();
                    console.log("in");
                }
            }
        });
    });
}

function generateTable() {
    data['studentData'].forEach(function(d, i) {
        var id = d.sID;
        var n = d.sName;
        $('#dispTable').append('<tr><td id="table'+id+'name">' + n + '</td><td id="table'+id+'exits"></td><td id="table'+id+'tout"></td></tr>');
    });
}

function updateTable() {
    data['studentData'].forEach(function(d, i) {
        var exits = d.outTimes.length;
        var tOut = d.totalOutTime/1000;
        var idString = 'table' + d.sID;
        $('#'+idString+'exits').html(exits);
        $('#'+idString+'tout').html(tOut);
    })
}

// Clock
function getTime() {
    var rawTime = new Date().toString();
    hr = rawTime.substring(16, 18);
    hr = parseInt(hr);
    hr = (hr > 12 ? (hr % 12) : hr).toString();
    hr = (hr == 0 ? hr = 12 : hr).toString();
    min = rawTime.substring(19, 21);
    sec = rawTime.substring(22, 24);
    document.getElementById("hrMin").innerHTML = hr + ":" + min;
    document.getElementById("sec").innerHTML = sec;
}
setInterval(getTime, 1000);

function resetState(){
    console.log("asdf");
    data['studentData'].forEach(function(d,i){
        data['studentData'][i].state = "in";
    });
}

$(document).ready(function() {
    getTime();
    loadData();
});