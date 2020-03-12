web 性能优化

- 看缓存。

- 减少域名以 DNS 查询。

- 建立 TCP 连接：连接复用，开启 keep-alive；开启 HTTP/2.0 可以使用多路复用。

- 发送 HTTP 请求：减小 cookie 体积；CDN 没有 cookie ，所以也就减少 cookie 体积的效果；做缓存，在一段时间内不用发请求；增加域名，提高请求并发数量，如从 4 个到 8 个；

- 接收响应：使用 ETAG，可能就不用下载资源了——如果已有的资源是最新的，服务器返回 304 ，告诉浏览器使用已有的资源就行；使用 GZip 压缩、解压缩。

- 把 DOCTYPE 写对。

- 减少标签。

- 使用 CDN，增加并发下载数量，让内容下载更快；CSS 放前面，放 head 里面；js 尽量放在后面，优点是尽量显示页面、获取节点。

- CSS 放 head 里面，尽早下载 css 。因为即便放后面也会阻塞。在 Chrome 里，css 没下载完是不会渲染页面的。在 IE 里即便没有css也会直接渲染页面。js 放后面的原因是，就算没有 js 页面也可以看，要尽早显示页面。js 放后面的另一个优点是，可以获取节点。如果 HTML 没渲染，那就没有标签节点啊。

补充：

- 减少要请求的文件数量，请求数量就减少了。如，合并 js css 都能减少请求数。

- 雪碧图。这个了解一下就行了。就是把所有图片拼成一个，显示的时候显示局部。

- Inline images 使用 data: url scheme 来内连图片，就是把图片变成字符串。

- 延迟加载，也就是懒加载。这是个鸡贼的方案。在用户看第一屏的时候，我偷偷地加载后面的。甚至用户不滚动，我都不下载后面的。这个是需要写代码来做的。这样就省流量了，省钱。JS 是理想的延迟加载候选者。

- 加一个 loading 动画。用户感觉很快。

- 预加载。把下一页的内容提前加载了，用户就觉得很快。

- 将 css js 分到不同域名，域名增多了，可以增多并行下载数。

- 加 cache-control，一段时间内不用下载了。

- 不写空src的图片。<img src=""> 这就是空 src 图片。你可以这样写：<img src="about:blank">

- 减小 cookie 体积。

面试题：你如何判断一个网站是否优化好？

打开 chrome 开发者工具，最后一个 Audits , 点击上面的蓝色按钮，等，等它运行完了就会告诉你这个网站违反了雅虎军规的哪些条，然后你照着优化就行了。

补充：什么是事件委托？
```
// HTML
<ul>
    <li>1</li>
    <li>1</li>
    <li>1</li>
    <li>1</li>
</ul>

// JS 
let ul = document.querySelector('ul')
ul.onclick = (e) => {
    if(e.target.tagName === 'LI'){
        console.log(e.target.innderText)
    }
}

这样的代码，只有一个监听器。这就是事件委托。

对比另一种写法是：
let liList = docuemnt.querySelectorAll('li')
li[0].onclick = function (){ console.log(1)}
li[1].onclick = function (){ console.log(1)}
li[2].onclick = function (){ console.log(1)}
li[3].onclick = function (){ console.log(1)}
```
