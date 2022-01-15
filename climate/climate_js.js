var xmlhttp = new XMLHttpRequest();
var column = ['時間', '最高気温', '最低気温', '天気', '風速'];

function tempalature_color(temp) {
  if (temp > 40) return "#EC0000";
  if (temp > 35) return "#FFA600";
  if (temp > 30) return "#FFD827";
  if (temp > 25) return "#B1D35C";
  if (temp > 20) return "#80EC82";
  if (temp > 15) return "#3FD8DC";
  if (temp > 10) return "#3FD8DC";
  if (temp > 5) return "#0987FF";
  if (temp > 0) return "#0000FF";
  return "#5F00FF";
};

function wind_color(wind) {
  if (wind > 10) return "#F30000";
  if (wind > 8) return "#F37100";
  if (wind > 6) return "#D4DF00";
  if (wind > 4) return "#8CEF32";
  if (wind > 2) return "#8CC1FF";
  return "#C6F3FF";
};

xmlhttp.onreadystatechange = function() {
  var cityname = document.getElementById("cityname");
  if (xmlhttp.readyState == 4) {
    if (xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);


      cityname.textContent = data["city"]["name"] + "の天気";

      var body = document.getElementsByTagName("body")[0];
      var tables = document.createElement("div");
      body.appendChild(tables);
      tables.setAttribute("id", "list");

      var cnt = 0;
      var datetime = new Date();

      for (var k = 0; k < 6; k++) {

        //感覚をあける▽--------------------------------------------
        tables.appendChild(document.createElement("br"));
        //▽-------------------------------------------------------

        //日付を表示◇----------------------------------------------
        datetime.setTime(data["list"][cnt]["dt"] * 1000);
        var theday = datetime.getDate();
        var currentday = datetime.getDate();
        var create = document.createTextNode(datetime.getMonth() + 1 + "月" + theday + "日の天気");
        tables.appendChild(create);
        //◇-------------------------------------------------------

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        //一番上の行を表示〇----------------------------------------
        var row = document.createElement("tr");
        for (const element of column) {
          var cell = document.createElement("td");
          cell.appendChild(document.createTextNode(element));
          cell.setAttribute("class", "cell");
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
        //〇-------------------------------------------------------

        //時間、最高気温、最低気温、アイコン、風速を挿入する☆--------------
        for (; theday == currentday; cnt++) {
          row = document.createElement("tr");

          var cell = document.createElement("td");
          var cellText = document.createTextNode(datetime.getHours() + "時");
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellText = document.createTextNode(data["list"][cnt]["main"]["temp_max"] + "℃");
          cell.style.color = tempalature_color(data["list"][cnt]["main"]["temp_max"]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellText = document.createTextNode(data["list"][cnt]["main"]["temp_min"] + "℃");
          cell.style.color = tempalature_color(data["list"][cnt]["main"]["temp_min"]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellpict = document.createElement("img");
          cellpict.setAttribute("src", "http://openweathermap.org/img/wn/" + data["list"][cnt]["weather"][0]["icon"] + "@2x.png");
          cell.setAttribute("class", "icon")
          cell.appendChild(cellpict);
          row.appendChild(cell);

          var cell = document.createElement("td");
          var cellText = document.createTextNode(data["list"][cnt]["wind"]["speed"] + " m/s");
          cell.style.color = wind_color(data["list"][cnt]["wind"]["speed"]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          tblBody.appendChild(row);

          if (cnt + 1 != 40) {
            datetime.setTime(data["list"][cnt + 1]["dt"] * 1000);
            currentday = datetime.getDate();
          } else {
            break;
          }
        }
        //☆-----------------------------------------------------

        tbl.appendChild(tblBody);
        tables.appendChild(tbl);
        tbl.setAttribute("border", "2");
        tbl.setAttribute("width", "50%");

      }
    }else{
      cityname.textContent = "ご入力いただいた都市は非対応です";

    }
  }
};


function popup(place) {
  const remove = document.querySelector("div#list");
  if (document.getElementById("list") != null) remove.remove();
  if (place == 'input') {
    place = document.getElementById("input").value;
    document.getElementById("cityname").textContent = "";
  } else {
    document.getElementById("input").value = "";
  }
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=ff798eb110abe633006142f92d1a9bd5&units=metric&lang=ja";
  xmlhttp.open("GET", url);
  xmlhttp.send();
};

