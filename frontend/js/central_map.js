$(window).on("load",function(){
    var Central_Map = Object.create(Map);

    Central_Map.map = $("#central_map")[0];
    Central_Map.content = Central_Map.map.contentDocument;
    Central_Map.objects = ["#path68000","#path96","#path94","#path92","#path46",
                           "#path50","#path60","#path68","#path54","#path62","#path4926",
                           "#path44","#path78","#path66","#path98","#path74","#path64","#path82",
                           "#path42"];
    

    Central_Map.setStyleForObjects("fill","#a1e736",Central_Map.objects);
    Central_Map.setStyleForObjects("stroke","#71a12a",Central_Map.objects);
    Central_Map.setStyleForObjects("transition","0.2s",Central_Map.objects);
   
    Central_Map.objects.forEach(element => {
       //$(element,svgCentral).css("fill","#a1e736");
       //$(element,svgCentral).css("stroke","#71a12a");
       //$(element,svgCentral).css("transition","0.2s");
       
    $(element,svgCentral).hover(function(){
        $(element,svgCentral).css("opacity","0.7");     
        });
    $(element,svgCentral).mouseout(function(){
        $(element,svgCentral).css("opacity","1");   
        });
    });
    $("[data-tooltip]",svgCentral).mousemove(function (eventObject) {

        $data_tooltip_central = $(this).attr("data-tooltip");
        
        $("#tooltip").text($data_tooltip_central)
                     .css({ 
                         "top" : eventObject.pageY + 35,
                        "left" : eventObject.pageX,
                        
                     })
                     .show();
    }).mouseout(function () {

        $("#tooltip").hide()
                     .text("")
                     .css({
                         "top" : 0,
                        "left" : 0
                     });
    });

    count_obj("#path96",svgCentral);

    $("#path96",svgCentral).click(function(){
        window.location = "/Vladimir_map.php"
    });

    $("#central_map").css("visibility","visible")
});