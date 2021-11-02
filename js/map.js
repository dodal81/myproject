const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5664611,126.9782482,19.88), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

//마커표시하기 -----------------------------------------------------------
const branch_btns = document.querySelectorAll(".branch li");
const markerOptions = [
    { 
       title: "본점", 
       latlng : new kakao.maps.LatLng(37.5664611,126.9782482,19.88), 
       imgSrc : "img/marker1.png", 
       imgSize : new kakao.maps.Size(70, 70),
       imgPos : {offset: new kakao.maps.Point(128, 99)}, 
       button :  branch_btns[0]
    },
    {
       title: "부산지점", 
       latlng : new kakao.maps.LatLng(35.179687,129.0748251,19.98), 
       imgSrc : "img/marker1.png", 
       imgSize : new kakao.maps.Size(70, 70),
       imgPos : {offset: new kakao.maps.Point(116, 99)}, 
       button :  branch_btns[1]
    },
    {
       title: "제주지점", 
       latlng : new kakao.maps.LatLng(33.499504,126.5311894,21), 
       imgSrc : "img/marker1.png", 
       imgSize : new kakao.maps.Size(70, 70),
       imgPos : {offset: new kakao.maps.Point(116, 99)}, 
       button :  branch_btns[2]
    }
 ];
 
 
 for(let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
       map:map,  
       position:markerOptions[i].latlng, 
       title:markerOptions[i].title, 
       image:new kakao.maps.MarkerImage(markerOptions[i].imgSrc,markerOptions[i].imgSize, markerOptions[i].imgPos)
    }); 
 
    //branch 메뉴 버튼을 클릭했을때 
    markerOptions[i].button.onclick = function(){
       //해당 지점의 위치로 이동 
       moveTo(markerOptions[i].latlng); 
 
       //branch 메뉴 버튼 모두 비활성화후 클릭한 버튼만 활성화  
       for(let k=0; k<markerOptions.length; k++){
          markerOptions[k].button.classList.remove("on"); 
       }
       markerOptions[i].button.classList.add("on"); 
    }
 }
   
 function moveTo(target) {            
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = target;
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
 } 
 
 
 //브라우저 사이즈를 변경할 때 마커이미지와 지도 중심 가운데로 유지 
 window.onresize = ()=>{
    //활성화된 버튼의 data-index값 구하기  
    const active_btn = document.querySelector(".branch li.on"); 
    const active_index = active_btn.getAttribute("data-index"); 
    console.log(active_index); 
    map.setCenter(markerOptions[active_index].latlng)
 }
 
 
 
 
 
 
 //교통정보 표시하기 ---------------------------------------------------
//  const t_on = document.querySelectorAll(".traffic li")[0];  
//  const t_off = document.querySelectorAll(".traffic li")[1]; 
 
//  //교통정보 켜기 버튼 클릭시 
//  t_on.addEventListener("click", function(e){
//     e.preventDefault(); 
//     // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
//     map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
 
//     t_on.classList.add("on"); 
//     t_off.classList.remove("on"); 
    
//  });
 
//  //교통정보 끄기 버튼 클릭시 
//  t_off.addEventListener("click", function(e){
//     e.preventDefault(); 
//     // 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
//     map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
 
//     t_on.classList.remove("on"); 
//     t_off.classList.add("on"); 
//  });
 
 
 
 
 // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
 const mapTypeControl = new kakao.maps.MapTypeControl();
 
 // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
 // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
 map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
 
 // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
 const zoomControl = new kakao.maps.ZoomControl();
 map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);   
 
 
 //지도 이동 막기 
 setDraggable(true); 
 // 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
 function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
 }
  
 //지도 확대 축소 켜기 //끄기는 false  
 setZoomable(true); 
 // 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
 function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
 }
 