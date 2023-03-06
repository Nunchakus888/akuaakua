# akuaakua

### 首页、支付、webui页面跳转

|序号|功能|链接|备注|
|----|----|----|----|
|0|暂定首页/webui的域名|https://webui.makamaka.io/|dev：https://devui.makamaka.io/|
|1|首页路径|https://webui.makamaka.io/payment/|path为payment
|2|支付成功跳转|https://webui.makamaka.io/payment/success/tokenstring/| 如有token，不论成功与否 都需要 suffix token 串到path如当前格式|
|2|支付失败跳转|https://webui.makamaka.io/payment/fail/tokenstring/| 如有token，不论成功与否 都需要 suffix token 串到path如当前格式|
|3|点击实例地址跳转到webui|https://webui.makamaka.io/users/dynamic_path/ |dynamic_path 由服务端决定随机生成|
|4|webui充值/续费|支付完成跳转链接同2|用户可选返回原页面/关闭当前页面|



### web技术实现
1. /payment/ 首页支付重定向到支付页 
2. 支付成功返回到 payment/success/tokenstring； 
3. 根据 tokenstring 显示对应状态，手动跳转webui链接； 
4. webui iframe内嵌 /iframe/ 页面 
5. /iframe/ 根据webui url为参数轮询倒计时，控制弹窗，banner 
6. /iframe/ 支付续费新开tab，充值完成同 step 2
7. webui / iframe 实时通信，实现倒计时、轮询、开关等操作；
