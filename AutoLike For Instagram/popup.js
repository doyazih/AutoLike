

var _currentProgressDotIdx = 0;
var _progressDots = ['', '.', '..', '...'];
var isOnAutoLoadPage = false;
var isOnAutoClickLike = false;

var GetProgressDots = function () {
    
    var result = _progressDots[_currentProgressDotIdx];
    
    _currentProgressDotIdx++;

    if (_currentProgressDotIdx >= _progressDots.length)
    {
        _currentProgressDotIdx = 0;
    }   
    

    return result;
}

function LoadMoreContents() {

    chrome.tabs.executeScript(null, {
        code: "LoadPage();"
    });
}

function StartAutoLoadPage() {

    document.getElementById('btnLoadMorePage').setAttribute("style", "display:none;");
    document.getElementById('btnAutoLoadStart').setAttribute("style", "display:none;");
    document.getElementById('btnAutoLoadStop').setAttribute("style", "");
    chrome.tabs.executeScript(null, {
        code: "AutoLoadPage();"
    });
}

function StopAutoLoadPage() {

    document.getElementById('btnLoadMorePage').setAttribute("style", "");
    document.getElementById('btnAutoLoadStart').setAttribute("style", "");
    document.getElementById('btnAutoLoadStop').setAttribute("style", "display:none;");
    chrome.tabs.executeScript(null, {
        code: "StopAutoLoadPage();"
    });
}

function StartAutoClickLike() {

    document.getElementById('btnAutoLikeStart').setAttribute("style", "display:none;");
    document.getElementById('btnAutoLikeStop').setAttribute("style", "");
    chrome.tabs.executeScript(null, {
        code: "AutoClickLike();"
    });
}

function StopAutoClickLike() {

    document.getElementById('btnAutoLikeStart').setAttribute("style", "");
    document.getElementById('btnAutoLikeStop').setAttribute("style", "display:none;");
    chrome.tabs.executeScript(null, {
        code: "StopAutoClickLike();"
    });
}

chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "SendStatus") {
        document.getElementById('txtPages').innerText = request.source.loadedPagesCount;
        document.getElementById('txtContents').innerText = request.source.loadedContentsCount;
        document.getElementById('txtLikes').innerText = request.source.likesCount;
        document.getElementById('txtUnlikes').innerText = request.source.unlikesCount;
        

        if (request.source.isOnAutoPageLoader) {
            document.getElementById('btnLoadMorePage').setAttribute("style", "display:none;");
            document.getElementById('btnAutoLoadStart').setAttribute("style", "display:none;");
            document.getElementById('btnAutoLoadStop').setAttribute("style", "");
        }
        else{
            document.getElementById('btnLoadMorePage').setAttribute("style", "");
            document.getElementById('btnAutoLoadStart').setAttribute("style", "");
            document.getElementById('btnAutoLoadStop').setAttribute("style", "display:none;");            
        }

        if (request.source.isOnAutoLikeClicker) {
            document.getElementById('btnAutoLikeStart').setAttribute("style", "display:none;");
            document.getElementById('btnAutoLikeStop').setAttribute("style", "");
        }
        else{
            document.getElementById('btnAutoLikeStart').setAttribute("style", "");
            document.getElementById('btnAutoLikeStop').setAttribute("style", "display:none;");            
        }
    }
});

function onWindowLoad() {

    chrome.tabs.executeScript(
        null, 
        {
            file: "core.js"
        }, 
        function() {
            if (chrome.extension.lastError) {
                document.body.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
            }
        }
    );

    var date = new Date();
    var now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
    document.getElementById('txtStartDate').innerText = 'start date : ' + now;
    


    document.getElementById('btnLoadMorePage').addEventListener('click', LoadMoreContents);
    document.getElementById('btnAutoLoadStart').addEventListener('click', StartAutoLoadPage);
    document.getElementById('btnAutoLoadStop').addEventListener('click', StopAutoLoadPage);
    document.getElementById('btnAutoLikeStart').addEventListener('click', StartAutoClickLike);
    document.getElementById('btnAutoLikeStop').addEventListener('click', StopAutoClickLike);
}

window.onload = onWindowLoad;