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
