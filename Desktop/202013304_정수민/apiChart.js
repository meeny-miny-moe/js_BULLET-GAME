// onoff3 = cctv, onoff1 = police, onoff2 = safeMap, onoff4=SafeRestaurant
// bounds2 = cctv , bounds = police, bounds1= safeMap, bounds3 = SafeRestaurant

//집의 마커를 중심으로 그리는 원의 반지름
var Radius = 500; //중심으로부터 반경 500m내
// 비동기식으로 데이터를 받아오기에 처음 5초정도 대기했는가?
var already = false;

//처음화면에서 입력받은 동입력
const locate = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우
var input = decodeURI(locate);
var myArray = input.split(' ');
var gu = myArray[0];
var dong = myArray[1];

//주소변환
var geocoder = new kakao.maps.services.Geocoder();

//cctv
var onoff3 = 0;
var bounds2 = new kakao.maps.LatLngBounds();

let cctv = document.querySelector('.cctv');

var imageSrc3 = './images/cctv.png'; //cctv 이미지
var imageSize3 = new kakao.maps.Size(20, 20);
var markerImage3 = new kakao.maps.MarkerImage(imageSrc3, imageSize3);

var clusterer3 = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
});
// cctv 클러스터 색상 변경
clusterer3.setStyles([
    {
        width: '40px',
        height: '40px',
        background: 'rgba(142, 203, 221, 0.8)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '40px',
        borderRadius: '50px',
    },
    {
        width: '60px',
        height: '60px',
        background: 'rgba(142, 203, 221, 0.8)',
        color: '#fff',
        border: '1px solid blue',
        textAlign: 'center',
        lineHeight: '60px',
        borderRadius: '60px',
    },
]);
//cctv 마커들을 저장할 배열
var cctvMarkers = [];

//police
var onoff1 = 0;
var bounds = new kakao.maps.LatLngBounds();
//경찰서 api url
var policeUrl =
    'https://api.odcloud.kr/api/15054711/v1/uddi:f038d752-ff35-4a22-a2c2-cf9b90de7a30?page=11&perPage=110&returnType=json&serviceKey=9Ji2xPHuC1E10E%2FN6blCIgf6ORoyf4BLr6jKiSnDKX7Y2eGuqQn5J%2FMV1ybGrdfeMqYXCGKKA4TqUMzOUdoQEQ%3D%3D'; /*URL*/
var police = document.querySelector('.police');

var clusterer1 = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
});
//경찰서 마커 이미지
var imageSrc1 = './images/police.png';
var imageSize1 = new kakao.maps.Size(35, 45);
var markerImage1 = new kakao.maps.MarkerImage(imageSrc1, imageSize1);
//경찰서 마커들을 저장할 배열
var policeMarkers = [];

//safeMap
var onoff2 = 0;
var bounds1 = new kakao.maps.LatLngBounds();

var safemap = document.querySelector('.safemap');

var clusterer2 = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
});

//안전지도 마커 이미지
var imageSrc2 = './images/safehouse.png';
var imageSize2 = new kakao.maps.Size(35, 35);
var markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2);

//안전지도 마커들을 저장할 배열
var safeMapMarkers = [];

//safeRestaurant
var B = 2124;

var bounds3 = new kakao.maps.LatLngBounds();
var onoff4 = 0;

var eat = document.querySelector('.eat');
//안심식당 api url과 쿼리문
var safeRestaurantUrl =
    'http://apis.data.go.kr/6260000/BusanSafeRestaurantService/getSafeRestaurantList'; /*URL*/
var safeRestaurantQueryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    '9Ji2xPHuC1E10E/N6blCIgf6ORoyf4BLr6jKiSnDKX7Y2eGuqQn5J/MV1ybGrdfeMqYXCGKKA4TqUMzOUdoQEQ=='; /*Service Key*/
safeRestaurantQueryParams +=
    '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(B); /**/

var clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
});
//안심식당 클러스터색상 변경
clusterer.setStyles([
    {
        width: '40px',
        height: '40px',
        background: 'rgba(253, 222, 139, 0.8)',
        color: '#fff',
        textAlign: 'center',
        lineHeight: '40px',
        borderRadius: '50px',
    },
    {
        width: '60px',
        height: '60px',
        background: 'rgba(253, 222, 139, 0.8)',
        color: '#fff',
        border: '1px solid blue',
        textAlign: 'center',
        lineHeight: '60px',
        borderRadius: '60px',
    },
]);

//안심식당 마커 이미지
var imageSrc = './images/restaurant.png';
var imageSize = new kakao.maps.Size(35, 35);
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
//안심식당 마커들을 저장할 배열
var safeRestaurantMarkers = [];

var detail = document.getElementsByClassName('details');
// 변수 설정 끝--------------------------

//cctv fetch
fetch('./js/Data/CCTV Data.json')
    .then((response) => response.json())
    .then((data) => {
        var cctvs = data.data;

        for (var i = 0; i < 13341; i++) {
            var lat = data[i].WGS84위도; //위도,경도 정보 변수화
            var lng = data[i].WGS84경도;
            var ad = data[i].소재지도로명주소;
            if (ad == null) { //주소가 없으면 마커표시X
                continue;
            }
            if (ad.includes(dong)) { //입력받은 주소의 동으로 검색
                var coords = new kakao.maps.LatLng(lat, lng);
				//위도와 경도로 마커의 좌표 표시
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(lat, lng),
                    map: map,
                    image: markerImage3,
                    clickable: true,
                }); //마커 위치, 이미지, 클릭여부를 설정
                cctvMarkers.push(marker);//Markers에 마커 추가
                marker.setMap(null); //맵에 마커를 표시하지 않는 초기설정
                bounds2.extend(coords); 
				//bounds에 마커좌표를 추가해 CCTV메뉴 클릭 시 마커가 모두 보이는 위치로 이동
            }
        }
        //메인화면에서 cctv 메뉴를 클릭했다면
        cctv.addEventListener('click', function () {
            if (onoff3 == 0) {    //cctv 마커가 그려져 있지 않다면 그려주기
                clusterer3.addMarkers(cctvMarkers);
                map.setBounds(bounds2);
                onoff3 = 1;    //마커가 그려져 있다는 표시
            } else {    // 이미 마커가 그려져 있다면 cctv마커 지우기
                clusterer3.clear();    
                onoff3 = 0;    //마커가 그려져 있지 않다는 표시
            }
        });
    });

//police fetch
fetch(policeUrl)
    .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
    })
    .then((data) => {
        for (var i = 0; i < 107; i++) {
            if (data.data[i].주소.includes(dong)) {
			//경찰서 API의 주소정보를 이용해 입력받은 동을 검색
                var lat = data.data[i].Y좌표;
                var lng = data.data[i].X좌표;
				//경찰서 API의 위도 경도 정보를 변수화
				
                var coords = new kakao.maps.LatLng(lat, lng);
				//마커의 위치변수 생성
                var marker = new kakao.maps.Marker({
                    position: coords,
                    map: map,
                    image: markerImage1,
                }); //마커의 위치와 이미지 설정
                policeMarkers.push(marker);//Markers에 마커추가
                marker.setMap(null); //맵에 마커를 표시하지 않는 초기설정
                bounds.extend(coords); 
				//bounds에 마커의 위치를 추가해서 메뉴 클릭 시 표시/비표시
            }
        }
        //메인화면에서 경찰서 메뉴를 클릭했다면
        police.addEventListener('click', function () {
            if (onoff1 == 0) {    //경찰서 마커가 표시되어있지 않다면 마커 그려주기
                clusterer1.addMarkers(policeMarkers);
                map.setBounds(bounds);
                onoff1 = 1;    //마커가 그려졌다는 표시
            } else {    //경찰서 마커가 이미 그려져 있다면 마커 지워주기
                clusterer1.clear();    
                onoff1 = 0;
            }
        });
    });

//safeMap fetch
for (var i = 1; i < 127; i++) {
    var safeMapUrl = 'http://www.safe182.go.kr/api/lcm/safeMap.do'; /*URL*/
    var safeMapQueryParams = '?' + encodeURIComponent('esntlId') + '=' + '10000457';
    safeMapQueryParams += 
		'&' + encodeURIComponent('authKey') + '=' + encodeURIComponent('9b2f048df57e418a');
    safeMapQueryParams += 
		'&' + encodeURIComponent('pageIndex') + '=' + encodeURIComponent(i); //페이지번호
    safeMapQueryParams += 
		'&' + encodeURIComponent('pageUnit') + '=' + encodeURIComponent('100'); //페이지당 유닛의 수
    safeMapQueryParams += 
		'&' + encodeURIComponent('xmlUseYN') + '=' + encodeURIComponent('Y');  //XML사용 여부
	//반복문으로 페이지번호를 넘기면서 모든 정보를 받아옵니다.
	
    fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(safeMapUrl + safeMapQueryParams)}`
    )
        .then((response) => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then((data) => {
            try {
                xmlData = $.parseXML(data.contents);
            } catch (e) {
                throw e;
            }
            var x2js = new X2JS(); //x2js 객체생성
            data = x2js.xml2json(xmlData); 
			// x2js의 xml2json으로 xml데이터 json으로 변경
            for (var j = 0; j < 100; j++) {
                var address = data.document.list.item[j].adres;
				//안전시설의 주소데이터를 받아옵니다.
                if (address.includes('부산')) { //부산이 들어간 주소만 모아줍니다.
                    if (address.includes('경기') == false) {
                        if ( 
                            address.includes('부산업') == false &&
                            address.includes('부산면') == false &&
                            address.includes('부산로') == false
                        ) { //경기도 오산시 부산동같은 다른 지역의 주소를 제외시켜줍니다.
                            if (address.includes(dong)) {//입력 받은 동으로 검색
                                geocoder.addressSearch(address, function (result, status) {
									//geocoder를 이용하여 주소를 좌표로 변환시켜줍니다.
                                    // 정상적으로 검색이 완료됐으면
                                    if (status === kakao.maps.services.Status.OK) {
                                        var coords = new kakao.maps.LatLng(
                                            result[0].y,
                                            result[0].x
                                        );//변환시킨 값을 변수에 저장
                                        var marker = new kakao.maps.Marker({
                                            image: markerImage2,
                                            map: map,
                                            position: coords,
                                        }); //마커로 표시
                                        safeMapMarkers.push(marker); //Markers에 마커추가
                                        marker.setMap(null); //맵에 표시하지 않는 초기설정
                                        bounds1.extend(coords); 
										//bounds에 마커위치를 추가 해 메뉴 클릭시 모든 좌표가 보이게 설정
                                        map.setCenter(new kakao.maps.LatLng(35.13417, 129.11397));
										//지도가 이상한 위치로 가는 것을 방지하기 위한 중심위치 변경
                                    }
                                });
                            }
                        }
                    }
                }
            }
        });
}
//메인 화면에서 안심지도를 클릭했다면
safemap.addEventListener('click', function () {
    if (onoff2 == 0) {    //만약 안심지도 마커가 그려져있지 않다면 그려주기
        clusterer2.addMarkers(safeMapMarkers);
        map.setBounds(bounds1);
        onoff2 = 1;    //마커가 그려져 있다는 표시
    } else {    // 마커가 이미 그려져 있다면 지워주기
        clusterer2.clear();
        onoff2 = 0;    //마커가 그려져 있지않다는 표시
    }
});

//safeRestaurant fetch
fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
        safeRestaurantUrl + safeRestaurantQueryParams
    )}`
)
    .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
    })
    .then((data) => {
        try {
            xmlData = $.parseXML(data.contents);
        } catch (e) {
            throw e;
        }
        var x2js = new X2JS();
        data = x2js.xml2json(xmlData);
		//xml 데이터를 json으로 변경
        for (var i = 0; i < B; i++) {
            var address = data.response.body.items.item[i].addrs;
			//안심식당의 주소를 받아옵니다.
            if (address.includes(gu)) { //데이터가 너무 많으므로 입력받은 구를 이용해 검색
                geocoder.addressSearch(address, function (result, status) {
					//geocoder를 이용해 도로명주소를 좌표와 지번주소로 변환
                    if (result[0].address.address_name.includes(dong)) {
						//지번주소를 이용해 입력받은 동으로 검색
                        if (status === kakao.maps.services.Status.OK) {
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
							//좌표를 이용해 마커 위치를 변수에 저장
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                                image: markerImage,
                            }); //마커 생성

                            safeRestaurantMarkers.push(marker);
							//Markers에 마커 추가
                            marker.setMap(null);
							//지도에 마커를 표시하지 않는 초기설정
                            bounds3.extend(coords);
							//bounds에 마커위치를 추가해 메뉴 클릭 시 모든좌표가 보이게 설정
                        }
                    }
                });
            }
        }
        //메인화면에서 안심식당을 클릭했다면
        eat.addEventListener('click', function () {
            if (onoff4 == 0) {    //마커들이 그려져 있지 않다면 그려주기
                clusterer.addMarkers(safeRestaurantMarkers);
                map.setBounds(bounds3);
                onoff4 = 1;
            } else {    //이미 마커들이 그려져 있다면 안심식당 마커들 지우기
                clusterer.clear();
                onoff4 = 0;
            }
        });
    });


function chart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    //방사형 차트 캔버스 
    var myChart = new Chart(ctx, {
        //차트 선언
        type: 'radar',
        data: {
            labels: [
                '가격',
                '주변 cctv의 수',
                '파출소까지와의 거리',
                '안심센터까지와의 거리',
                '안심식당의 수 ',
            ],
            datasets: [
                {
                    label: '정보',
                    data: data,
                    backgroundColor: ['rgba(142, 203, 221, 0.5)'],
                    borderColor: ['rgba(142, 203, 221)'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}

//반경내 마커개수, 거리 구하기
function counting(center, price) {
    var cctvN = 0;
    var policedist = 0;
    var safeMapdist = 0;
    var safeRestaurantN = 0;
    
    //마커의 좌표를 중심으로 하는 보이지않는 원을 그림
    var circle = new kakao.maps.Circle({
        center: center, // 원의 중심좌표입니다
        radius: Radius, // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
    });
    //원의 경계
    var line = new kakao.maps.Polyline();

    // 반경내 cctv 개수
    cctvMarkers.forEach(function (m) {
        // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정
        var path = [m.getPosition(), center];
        line.setPath(path);

        // 마커와 원의 중심 사이의 거리
        var dist = line.getLength(); // m 단위로 리턴
        //반경내 마커가 있다면 cctvN개수 추가
        if (dist <= Radius) {
            cctvN += 1;
        }
    });
    
    // 반경 내 safeRestaurantMarkers 개수
    safeRestaurantMarkers.forEach(function (m) {
        // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정
        var path = [m.getPosition(), center];
        line.setPath(path);

        // 마커와 원의 중심 사이의 거리
        var dist = line.getLength(); // m 단위로 리턴

        if (dist <= Radius) {
            safeRestaurantN += 1;
        }
    });
    
    // 반경 내 policeMarkers 거리
    policeMarkers.forEach(function (m) {
        var path = [m.getPosition(), center];
        line.setPath(path);

        // 마커와 원의 중심 사이의 거리
        var dist = line.getLength(); // m 단위로 리턴
        if (dist <= Radius) {
            if (policedist == 0) {    //0이면 dist 그대로 저장
                policedist = dist;
            } else if (policedist > dist) { 
                //이전 마커와의 거리보다 현재 마커가 더 가깝다면 거리 갱신
                policedist = dist;
            }
        }
    });

    // 반경 내 safeMapMarkers 거리
    safeMapMarkers.forEach(function (m) {
        var path = [m.getPosition(), center];
        line.setPath(path);

        // 마커와 원의 중심 사이의 거리
        var dist = line.getLength(); // m 단위로 리턴
        if (dist <= Radius) {
            if (safeMapdist == 0) { //0이면 dist 그대로 저장
                safeMapdist = dist;
            } else if (safeMapdist > dist) {
                //이전 마커와의 거리보다 현재 마커가 더 가깝다면 거리 갱신
                safeMapdist = dist;
            }
        }
    });

    return [price, cctvN, policedist, safeMapdist, safeRestaurantN];
}


//거리환산 함수
function calDist(x) {
    if (x != 0) {
        return (Radius - x) / 5;
    } else {
        return 0;
    }
}

function drawChart(ctcd, ctpc) {
    chartData = counting(ctcd, ctpc);
    //console.log(chartData);

    document.getElementById('details').innerHTML = `
	 <ul>
	 <a style="font-size: xx-small";>파출소와 안심지도와의 거리는 ${Radius}m 이상으로 멀면 0으로 나타난다</a>
	 <li>시군구: ${loc}</li>
	 <li>가격: ${ctpc}만원</li>
	 <li>주변 cctv의 수: ${chartData[1]}개</li>
	 <li>파출소까지의 거리: ${chartData[2]}m</li>
	 <li>안심센터까지의 거리: ${chartData[3]}</li>
	 <li>안심식당의 수: ${chartData[4]}개</li>
	 </ul>`;
    //cctv와 안심식당의 개수가 100개가 넘는다면 100점으로 변경
    if (chartData[1]>100)    chartData[1] = 100;
    if (chartData[4]>100)    chartData[1] = 100;
    //거리 100점만점으로 환산 (가까울 수록 100점)
    chartData[2] = calDist(chartData[2]);
    chartData[3] = calDist(chartData[3]);
    chart(chartData);
}


/* 조건에 맞는 건물들 마커로 표시하는 함수 */
var info = []; // 인포윈도우 배열

function closeInfoWindow() {
    for (var idx = 0; idx < info.length; idx++) {
        info[idx].close();
    }
}

function play(addr, index) {
    geocoder.addressSearch(addr, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var marker = new kakao.maps.Marker({
                position: coords,
                image: markerImage5,
                clickable: true, // 마커 클릭 가능
            });
            var iwRemoveable = true; // 닫기 버튼 생성
            var infowindow = new daum.maps.InfoWindow({
                content: home_name[temp1[index]],
                disableAutoPan: true, // 자동으로 패닝하지 않음
                removable: iwRemoveable, // 닫기 버튼
            });
            info.push(infowindow);
            // 마커에 클릭이벤트를 등록합니다s
            kakao.maps.event.addListener(marker, 'click', function () {
                //이전 방사형차트 지우기
                $('#myChart').remove(); // this is my <canvas> element
                //다시 방사형 차트 추가
                $('#chart').append('<canvas id="myChart"><canvas>');
				
                closeInfoWindow(); // 이전 인포윈도우 지우기
                
                //ctcd = 해당마커의 좌표, ctpc = 해당 마커의 가격
                var ctcd = coords;
                var ctpc = avg[temp2[index]];

                if (already == false) {    //처음 방사형차트를 띄운다면
                    setTimeout(function () {    //5초 기다렸다가 띄움
                        drawChart(ctcd, ctpc);
                    }, 5000);
                } else {
                    drawChart(ctcd, ctpc);
                }
                already = true;    //한번 기다렸으므로 true
				
				// 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);
            });
            setMarkers(map); // 마커를 지도에 띄움
            markers.push(marker); // 마커 배열에 해당 마커 추가
        }
    });
}