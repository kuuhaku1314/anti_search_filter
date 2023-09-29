chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // 需要过滤的用户名
        let block_user = [
            "cirosantilli",
            "cheezcharmer",
            "zaohmeing",
            "zhaohmng-outlook-com",
            "codin-stuffs",
            "Dimples1337",
            "pxvr-official",
            "zpc1314521",
            "b0LBwZ7r5HOeh6CBMuQIhVu3-s-random-fork",
        ]
        // 检查请求是否匹配 https://github.com/search?q
        if (details.url.startsWith("https://github.com/search?q=")) {
            // 获取查询参数的值
            let url = new URL(details.url);
            let searchValue = url.searchParams.get("q");
            // 修改查询参数的值
            let params = block_user.map((user) => {
                    return "-user:" + user;
                }
            )
            searchValue = searchValue.replace(" " + params.join(" "), "")
            url.searchParams.set("q", searchValue + " " + params.join(" "));
            let new_url = url.toString();
            console.log(new_url)
            return {redirectUrl: new_url};
        }

        // 如果不需要修改请求，返回原始请求
        return {cancel: false};
    },
    {
        urls: ["https://github.com/search*"],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
