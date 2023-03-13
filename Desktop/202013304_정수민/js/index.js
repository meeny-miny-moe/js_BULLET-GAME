const busan=["강서구 녹산동","강서구 대저1동","강서구 대저2동","강서구 명지동","강서구 신호동",
			 "강서구 지사동","강서구 화전동","금정구 구서동","금정구 금사동","금정구 남산동",
			 "금정구 부곡동","금정구 서동","금정구 장전동","금정구 청룡동","금정구 회동동",
			 "기장군 교리","기장군 내리","기장군 대라리","기장군 대변리","기장군 동부리",
			 "기장군 서부리","기장군 청강리","기장군 삼성리","기장군 이천리","기장군 달산리",
			 "기장군 매학리","기장군 모전리","기장군 방곡리","기장군 예림리","기장군 용수리",
			 "기장군 고촌리","남구 감만동","남구 대연동","남구 문현동","남구 용당동",
			"남구 용호동","남구 우암동","동구 범일동","동구 수정동","동구 좌천동","동구 초량동",
			 "동래구 낙민동","동래구 명륜동","동래구 명장동","동래구 복천동","동래구 사직동",
			 "동래구 수안동","동래구 안락동", "동래구 온천동","동래구 칠산동","부산진구 가야동",
			 "부산진구 개금동","부산진구 당감동","부산진구 범전동","부산진구 범천동","부산진구 부암동",
			 "부산진구 부전동","부산진구 양정동","부산진구 연지동","부산진구 전포동","부산진구 초읍동",
			 "북구 구포동","북구 금곡동","북구 덕천동","북구 만덕동","북구 화명동","사상구 감전동",
			 "사상구 괘법동","사상구 덕포동","사상구 모라동","사상구 삼락동","사상구 엄궁동","사상구 주례동",
			 "사상구 학장동","사하구 감천동","사하구 괴정동","사하구 구평동","사하구 다대동","사하구 당리동",
			 "사하구 신평동","사하구 장림동","사하구 하단동","서구 남부민동","서구 동대신동1가","서구 동대신동2가",
			 "서구 동대신동3가","서구 부민동1가","서구 부민동3가","서구 부용동1가","서구 서대신동1가","서구 서대신동2가",
			 "서구 서대신동3가","서구 아미동1가","서구 아미동2가","서구 암남동","서구 초장동","서구 충무동2가",
			 "서구 토성동1가","서구 토성동2가","서구 토성동3가","서구 토성동5가","수영구 광안동","수영구 남천동",
			 "수영구 망미동","수영구 민락동","수영구 수영동","연제구 거제동","연제구 연산동","영도구 남항동1가",
			 "영도구 남항동2가","영도구 남항동3가","영도구 대교동1가","영도구 대교동2가","영도구 대평동1가",
			 "영도구 동삼동","영도구 봉래동1가","영도구 봉래동2가","영도구 봉래동3가","영도구 봉래동4가",
			 "영도구 봉래동5가","영도구 영선동2가","영도구 영선동3가","영도구 영선동4가","영도구 청학동",
			 "중구 대창동1가","중구 대청동1가","중구 대청동2가","중구 대청동3가","중구 대청동4가","중구 동광동3가",
			 "중구 동광동5가","중구 보수동1가","중구 보수동2가","중구 보수동3가","중구 부평동2가","중구 부평동4가",
			 "중구 신창동1가","중구 영주동","중구 중앙동4가","중구 중앙동5가","해운대구 반송동","해운대구 반여동",
			 "해운대구 송정동","해운대구 우동","해운대구 재송동","해운대구 좌동","해운대구 중동"];
function search(ele) {
	if (event.key === 'Enter') {
		var data = ele.value;
		if (busan.includes(data)) {
			//console.log('성공');
			window.location.href = 'main.html?' + data; // 페이지 전환 + 데이터 함께 전달
		} else {
			alert('올바른 주소를 입력해주세요 (구, 동(리))');
		}
	}
}