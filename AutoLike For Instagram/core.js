var _isInitAutoLike;

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

function GetParentByTagName(node, tagname) {
	var parent;
	if (node === null || tagname === '') return;
	parent  = node.parentNode;
	tagname = tagname.toUpperCase();

	while (parent.tagName !== "HTML") {
		if (parent.tagName === tagname) {
			return parent;
		}
		parent = parent.parentNode;
	}

	return parent;
}

var ClickLike = function () {
    
    var needLike = document.getElementsByClassName('coreSpriteHeartOpen')[0];
    
    
    if (needLike)
    {
        document.body.scrollTop = GetScreenCoordinates(GetParentByTagName(needLike, "article")).y;
        setTimeout(function () {
            needLike.click();
        }, 1000);
    }
    else
    {
        chrome.extension.sendMessage({
            action: "clickedLike",
            source: {
                success: false,
                message: 'No content to like anymore'
            }
        });
    }
}

var _autoLikeClicker;
var AutoClickLike = function () {

    _autoLikeClicker = setInterval(function () {
        ClickLike();
    }, 2000);
};

var StopAutoClickLike = function () {
    clearInterval(_autoLikeClicker);
    _autoLikeClicker = null;
}

var LoadPage = function () {

    document.body.scrollTop = document.body.scrollHeight;
}

var AUTO_LOAD_PAGE_MAX_ITERATION = 300;
var AUTO_LOAD_PAGE_DELAY_TIME = 3000;
var _currentScrollSize = 0;
var _currentPageLoadingDelayCount = 0;
var _autoPageLoader;
var _autoPageLoadedIteration = 0;

var AutoLoadPage = function () {

    _autoPageLoader = setInterval(function () {

        if (_autoPageLoadedIteration >= AUTO_LOAD_PAGE_MAX_ITERATION)
        {
            clearInterval(_autoPageLoader); 
            console.log('Page Load Complete');
        }
        else
        {
            if (document.body.scrollHeight > _currentScrollSize)
            {
                _pageLoadingDelayCount = 0;
                _autoPageLoadedIteration++;
                _currentScrollSize = document.body.scrollHeight;
                document.body.scrollTop = document.body.scrollHeight;
                console.log('Page Loaded Count - ' + _autoPageLoadedIteration);
            }
            else
            {
                console.log('Page Loading...');

                _currentPageLoadingDelayCount++;  

                if (_currentPageLoadingDelayCount > 100)
                {
                    clearInterval(_autoPageLoader);
                    console.log('Page Loading Error. Please retry');
                }
            }

        }

    }, AUTO_LOAD_PAGE_DELAY_TIME);
}

var StopAutoLoadPage = function () {
    clearInterval(_autoPageLoader);
    _autoPageLoader = null;
}

var SendStatus = function () {
                
    chrome.extension.sendMessage({
        action: "SendStatus",
        source: {
            isOnAutoPageLoader: _autoPageLoader ? true : false,
            isOnAutoLikeClicker: _autoLikeClicker ? true : false,
            loadedPagesCount: document.getElementsByTagName('article').length / 12,
            loadedContentsCount: document.getElementsByTagName('article').length,
            likesCount: document.getElementsByClassName('coreSpriteHeartFull').length,
            unlikesCount: document.getElementsByClassName('coreSpriteHeartOpen').length
        }
    });
}


if (!_isInitAutoLike)
{
    _isInitAutoLike = true;
    
    setInterval(function () {
        SendStatus();
    }, 500);
}