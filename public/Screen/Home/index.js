var input = document.querySelector('.inputModule');
var add = document.getElementById('add');
// style charts
var options = {
  width: 400, height: 120,
  redFrom: 90, redTo: 100,
  yellowFrom: 30, yellowTo: 90,
  greenFrom: 0, greenTo: 30,
  minorTicks: 5,
  // min: -10,
  // max:100
  minorTicks: 10,
  majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
};


//  hàm show phần body lên mh với các từng phần tử trong mảng
function showList(list = []) {
  console.log(list)
  let body = '<ul>'
  list.forEach((value) => {
    let path = value.name;
    body += `
           <li>
                <div class="cls" >
                    <h2>Module Name:  ${path}</h2>
                    <div class = "chart" id="chart_div${value.name}"></div>
                </div>
                <div class="cls" id = "cls2">
                  <div class="control">
                        <h3 id = "${value.name}TextDC">......</h3>
                    <div id="${value.name}DataDC" onclick="switchClick('${value.name}','DataDC')" class="switchContainer ">
                        <div class="switchValue"></div>
                    </div>
              <!--  -->
                  <h3 id = "${value.name}TextLED">......</h3>
                  <div onclick="switchClick('${value.name}','DataLED')" id="${value.name}DataLED" class="switchContainer ">
                      <div class="switchValue"></div>
                  </div>
                  </div>
                    <div class ="message">
                          <p id="${value.name}message1"></p>               
                          <p id="${value.name}message2"></p>               
                          <p id="${value.name}message3"></p>               
                    </div>
                </div>
            </li>
    `
  })
  body += '</ul>'
  document.querySelector('#listbody').innerHTML = body;
  list.forEach((value) => {
    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(drawChart);   
    function drawChart() {
      var name = value.name
      const datas = [
        ['Label', 'Value'],
        ['Nhiệt Độ', 0],
        ['Độ Ẩm', 0],
        ['Độ Ẩm Đất', 0]
      ]
      var data = google.visualization.arrayToDataTable(datas);
      var chart = new google.visualization.Gauge(document.getElementById('chart_div'+name));
      chart.draw(data, options);
      listenDataSensor(value);
      listenLED_DC(name+"DataLED",name+"TextLED","LED",name + '/DataLED');
      listenLED_DC(name+"DataDC",name+"TextDC","Máy Bơm",name + '/DataDC');
    }

  })
}
// cập nhật lại data => show 
function loadData() {
  let data = getLocalModuleName();
  showList(data);
}

// hàm đọc giá trị realtime firebase
function listenDataSensor(value) {
  var dataSensor = firebase.database().ref("IOT/" + value.name);
  dataSensor.on('value'
    , (listenVal) => {
      let data = listenVal.val();
      console.log(data);
      updateChart(data, value.name,'Nhiệt Độ','Độ Ẩm','Độ Ẩm Đất');
      Grass(data,value.name);
    }, (error) => {
      console.log(error.code);
      updateChart(0, value.name,'NULL','NULL','NULL');
      Grass(null,value.name);
    })
}
function Grass (value,name) {
  console.log(value);
  console.log(name);
  if(value != null){
  if (value.Humidity == 0 && value.Temperature == 0 && Grass == 0 && value.SoilMS == 0){
    document.getElementById(name+'message1').innerHTML = 'Trạng Thái Cỏ : Không Có Dữ Liệu'
  }
  else if( Grass > 40 && (Temperature > 35 || SoilMS < 35)) {
    document.getElementById(name+'message1').innerHTML = 'Trạng Thái Cỏ :' + (100 - value.Ugly_Grass) + '%';
    document.getElementById(name+'message2').innerHTML = 'Đề Xuất Chăm Sóc:';
    document.getElementById(name+'message3').innerHTML = 'Cần Tưới Nước';
  }
  else {
    document.getElementById(name+'message1').innerHTML = 'Trạng Thái Cỏ :' + (100 - value.Ugly_Grass) + '%';
    document.getElementById(name+'message2').innerHTML = 'Đề Xuất Chăm Sóc:';
    document.getElementById(name+'message3').innerHTML = 'Cỏ Đang Phát Triển TỐT';
  }}
  else {
    document.getElementById(name+'message1').innerHTML = 'Trạng Thái Cỏ : Không Có Dữ Liệu'
  }
}
// 
function listenLED_DC(idsw, idtext, text, path) {
  var dataRealtime = firebase.database().ref("IOT/" + path);
  dataRealtime.on('value', (listen) => {
    let data = listen.val();
    if (data == 1) {
      console.log('true' + idsw + idtext + text + path)
      document.getElementById(idsw).setAttribute("class", "switchContainer on")
      document.getElementById(idtext).innerHTML = text + ": ON"
    }
    else {
      console.log('false' + idsw + idtext + text + path)
      document.getElementById(idsw).setAttribute("class", "switchContainer")
      document.getElementById(idtext).innerHTML = text + ": OFF"
    }
  }, (error) => {
    console.log(error.code);
    if(error.code == 'PERMISSION_DENIED'){
      document.getElementById(idtext).innerHTML = 'Không Có Quyền Điều Khiển';
    }
  })
}

// hàm cập nhật biểu đồ
function updateChart(data, id,TemperatureTitle,HumidityTitle,SoilMSTitle) {
  const datas = [
    ['Label', 'Value'],
    [TemperatureTitle, data.Temperature == null ? 0 : data.Temperature], // Sử dụng dữ liệu mới từ Firebase
    [HumidityTitle, data.Humidity == null ? 0 : data.Humidity],
    [SoilMSTitle, data.SoilMS == null ? 0 : data.SoilMS]
  ]
  var data = google.visualization.arrayToDataTable(datas);
  var chart = new google.visualization.Gauge(document.getElementById('chart_div' + id));
  chart.draw(data, options);
}
// write 
function WriteFb(path, key, value) {
  var ob = {};
  ob[key] = value;
  firebase.database().ref("IOT/" + path).update(ob)
    .then(() => {
      console.log("update succeeded");
    })
    .catch((e) => {
      console.log("update failed: " + e.message);
      if(e.message == 'PERMISSION_DENIED: Permission denied'){
      alert("Tài khoản không có quyền điều khiển !");
      document.getElementById(path + key).setAttribute("class", "switchContainer");
      }
    })
}

// hàm click 2 sw
function switchClick(name, sw) {
  let isclass = document.getElementById(name + sw).classList.contains("on")
  if (isclass) {
    document.getElementById(name + sw).setAttribute("class", "switchContainer")
    WriteFb(name, sw, 0);
  }
  else {
    document.getElementById(name + sw).setAttribute("class", "switchContainer on")
    WriteFb(name, sw, 1);
  }
}
// lấy value cũ từ local
function getLocalModuleName() {
  return localStorage.getItem('ModuleName') ? JSON.parse(localStorage.getItem('ModuleName')) : [] // JSON.parse conve String to Array 
}

//  kiểm tra giá trị nhập vào đã có sẵn trong local hay chưa
function kt() {
  let getvalue = getLocalModuleName();
  const isvalue = getvalue.some((value) => {
    return value.name === input.value
  })
  return isvalue
}

// thêm tên vừa nhập vào local
function setLocal() {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  firebase.database().ref().child("IOT/ListModule/").child(uid).get().then((snapshot) => {
    const data = snapshot.val();
    const key = Object.keys(data);
    if(input.value in data && data != null)
    {
      let ModuleArray = getLocalModuleName()
      ModuleArray.push({ name: input.value })
      localStorage.setItem('ModuleName', JSON.stringify(ModuleArray)) // JSON.stringify conver Array to String
      showList(ModuleArray)
      input.value = ''
    }
    else
    {
      alert("Không có thiết bị đang quản lí nào có mã: " + input.value);
    }
  })
  .catch((e) => {
    alert("Có lỗi khi lấy danh sách thiết bị quản lí")
  })
}

// onclick button add
function addModule() {
  if (!input.value) {
    alert('vui long nhap value');
  }
  else if (kt()) {
    alert("Module đã tồn tại");
  }
  else {
    setLocal();
  }
}
// on submit của thẻ form khi nhấn enter
add.addEventListener('submit', (e) => {
  if (!input.value) {
    e.preventDefault();
    alert('vui long nhap value');
    return false
  }
  if (kt()) {
    e.preventDefault();
    alert("Module đã tồn tại");
    return false
  }
  else {
    e.preventDefault();
    setLocal();
  }
})

// xóa 
function deleteModule() {

  let modulearray = JSON.parse(localStorage.getItem('ModuleName'))
  console.log(modulearray)
  modulearray = modulearray.filter((value) => {
    return value.name !== input.value
  })
  localStorage.setItem('ModuleName', JSON.stringify(modulearray))
  showList(modulearray)
  // location.reload()
}


// 

// ----------------------------------------------------------------------------->
function logout() {
  localStorage.setItem('islogin', 'null');
  localStorage.removeItem("ModuleName");
  window.location.href = "../../../index.html"
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };

}

// ----------------------------------------------------------------------------->
// KIEM TRA XEM TK CON DANG NHAP HAY DA DANG XUAT 
const onAuth = () => {
  if (!(localStorage.getItem('islogin') == 'true'))
    window.location.href = "..//..//404.html"
}


// ----------------------------------------------------------------------------->
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  loader.style.display = "none"; // Ẩn phần tử 'loader'
  setTimeout(function () {
    loader.style.display = ""; // Hiện lại phần tử 'loader'
  }, 1000);
});