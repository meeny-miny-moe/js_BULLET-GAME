// 시세 정보를 지도에 띄우기
$(".first").click(function () {
    if (select == 2) {
        removeMarker(); // 마커 지우기
		a = 0;
        numT = [], temp2 = []; // 배열 초기화
        for (var i = 0; i < numF.length; i++) {
            if (avg[i] < 30) {
                temp2[a] = i; // 조건에 맞는 avg index 저장
                numT[a++] = numF[i]; // 조건에 맞는 addrF index 저장
            }
        }
        filter2();
        addrT.forEach(play);
    }
});

$(".second").click(function () {
    if (select == 2) {
        removeMarker(); // 마커 지우기
		a = 0;
        numT = [], temp2 = []; // 배열 초기화
        for (var i = 0; i < numF.length; i++) {
            if ( avg[i] >= 30 && avg[i] < 40) {
                temp2[a] = i; // 조건에 맞는 avg index 저장
                numT[a++] = numF[i];
            }
        }
        filter2();
        addrT.forEach(play);
    }
});

$(".third").click(function () {
    if (select == 2) {
        removeMarker(); // 마커 지우기
		a = 0;
        numT = [], temp2 = []; // 배열 초기화
        for (var i = 0; i < num2.length; i++) {
            if (avg[i] >= 40 && avg[i] < 50) {
                temp2[a] = i; // 조건에 맞는 avg index 저장
                numT[a++] = num2[i]; // 조건에 맞는 addrF index 저장
            }
        }
        filter2();
        addrT.forEach(play);
    }
});

$(".fourth").click(function () {
    if (select == 2) {
        removeMarker(); // 마커 지우기
		a = 0;
        numT = [], temp2 = []; // 배열 초기화
        for (var i = 0; i < numF.length; i++) {
            if (avg[i] >= 50 && avg[i] < 60) {
                temp2[a] = i; // 조건에 맞는 avg index 저장
                numT[a++] = numF[i]; // 조건에 맞는 addrF index 저장
            }
        }
        filter2();
        addrT.forEach(play);
    }
});

$(".fifth").click(function () {
    if (select == 2) {
        removeMarker(); // 마커 지우기
		a = 0; 
        numT = [], temp2 = []; // 배열 초기화
        for (var i = 0; i < numF.length; i++) {
            if (avg[i] >= 60) {
                temp2[a] = i; // 조건에 맞는 avg index 저장
                numT[a++] = numF[i]; // 조건에 맞는 addrF index 저장
            }
        }
        filter2();
        addrT.forEach(play);
    }
});
