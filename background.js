
window.vipdlt_Cookie = "";

var cookie_str;

window.hook_setInterval_content_script = setInterval(function () {
    try {
        var arr = new Array();
        //获取cookie
        chrome.cookies.getAll({ domain: "ctrip.com" }, function (cookielist) {
            //重构Cookie
            cookielist.forEach(function (cookie, index) {
                var newcookie = { domain: cookie.domain, name: cookie.name, path: cookie.path, value: cookie.value };
                arr.push(newcookie);
            });
            cookie_str = JSON.stringify(arr);
            console.log(cookie_str)
            $.ajax({
                type: "POST",
                async: false,
                contentType: "application/json",
                url: "http://localhost:28456/Cookie/GetCookie",
                data: cookie_str,
                success: function (data) {
                    console.log(data)
                }
            });
        });
    } catch (e) {
        console.log(e);
    }
}, 1000 * 10);

//background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    //do something    
    sendResponse(response);
    return true;
});
