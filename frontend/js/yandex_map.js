ymaps.ready(init);
var myMap,  myPlacemark;
var get = location.search;
var x,y;
var tmp = new Array();
var tmp2 = new Array();
var param = new Array();
if(get != ''){
    tmp = get.substr(1).split('&');
    for(var i = 0;i < tmp.length;i++){
        tmp2 = tmp[i].split('=');
        param[tmp2[0]] = tmp2[1];
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var town = param['data'];

switch(town){
    case 'Vladimir':
    x = 56.129042;
    y = 40.407030;
    break;

    case 'Sydogda':
    x = 55.949879;
    y = 40.856295;
    break;

    case 'Kameskovo':
    x = 56.348916;
    y = 40.995588;
    break;

    case 'Syzdal':
    x = 56.419836;
    y = 40.449457;
    break;

    case 'Kovrov':
    x = 56.363628;
    y = 41.311220;
    break;

    case 'Radyznyi':
    x = 55.996052;
    y = 40.332281;
    break;
    case 'Sobinka':
    x = 55.993837;
    y = 40.017943;
    break;

    case 'Selevanovo':
    x = 55.870031;
    y = 41.772074;
    break;

    case 'Myrom':
    x = 55.579169;
    y = 42.052411;
    break;

    case 'Gorohovec':
    x = 56.201695;
    y = 42.691194;
    break;

    case 'Vazniki':
    x = 56.247021;
    y = 42.158862;
    break;

    case 'Gys-Xrystalnyi':
    x = 55.619818;
    y = 40.657902;
    break;

    case 'Melenki':
    x = 55.338715;
    y = 41.634030;
    break;

    case 'Yuriev-Polskiy':
    x = 56.499250;
    y = 39.680814;
    break;

    case 'Kolcygino':
    x = 56.293901;
    y = 39.376042;
    break;

    case 'Petyshki':
    x = 55.930967;
    y = 39.459900;
    break;

    case 'Kirzach':
    x = 56.161694;
    y = 38.872025;
    break;

    case 'Aleksandrov':
    x = 56.397774;
    y = 38.727621;
    break;

    default:
    x = 55.755814;
    y = 37.617635;
    break;
}



function init() {
    myMap = new ymaps.Map("map", {
        center: [x, y],
        zoom: 12
    });
    $.ajax({
        type:"POST",
        url:"http://ontourapi.kvantorium33.ru/?method=map.GetObjs",
        xhrFields: {withCredentials: true},
        success: function (data) {
            data = eval("(" + data + ")");
            if (data.result == "success") {
                json_string = JSON.stringify(data);
               //alert(json_string);
                objects = JSON.parse(json_string)
                delete objects.result
                for(key in objects){
                    var myPlacemark = new ymaps.Placemark([objects[key]['cx'], objects[key]['cy']], {
                        hintContent: 'Содержимое всплывающей подсказки',
                        balloonContent: 'Содержимое балуна'
                    });
                    myMap.geoObjects.add(myPlacemark);
                }
            }
        }
    });
    
}
