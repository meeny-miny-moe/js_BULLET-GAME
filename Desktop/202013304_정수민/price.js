/* 시세 정보를 지도에 띄우기 */
$(".housing").click(function () { // 아파트
    select = 1; // 아파트를 선택
    removeMarker(); // 마커 초기화

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "./js/Data/housing.csv",
            dataType: 'text',
            success: function (url) {
                const arr_json = csvToJSON(url);
                var a = 0;
                num = [];

                for (var i = 0; i < arr_json.length; i++) {
                    find_adr[i] = arr_json[i].시군구;
                    adr[i] = arr_json[i].도로명;
                    prices[i] = Number(arr_json[i].월세);
                    rent[i] = arr_json[i].전월세구분;
					home_name[i] = arr_json[i].단지명;
                    addrR[i] = find_adr[i] + adr[i];

					// 사용자가 찾는 지역이면서 월세인 건물 
                    if (find_adr[i] == loc && rent[i] == '월세') { 
                        num[a++] = i;
                    }
                }
                filter(); // 중복된 주소 걸러내기
                addrF.forEach(play); // 지도에 마커 나타내기
            }
        });
    });
});

$(".oneroom").click(function () { // 원룸
    select = 2; // 원룸 선택 
    removeMarker(); // 마커 초기화

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "./js/Data/oneroom.csv", 
            dataType: 'text',
            success: function (url) {
                const arr_json = csvToJSON(url);
                var a = 0;
                num = [];

                for (var i = 0; i < arr_json.length; i++) {
                    find_adr[i] = arr_json[i].시군구;
                    adr[i] = arr_json[i].도로명;
                    prices[i] = Number(arr_json[i].월세);
                    rent[i] = arr_json[i].전월세구분;
					home_name[i] = arr_json[i].건물명;
                    addrR[i] = find_adr[i] + adr[i];

                    if (find_adr[i] == loc && rent[i] == '월세') {
                        num[a++] = i
                    }
                }
                filter(); // 중복된 주소 걸러내기
                addrF.forEach(play); // 지도에 마커 나타내기
            }
        });
    });
});

$(".apartment").click(function () { // 오피스텔
    select = 3; // 오피스텔 선택
    removeMarker(); // 마커 초기화

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "./js/Data/apartment.csv",
            dataType: 'text',
            success: function (url) {
                const arr_json = csvToJSON(url);
                var a = 0;
                num = [];

                for (var i = 0; i < arr_json.length; i++) {
                    find_adr[i] = arr_json[i].시군구;
                    adr[i] = arr_json[i].번지;
                    prices[i] = Number(arr_json[i].월세);
                    rent[i] = arr_json[i].전월세구분;
					home_name[i] = arr_json[i].단지명;
                    addrR[i] = find_adr[i] + adr[i];

                    if (find_adr[i] == loc && rent[i] == '월세') {
                        num[a++] = i;
                    }
                }
                filter(); // 중복된 주소 걸러내기
                addrF.forEach(play); // 지도에 마커 나타내기
            }
        });
    });
});