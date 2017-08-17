var GetScreenCoordinates = function (obj) {
    var p = {};
    p.x = obj.offsetLeft;
    p.y = obj.offsetTop;
    
    while (obj.offsetParent) {
        p.x = p.x + obj.offsetParent.offsetLeft;
        p.y = p.y + obj.offsetParent.offsetTop;
        
        if (obj == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            obj = obj.offsetParent;
        }
    }
    return p;
}

var ClickLike = function () {
    var needLike = $('.coreSpriteHeartOpen');
    if (needLike)
    {
        document.body.scrollTop = GetScreenCoordinates(needLike).y - window.innerHeight + needLike.scrollHeight + $('._4pxed').scrollHeight
;
        setTimeout(function () {
            needLike.click();
        }, 100);        
    }
    else
    {
        console.log('No content to like anymore');
    }
}

var PAGE_LOAD_DELAY = 1000;
var MAX_ITERATION = 50;

var _iteration = 0;
var _pageLoadingCount = 0;
var _autoGoToBottomTimer;
var _pageLoadComplete = false;
var _currentScrollSize = 0;

var AutoPageLoad = function () {

  _autoGoToBottomTimer = setInterval(function () {
  
    if (_iteration >= MAX_ITERATION)
    {
      clearInterval(_autoGoToBottomTimer);
      _pageLoadComplete = true;            
      console.log('Page Load Complete');
    }
    else
    {
        if (document.body.scrollHeight > _currentScrollSize)
        {
            _pageLoadingCount = 0;
            _iteration++;
            _currentScrollSize = document.body.scrollHeight;
            document.body.scrollTop = document.body.scrollHeight;
            console.log('Page Loaded Count - ' + _iteration);
        }
        else
        {
            console.log('Page Loading...');

            _pageLoadingCount++;  

            if (_pageLoadingCount > 100)
            {
                clearInterval(_autoGoToBottomTimer);
                console.log('Page Loading Error. Please retry');
            }
        }
    }

  }, PAGE_LOAD_DELAY);
}
