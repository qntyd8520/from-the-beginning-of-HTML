$(function() {
    // 로딩이미지를 표시하기 위한 div를 jquery로 추가하기
    var loader = $("<div>").addClass("ajax-loader");
    loader.hide();
    $("body").prepend(loader);

    $.ajaxSetup({
        /** ajax 기본 옵션 **/
        cache: false, // 캐쉬 사용금지처리
        dataType: 'json', // 읽어옹 내용 형식 (html, xml, json)
        timeout: 30000, // 타임아웃 (30ch)

        // 통신 시작전 실행할 기능 (ex : 로딩바 표시)
        beforeSend: function() {
            // 현재 통신중인 대상 페이지를 고르고 출력함
            console.log(">> Ajax 통신 시작 >> " + this.url);
            loader.show();
        },
        // 통신 실패시 호출될 함수 ( 파라미터는 에러내용 )
        error: function(error) {
            // 404 -> Page Not Found
            // 500번대 -> Server Error(웝 프로그램 에러)
            // 200, 0 -> 내용의 형식 에러 (JSON, XML)
            console.log(">> 에러!!!! >> " + error.status);

            var error_msg = "[" + error.status + "]" + error.statusText;

            var code = parseInt(error.status / 100);
            if (code == 4) { // 400번대의 에러인 경우
                error_msg = "잘못된 요청입니다.\n" + error_msg;
            } else if (code == 5) {
                error_msg = "서버의 응답이 없습니다.\n" + error_msg;
            } else if (code == 2 || code == 0) {
                error_msg = "서버의 응답이 잘못되었습니다.\n" + error_msg;
            }

            alert(error_msg);
        },
        // 성공, 실패와 상관없이 맨 마지막에 무조건 호출됨 (ex: 로딩바 닫기)
        complete: function() {
            console.log(">> Ajax 통신 종료!!!!");
            loader.hide();
        }
    });

})