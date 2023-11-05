
// var tables = document.getElementById('table1');
// var slider = document.getElementById('slider');
// var slider1 = document.getElementById('slider1');
// var slider2 = document.getElementById('slider2');
// var slider3 = document.getElementById('slider3');
// var slider4 = document.getElementById('slider4');

// var nhietdo_kv1 = tables.rows[1].cells[1];
// var doam_kv1 = tables.rows[1].cells[2];
// var nhietdo_kv2 = tables.rows[2].cells[1];
// var doam_kv2 = tables.rows[2].cells[2];



// function updateData (path,key,value) {
//   var ob = {};
//   ob[key] = value;
//   firebase.database().ref(path).update(ob)
// }


// 
// function read_data () {
  // window.location.href = "./slider.html"
    // var kv1_nhietdo = firebase.database().ref('test/kv1/nhietdo');
    // var kv1_doam = firebase.database().ref('test/kv1/doam');
    // var kv2_nhietdo = firebase.database().ref('test/kv2/nhietdo');
    // var kv2_doam = firebase.database().ref('test/kv2/doam');
    // kv1_nhietdo.on('value', (snapshot) => {
    //   nhietdo_kv1.innerHTML = snapshot.val();
    //   slider1.value = snapshot.val();
    //   document.getElementById("sliderValue1").innerHTML = slider1.value;
    //   slider1.style.backgroundSize = `${(parseInt(snapshot.val()) + 100)/2}% 100%`;
    // });
    // kv1_doam.on('value', (snapshot) => {
    //     doam_kv1.innerHTML = snapshot.val();
    //     slider2.value = snapshot.val();
    //     document.getElementById("sliderValue2").innerHTML = slider2.value;
    //     slider2.style.backgroundSize = `${snapshot.val()}% 100%`;
    //   });
    //   kv2_nhietdo.on('value', (snapshot) => {
    //     nhietdo_kv2.innerHTML = snapshot.val();
    //     slider3.value = snapshot.val();
    //     document.getElementById("sliderValue3").innerHTML = slider3.value;
    //     slider3.style.backgroundSize = `${(parseInt(snapshot.val()) + 100)/2}% 100%`;
    //   });
    //   kv2_doam.on('value', (snapshot) => {
    //     doam_kv2.innerHTML = snapshot.val();
    //     slider4.value = snapshot.val();
    //     document.getElementById("sliderValue4").innerHTML = slider4.value;
    //     slider4.style.backgroundSize = `${snapshot.val()}% 100%`;
    // });
// }



// slider.style.backgroundSize = `${((slider.value+90)/999999999)*100}% 100%`;
// document.getElementById("sliderValuePhoneNumber").innerHTML = slider.value.padStart(9, '0');

// function updateVal(data) {
//   document.getElementById("sliderValuePhoneNumber").innerHTML = data.padStart(9, '0');
//   slider.style.backgroundSize = `${(data/999999999)*100}% 100%`;
// }
// function updateVal1(data,id1,id2,path,key) {
//   document.getElementById(id2).innerHTML = data;
//   (id1 == 'slider1' || id1 == 'slider3')?
//   document.getElementById(id1).style.backgroundSize = `${(parseInt(data)+100)/2}% 100%`:
//   document.getElementById(id1).style.backgroundSize = `${(data)}% 100%`;
//   updateData (path,key,data)
// }
// function updateVal2 (id,path,key) {
//   var data = document.getElementById(id).value;
//   (data=='')?alert('Không có giá trị'):
//   (data>100)? alert('giá trị tối đa là 100'):(data<0)? alert('giá trị tối thiểu là 0'):updateData(path,key,data);
// }
// function updateVal3 (id,path,key) {
//   var data = document.getElementById(id).value;
//   (data=='')?alert('Không có giá trị'):
//   (data>100)? alert('giá trị tối đa là 100'):(data<-100)? alert('giá trị tối thiểu là -100'):updateData(path,key,data);
// }