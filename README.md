# neat_script
step 0
https://nodejs.cn/download/ or https://nodejs.org/en
Download, install, and execute the command; if the correct version is displayed, the installation is successful.
node -v
npm -v

step 1
npm install near-api-js

step 2
node near.js

----------------------------------------------

第一步是安装 nodejs 环境，如果有那就跳过
https://nodejs.cn/download/ or https://nodejs.org/en

第二步 就是安装 near-api-js 包
npm install near-api-js

第三步 就是配置你要打铭文的 钱包和对应的私钥，还有代码默认配置的 rpc 节点是公开节点，使用上大概1-2分钟打一个，我个人推荐 https://account.getblock.io/sign-in?ref=NzMyNmJmNzQtMTg5MC01NTAxLWE2ZDctODM4YTEwZGJiZmU4 
这个链接注册每天送4w个免费请求 大概够1个地址用11个小时的，可以注册多个白嫖，注册后在dashboard 页面获取 endpoints 配置到脚本里面

第四部就是在这个目录页面 打开控制台 输入 node near.js
来运行脚本