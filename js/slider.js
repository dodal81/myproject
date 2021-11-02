let enableClick = true;  
let len = $(".list li").length; 
let timer;  

//로딩시 초기화
$(".list li").last().prependTo(".list"); 

$(".list").css({
     width: 100 * len +"%",
     height:"100%", 
     marginLeft:"-100%"
}); 

$(".list li").css({
    width: 100 / len +"%",
    height:"100%", 
    float:"left"
});


//next버튼 클릭시 이벤트 
$(".next").on("click", function(e){
    e.preventDefault(); 

    if(enableClick){
        enableClick = false; 
        // console.log("1");
        $(".list").animate({marginLeft:"-200%" },1000, function(){
            $(".list").css({marginLeft : "-100%"}); 
            $(".list li").first().appendTo(".list");
            enableClick = true;  
            console.log("2"); 
        }); 
       
    }
   
}); 

// // 자동롤링 product만들기 -------------------------------
let num=0;

 let time = setInterval(move, 15);
console.log(time);

$(".product_slider").on("mouseenter",function(){    
    clearInterval(time);
});
$(".product_slider").on("mouseleave", function(){    
    time = setInterval(move,15);
});

function move(){
    if(num <= -360){        
        num = 0;        
        $(".product_list").find("li").first().appendTo($(".product_list"));
    }else{ 
        num -= 2;
    }    
    $(".product_list").css({left: num});
}

