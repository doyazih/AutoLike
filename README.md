# AutoLike
This is auto like process for following feed of Instagram


## How to use

### Step 1 크롬으로 인스타그램 접속 및 로그인
크롬 브라우저로 인스타그램 메인 Feed 화면으로 접속  
로그인 상태에서 https://www.instagram.com 으로 접속하면 메인 Feed 화면 나타남

### Step 2 크롬 디버그모드 콘솔창 열기
F12 누르면 개발자 디버그 모드창이 활성화 되고 Cosole탭을 선택  
(Device Toolbar에서 모바일기기로 선택하면 속도가 더 빠를 수 있음)
![chrome debug mode console](https://lh3.googleusercontent.com/cRGMOXOQ6aSZYZXFObuxCVC9HVgCBUcoKSi3DcDusXsG-NVzIZr_VYsHMCpIIWgTuM3X0JkMMZu11ccO8Kz8qXpZ0kDgMwVJebfL75kl2synpQvc00DywiF60xVMHoh6-BVGOwTqXA=w879-h172-no)

### Step 3 Code 초기화
[init.js](https://github.com/doyazih/AutoLike/blob/master/init.js "init code") 코드를 복사 후 console 입력창에 붙혀넣기
그리고 아래 설정값을 변경 후 Enter

설정명 | 설명 | 기본값
----- | ----- | -----
PAGE_LOAD_DELAY | 페이지를 하단으로 Scroll하는 반복 작업의 주기(ms).  *보통 Intagram에서 새로 로딩되는 페이지에는 12건씩 Feed가 포함되므로 **Click주기 x 12** 로 설정해주면 됨* | 30000 (30초)
MAX_ITERATION | 페이지를 하단으로 Scroll하는 반복 작업의 최대 횟수 | 50
  

[init.js](https://github.com/doyazih/AutoLike/blob/master/init.js "init code")
```
var PAGE_LOAD_DELAY = 30000;
var MAX_ITERATION = 50;

var _iteration = 0;
var _pageLoadingCount = 0;
var _autoGoToBottomTimer;
var _pageLoadComplete = false;

var ClickLike = function () {
    var needLike = $('.coreSpriteHeartOpen');
    if (needLike)
    {
        needLike.click();
    }
}

var AutoGoToBottom = function () {

  _autoGoToBottomTimer = setInterval(function () {
  
    if (_iteration >= MAX_ITERATION)
    {
      clearInterval(_autoGoToBottomTimer);
      _pageLoadComplete = true;            
      console.log('Page Load Complete');
    }
    else
    {
      if (document.body.scrollHeight == window.innerHeight + document.body.scrollTop)
      {
        console.log('Page Loading...');

        _pageLoadingCount++;

        if (_pageLoadingCount > 100)
        {
          clearInterval(_autoGoToBottomTimer);
          console.log('Page Loading Error');
        }
      }
      else{
        _pageLoadingCount = 0;
        _iteration++;
        document.body.scrollTop = document.body.scrollHeight;
        console.log('Page Loaded Count - ' + _iteration);
      }
    }

  }, PAGE_LOAD_DELAY);
}

AutoGoToBottom();
```

### Step 4 ClickLike 명령 실행
콘솔 입력창에서 ***ClickLike();*** 라고 입력 후 Enter

### Step 5 Macro 실행
아래 설정으로 Macro 실행 후 키보드 입력 커서를 Console 입력 창으로 변경  
Macro에서 콘솔창의 마지막에 입력 된 ***ClickLike();*** 명령을 반복적으로 재실행하며 Like 처리

![macrosetting](https://lh3.googleusercontent.com/uKQ3HnE66ygSeuGHEEDswnZrasMEhs7ghUm-MDO_3NKcXg2768kPtn9EfSdNDwxr8sB6Y8xlj1J122SO7SRAd35dBVRgNn44N5DNJnGvJIcMU0RwtR_FWWuxAO9eo0ag8suxbdtRNQ=w449-h478-no "macro setting")


