getList({
    type: "userid",
    user_id: "194107829@N07"
});


//검색창에 검색어 입력후 클릭시 
$("#searchBox button").on("click", function(){

    $("#gallery_page ul").removeClass("on");
    $(".loading").removeClass("off");
    var inputs = $("#searchBox input").val();
    $("#searchBox input").val("");
    
    getList({
        type: "search",
        tag: inputs
    });    
});

//검색어 입력후 enter 이벤트
$(window).on("keypress",function(e){
    if(e.keyCode == 13){

        $("#gallery_page ul").removeClass("on");
        $(".loading").removeClass("off");
        var inputs = $("#searchBox input").val();
        $("#searchBox input").val("");
        
        getList({
            type: "search",
            tag: inputs
        }); 
    }
})

//제목 클릭시 다시 초기 상태로
$(".gallery h1").on("click",function(){
    $("#gallery_page ul").removeClass("on");
    $(".loading").removeClass("off");
    
    getList({
        type: "userid",
        user_id: "194107829@N07"
    })
})

//리스트 클릭시 팝업생성
$("body").on("click", "#gallery_page ul li", function(e){
    e.preventDefault(); 
    let imgSrc = $(this).find("a").attr("href");    
    
    $("body").append(
        $("<div class='pop'>")
            .append(
                $("<img>").attr({ src : imgSrc}),
                $("<span>").text("close")
            )
    )
});
$("body").on("click", ".pop span", function(){
    $(".pop").remove(); 
});


function getList(opt){
    var result_opt = {};

    if(opt.type == "interest"){
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
            dataType:"json", 
            data:{
                api_key:"585462c89320318d78d565f713b9b44e", 
                per_page:10, 
                format:"json",
                nojsoncallback:1, 
                privacy_filter : 1 
            }
        }
    }

    if(opt.type == "search"){
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
            dataType:"json", 
            data:{
                api_key:"585462c89320318d78d565f713b9b44e", 
                per_page:10, 
                format:"json",
                nojsoncallback:1, 
                privacy_filter : 1,
                tags: opt.tag
            }
        }
    }

    if(opt.type == "userid"){
        result_opt = {
            url: "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos",
            dataType:"json", 
            data:{
                api_key:"585462c89320318d78d565f713b9b44e", 
                per_page:10, 
                format:"json",
                nojsoncallback:1, 
                privacy_filter : 1,
                user_id: opt.user_id
            }
        }
    }
    $.ajax(result_opt)
    .success(function(data){  
        let items = data.photos.photo; 

        $("#gallery_page").empty();       
        $("#gallery_page").append("<ul>");        
       
        $(items).each(function(index, data){
            let text = data.title;        
            if(!data.title){          
                text = "No description in this photo"; 
            }
    
            //데이터의 갯수만큼 반복을 돌며 li의 동적요소 생성
            $("#gallery_page ul")
                .append(
                    $("<li>")   
                        .append(
                            $("<div>").append(
                                $("<a>").attr({
                                    href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                                })
                                .append(                            
                                    $("<img class='thumb'>").attr({
                                        src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_m.jpg"
                                    })
                                ),
                                $("<div class='gallery_txt'>")
                                .append(
                                    $("<p>").text("Lorem is Lorem"),
                                $("<span>").text("Mauris ut magna feugiat, dignissim velit vitae, eleifend urna. Nam ac eros elementum purus lobortis laoreet. Vivamus nisi urna, gravida eget mauris quis, consectetur tincidunt odio..")
                                ),
                                $("<a class='btn'>").attr({
                                    href : '#' ,
                                    onclick : "return "+ false
                                })                     
                                // $("<img class='arrow'>").attr({

                                // src : "img/arrow_black.png"})   
                                                                   
                            )
                        ) 
                )//gallery append ends       
        });  
        
        //모든 li가 완성되고 img 요소 생성후 
        //모든 소스이미지까지 로딩완료되면 isotope레이아웃 적용
        const total = $("#gallery_page ul li").length;    
        let imgNum=0;
    
        $("#gallery_page img").each(function(index, data){   
            data.onerror = function(){
                $(data).attr("src", "img/error01.jpg");
            }
            
            data.onload = function(){            
                imgNum++;        
                
                if(imgNum === total){  
                    $(".loading").addClass("off");
    
                    new Isotope("#gallery_page ul",{
                        itemSelector : "#gallery_page ul li",
                        columnWidth: "#galley_page ul li",                  
                        transitionDuration: "0.5s"
                    });                  
      
                    $("#gallery_page ul").addClass("on");
                }
            }        
        });      
    })
    .error(function(err){
        console.err("데이터를 호출하는데 실패했습니다"); 
    });
}