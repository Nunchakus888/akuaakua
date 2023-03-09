window.onerror = function (message, url, line, column, error) {
    // 将错误信息发送到 Google Analytics
    ga('send', 'event', 'error', message, { msg: error.stack });

    // 阻止浏览器默认错误提示
    return true;
};
