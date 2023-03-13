/* 변수 */
var select; // 가격바에서 건물 유형(원룸, 아파트, 오피스텔) 선택
var markers = [];

var find_adr = []; //시군구
var adr = []; // 도로명 or 번지
var addrR = []; // 상세주소
var prices = []; // 가격(월세(만원))
var rent = []; //전월세여부
var home_name = []; // 아파트 이름

var addrF = [], addrT = []; 
var num = [], numF = [], numT = [];
var avg = [];
let temp1 = [], temp2 = [];

/* 지도 생성 */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
	mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 5, // 지도의 확대 레벨
	};

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

/* 집 마커 이미지 */
var imageSrc5 = './images/home.png';
var imageSize5 = new kakao.maps.Size(20, 25);
var markerImage5 = new kakao.maps.MarkerImage(imageSrc5, imageSize5);

/* 검색창에서 입력받은 데이터 가져오기 */
const receivedData = location.href.split('?')[1];
// 전달받은 데이터가 한글일 경우
var data = decodeURI(receivedData);

/* 주소 데이터를 좌표로 변환 */

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();
var loc; // 입력받은 주소 데이터를 법정동으로 변환하기 위한 변수
// 주소로 좌표를 검색
geocoder.addressSearch(data, function (result, status) {
	// 정상적으로 검색이 완료됐으면
	if (status === kakao.maps.services.Status.OK) {
		var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		map.setCenter(coords); // 지도의 중심을 결과값으로 받은 위치로 이동
		searchAddrFromCoords(map.getCenter(), search); // 법정동 주소로 변환
	}
	function searchAddrFromCoords(coords, callback) {
		// 좌표로 법정동 주소 정보를 요청
		geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
	}
	function search(result, status) {
		// searchAddrFromCoords의 callback 함수
		if (status === kakao.maps.services.Status.OK) {
			for (var i = 0; i < result.length; i++) {
				// 법정동의 region_type 값은 'B' 
				if (result[i].region_type === 'B') {
					loc = result[i].address_name;
					break;
				}
			}
		}
	}
});

/* csv 데이터를 json으로 변환시켜주는 함수 */
function csvToJSON(csv_string) {
	// 문자열을 줄바꿈으로 구분 => 배열에 저장
	const rows = csv_string.split('\r\n');
	// 빈 배열 생성: CSV의 각 행을 담을 JSON 객체
	const jsonArray = [];
	// 제목 행 추출 후, 콤마로 구분 => 배열에 저장
	const header = rows[0].split(',');
	// 내용 행 전체를 객체로 만들어, jsonArray에 담기
	for (var i = 1; i < rows.length; i++) {
		// 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체
		var obj = {};
		// 각 내용 행을 콤마로 구분
		var row = rows[i].split(',');
		// 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
		for (var j = 0; j < header.length; j++) {
			obj[header[j]] = row[j];
		}
		// 각 내용 행의 객체를 jsonArray배열에 담기
		jsonArray.push(obj);
	}
	// 5. 완성된 JSON 객체 배열 반환
	return jsonArray;
}

/* 가격 데이터에서 주소가 같은 데이터들을 하나만 저장하기 */
function filter() {
	var sum, length = 1; //sum: 월세 합, length: 길이
    avg = [], addrF = [], temp1 = []; // 배열 초기화
    var e = 1; // 인덱스 초기화
    var f = 0; // 인덱스 초기화
    addrF[0] = addrR[num[0]];
    numF[0] = num[0];
    sum = prices[num[0]];
	
    for (var i = 1; i < num.length; i++) { 
        if (addrR[num[i - 1]] != addrR[num[i]]) { 
            addrF[e] = addrR[num[i]]; // 중복 주소 거르기
            numF[e] = num[i]; // num[i]의 인덱스 값을 넣어주기
            avg[f] = (sum / length); // 월세 평균 구하기
			temp1[e++] = num[i];
			temp2[f] = f++;
            sum = prices[num[i]]; // sum 리셋
            length = 1; // 길이 리셋
        }
        else {
            sum += prices[num[i]];
            length++;
        }
    }
}

function filter2() {
	addrT = []; //배열 초기화
    for(var i =0; i<numT.length; i++) {
		temp1[i] = numT[i]; // 배열의 index 값 저장
        addrT[i] = addrR[numT[i]]; // 해당 index의 주소 저장
    }
} 

// 배열에 추가된 마커들을 지도에 표시
function setMarkers(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// 이전 마커들 지우기
function removeMarker() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = []; // 마커 배열 초기화
}