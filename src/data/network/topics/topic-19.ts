export const topic_19 = {
  title: "HTTP/HTTPS协议",
  description: "HTTP请求方法、状态码、HTTPS工作原理、HTTP/2与HTTP/3",
  content: `# HTTP/HTTPS协议

<Glossary terms="%5B%7B%22term%22%3A%22HTTP%22%2C%22definition%22%3A%22%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8EWeb%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B9%8B%E9%97%B4%E4%BC%A0%E8%BE%93%E7%BD%91%E9%A1%B5%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%22HTTPS%22%2C%22definition%22%3A%22%E5%AE%89%E5%85%A8%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE%EF%BC%8C%E5%9C%A8HTTP%E5%9F%BA%E7%A1%80%E4%B8%8A%E5%8A%A0%E5%85%A5TLS%E5%8A%A0%E5%AF%86%22%7D%2C%7B%22term%22%3A%22GET%22%2C%22definition%22%3A%22HTTP%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95%EF%BC%8C%E7%94%A8%E4%BA%8E%E8%8E%B7%E5%8F%96%E8%B5%84%E6%BA%90%22%7D%2C%7B%22term%22%3A%22POST%22%2C%22definition%22%3A%22HTTP%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95%EF%BC%8C%E7%94%A8%E4%BA%8E%E6%8F%90%E4%BA%A4%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%22%E7%8A%B6%E6%80%81%E7%A0%81%22%2C%22definition%22%3A%22HTTP%E5%93%8D%E5%BA%94%E4%B8%AD%E8%A1%A8%E7%A4%BA%E8%AF%B7%E6%B1%82%E7%BB%93%E6%9E%9C%E7%9A%84%E4%B8%89%E4%BD%8D%E6%95%B0%E5%AD%97%E4%BB%A3%E7%A0%81%22%7D%2C%7B%22term%22%3A%22TLS%22%2C%22definition%22%3A%22%E4%BC%A0%E8%BE%93%E5%B1%82%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%B8%BAHTTPS%E6%8F%90%E4%BE%9B%E5%8A%A0%E5%AF%86%E5%92%8C%E8%BA%AB%E4%BB%BD%E9%AA%8C%E8%AF%81%22%7D%2C%7B%22term%22%3A%22HTTP%2F2%22%2C%22definition%22%3A%22HTTP%E5%8D%8F%E8%AE%AE%E7%9A%84%E7%AC%AC%E4%BA%8C%E4%B8%AA%E4%B8%BB%E8%A6%81%E7%89%88%E6%9C%AC%EF%BC%8C%E6%94%AF%E6%8C%81%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8%E5%92%8C%E5%A4%B4%E9%83%A8%E5%8E%8B%E7%BC%A9%22%7D%2C%7B%22term%22%3A%22HTTP%2F3%22%2C%22definition%22%3A%22HTTP%E5%8D%8F%E8%AE%AE%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E4%B8%BB%E8%A6%81%E7%89%88%E6%9C%AC%EF%BC%8C%E5%9F%BA%E4%BA%8EQUIC%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%BD%BF%E7%94%A8UDP%E4%BC%A0%E8%BE%93%22%7D%5D" />

## 引入：Web的基础协议

当你打开浏览器访问一个网站时，浏览器和服务器之间是如何通信的？网页、图片、CSS样式表、JavaScript脚本这些资源是如何从服务器传送到你的电脑上的？

HTTP（HyperText Transfer Protocol，超文本传输协议）就是支撑万维网（World Wide Web）的基础协议。它定义了浏览器（客户端）和服务器之间如何交换数据。你每天浏览网页、观看视频、使用Web应用，都在使用HTTP协议。

## HTTP的工作原理

HTTP是一个请求-响应协议。客户端（通常是浏览器）发送一个请求，服务器返回一个响应。每个请求-响应对都是独立的——HTTP是无状态的协议，服务器不会记住之前的请求。

一个HTTP请求包含：
- 请求行：包含请求方法、URL和HTTP版本。例如：GET /index.html HTTP/1.1
- 请求头：包含各种元信息，如Host、User-Agent、Accept等
- 空行：分隔头部和正文
- 请求体：可选，POST请求通常包含要提交的数据

一个HTTP响应包含：
- 状态行：包含HTTP版本、状态码和状态描述。例如：HTTP/1.1 200 OK
- 响应头：包含Content-Type、Content-Length等信息
- 空行：分隔头部和正文
- 响应体：服务器返回的数据（HTML页面、图片、JSON等）

## HTTP请求方法

HTTP定义了多种请求方法，最常用的有：

GET：获取资源。这是最常见的方法，用于获取网页、图片等资源。GET请求的参数放在URL中（查询字符串）。

POST：提交数据。用于向服务器提交表单数据、上传文件等。POST请求的数据放在请求体中。

PUT：更新资源。用于更新服务器上的资源。如果资源不存在，可以创建新的资源。

DELETE：删除资源。用于删除服务器上的资源。

PATCH：部分更新资源。与PUT不同，PATCH只更新资源的部分内容。

HEAD：与GET类似，但只返回响应头，不返回响应体。用于获取资源的元信息。

OPTIONS：获取服务器支持的请求方法。常用于CORS（跨域资源共享）预检请求。

## HTTP状态码

HTTP状态码是一个三位数字，表示请求的结果。状态码分为五类：

1xx（信息性）：表示请求已被接收，继续处理。
- 100 Continue：服务器已收到请求头，客户端可以继续发送请求体。

2xx（成功）：表示请求已成功处理。
- 200 OK：请求成功。
- 201 Created：资源创建成功（常用于POST请求）。
- 204 No Content：请求成功，但没有返回内容。

3xx（重定向）：表示需要进一步操作才能完成请求。
- 301 Moved Permanently：资源已永久移动到新位置。
- 302 Found：资源临时移动到新位置。
- 304 Not Modified：资源未修改，可以使用缓存。

4xx（客户端错误）：表示请求有误。
- 400 Bad Request：请求格式错误。
- 401 Unauthorized：需要身份验证。
- 403 Forbidden：服务器拒绝请求。
- 404 Not Found：资源不存在。
- 405 Method Not Allowed：请求方法不被允许。

5xx（服务器错误）：表示服务器处理请求时出错。
- 500 Internal Server Error：服务器内部错误。
- 502 Bad Gateway：网关错误。
- 503 Service Unavailable：服务不可用。

## HTTP头部字段

HTTP头部字段用于传递请求和响应的附加信息。常见的头部字段包括：

通用头部：
- Date：消息发送的日期和时间
- Connection：连接管理（keep-alive表示保持连接）
- Cache-Control：缓存控制策略

请求头部：
- Host：目标主机名（HTTP/1.1必须）
- User-Agent：客户端软件信息
- Accept：客户端可接受的内容类型
- Cookie：客户端存储的Cookie

响应头部：
- Content-Type：响应内容的类型（如text/html、application/json）
- Content-Length：响应内容的长度
- Set-Server：设置Cookie
- Server：服务器软件信息

## HTTPS工作原理

HTTP是明文传输的，这意味着数据在传输过程中可能被窃听或篡改。HTTPS（HTTP Secure）通过在HTTP和TCP之间加入TLS（Transport Layer Security，传输层安全）协议来解决这个问题。

HTTPS提供的安全保证：
- 加密：数据在传输过程中被加密，防止被窃听。
- 身份验证：通过数字证书验证服务器的身份，防止中间人攻击。
- 完整性：数据在传输过程中不能被篡改。

TLS握手过程：
1. 客户端发送Client Hello，包含支持的TLS版本和加密套件列表
2. 服务器回复Server Hello，选择加密套件，并发送数字证书
3. 客户端验证证书的有效性（是否由受信任的CA签发、是否过期、域名是否匹配）
4. 客户端生成随机数，用服务器的公钥加密后发送
5. 双方使用这个随机数生成会话密钥
6. 后续通信使用对称加密（会话密钥）进行，因为对称加密比非对称加密快得多

## HTTP/2

HTTP/1.1存在一些性能问题：
- 队头阻塞：同一个连接上的请求必须按顺序处理，前面的请求会阻塞后面的请求。
- 每个域名限制6个连接：浏览器对同一个域名最多建立6个TCP连接。
- 头部重复传输：每个请求都携带完整的头部信息，浪费带宽。

HTTP/2的主要改进：
- 多路复用：在同一个TCP连接上可以同时传输多个请求和响应，解决了队头阻塞问题。
- 头部压缩：使用HPACK算法压缩头部，减少传输的数据量。
- 服务器推送：服务器可以主动向客户端推送资源，而不必等待客户端请求。
- 二进制分帧：将数据分成更小的二进制帧进行传输，提高解析效率。

## HTTP/3

HTTP/2虽然解决了应用层的队头阻塞，但TCP层的队头阻塞仍然存在——如果一个TCP包丢失了，所有流都会被阻塞。HTTP/3通过使用QUIC协议（基于UDP）来解决这个问题。

HTTP/3的主要改进：
- 基于UDP：使用QUIC协议代替TCP，避免了TCP的队头阻塞。
- 0-RTT连接建立：对于之前访问过的服务器，可以在第一个请求中就携带数据，实现零延迟连接。
- 内置加密：QUIC协议内置了TLS 1.3，不再需要单独的TLS握手。
- 连接迁移：当网络切换时（如从Wi-Fi切换到4G），连接可以保持不中断。

## 总结

HTTP是Web的基础协议，定义了浏览器和服务器之间的通信规则。HTTPS通过TLS加密保证了通信安全。HTTP/2通过多路复用和头部压缩提高了性能。HTTP/3基于QUIC协议，进一步解决了队头阻塞和连接建立延迟的问题。

理解HTTP协议对于Web开发和网络运维都至关重要。无论是排查网页加载缓慢的问题，还是配置Web服务器，都需要对HTTP有深入的理解。`,
  quizzes: [
          {
            id: 'q19-1',
            type: 'choice',
            question: 'HTTP状态码404表示什么？',
            options: ['服务器内部错误', '请求成功', '资源未找到', '需要身份验证'],
            answer: 'C',
            explanation: '404 Not Found表示客户端请求的资源在服务器上不存在。这是最常见的HTTP错误状态码之一。'
          },
          {
            id: 'q19-2',
            type: 'choice',
            question: 'HTTPS在HTTP和TCP之间加入了什么协议来保证安全？',
            options: ['SSL', 'TLS', 'IPSec', 'SSH'],
            answer: 'B',
            explanation: 'HTTPS通过在HTTP和TCP之间加入TLS（Transport Layer Security，传输层安全）协议来提供加密、身份验证和完整性保证。'
          },
          {
            id: 'q19-3',
            type: 'fill',
            question: 'HTTP请求方法中，用于向服务器提交数据的方法是_____。',
            answer: 'POST',
            explanation: 'POST方法用于向服务器提交数据，如表单数据、文件上传等。数据放在请求体中传输。'
          },
          {
            id: 'q19-4',
            type: 'short-answer',
            question: 'HTTP/2相比HTTP/1.1有哪些主要改进？',
            answer: '主要改进包括：1）多路复用，在同一连接上并行传输多个请求；2）头部压缩，减少重复数据传输；3）服务器推送，服务器可主动推送资源；4）二进制分帧，提高传输效率。',
            explanation: 'HTTP/2的核心改进是多路复用，它解决了HTTP/1.1的队头阻塞问题，大大提高了Web页面的加载速度。'
          },
          {
            id: 'q19-5',
            type: 'choice',
            question: 'HTTP/3使用什么协议代替TCP？',
            options: ['UDP', 'QUIC', 'SCTP', 'DCCP'],
            answer: 'B',
            explanation: 'HTTP/3使用QUIC协议，QUIC基于UDP但提供了可靠传输、流量控制等功能，同时解决了TCP的队头阻塞问题。'
          }
        ],
  references: ['《图解HTTP》', 'RFC 9110 - HTTP Semantics', 'RFC 9113 - HTTP/2']
};
