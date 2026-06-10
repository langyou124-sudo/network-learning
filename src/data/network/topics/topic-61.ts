export const topic_61 = {
  title: "零信任网络架构",
  description: "永不信任/始终验证、微分段、ZTNA、SASE、IAM、持续验证",
  content: `# 零信任网络架构

## 开篇：你公司的防火墙，真的安全吗？

想象一个场景：一家公司的员工小王用公司电脑访问了内网的财务系统。某天，小王的电脑中了木马。因为财务系统信任"内网设备"，攻击者通过小王的电脑直接渗透到了财务核心——防火墙完全没有拦截，因为威胁来自"内部"。

这就是传统"城堡与护城河"安全模型的致命弱点：**一旦攻击者突破边界，内网就是一览无余的**。零信任架构的核心思想很简单：**不管你在哪，不管你是谁，每次访问都必须验证**。

这一课，我们来深入理解零信任网络架构的原理和实践。

<Glossary terms="%5B%7B%22term%22%3A%22%E9%9B%B6%E4%BF%A1%E4%BB%BB%22%2C%22english%22%3A%22Zero%20Trust%22%2C%22definition%22%3A%22%E4%B8%80%E7%A7%8D%E5%AE%89%E5%85%A8%E6%9E%B6%E6%9E%84%EF%BC%8C%E6%A0%B8%E5%BF%83%E5%8E%9F%E5%88%99%E6%98%AF%E2%80%9C%E6%B0%B8%E4%B8%8D%E4%BF%A1%E4%BB%BB%EF%BC%8C%E5%A7%8B%E7%BB%88%E9%AA%8C%E8%AF%81%E2%80%9D%22%7D%2C%7B%22term%22%3A%22ZTNA%22%2C%22english%22%3A%22Zero%20Trust%20Network%20Access%22%2C%22definition%22%3A%22%E9%9B%B6%E4%BF%A1%E4%BB%BB%E7%BD%91%E7%BB%9C%E8%AE%BF%E9%97%AE%EF%BC%8C%E5%9F%BA%E4%BA%8E%E8%BA%AB%E4%BB%BD%E5%92%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E8%AE%BF%E9%97%AE%E5%85%B7%E4%BD%93%E8%B5%84%E6%BA%90%EF%BC%8C%E8%80%8C%E9%9D%9E%E5%85%AC%E7%BD%91%22%7D%2C%7B%22term%22%3A%22SASE%22%2C%22english%22%3A%22Secure%20Access%20Service%20Edge%22%2C%22definition%22%3A%22%E5%AE%89%E5%85%A8%E8%AE%BF%E9%97%AE%E6%9C%8D%E5%8A%A1%E8%BE%B9%E7%BC%98%EF%BC%8C%E5%B0%86%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8%E5%8A%9F%E8%83%BD%E4%B8%8E%E5%B9%B3%E5%8F%B0%E6%95%B4%E5%90%88%E5%88%B0%E4%BA%91%E7%AB%AF%22%7D%2C%7B%22term%22%3A%22%E5%BE%AE%E5%88%86%E6%AE%B5%22%2C%22english%22%3A%22Microsegmentation%22%2C%22definition%22%3A%22%E5%B0%86%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84%E7%BB%86%E5%8C%96%E4%B8%BA%E6%AF%8F%E4%B8%AA%E5%B7%A5%E4%BD%9C%E8%B4%9F%E8%BD%BD%E7%9A%84%E7%8B%AC%E7%AB%8B%E5%88%86%E6%AE%B5%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%B2%92%E5%BA%A6%E9%9A%94%E7%A6%BB%22%7D%2C%7B%22term%22%3A%22IAM%22%2C%22english%22%3A%22Identity%20and%20Access%20Management%22%2C%22definition%22%3A%22%E8%BA%AB%E4%BB%BD%E4%B8%8E%E8%AE%BF%E9%97%AE%E7%AE%A1%E7%90%86%EF%BC%8C%E7%AE%A1%E7%90%86%E7%94%A8%E6%88%B7%E8%BA%AB%E4%BB%BD%E5%92%8C%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90%22%7D%2C%7B%22term%22%3A%22PAM%22%2C%22english%22%3A%22Privileged%20Access%20Management%22%2C%22definition%22%3A%22%E7%89%B9%E6%9D%83%E8%B4%A3%E6%9C%BA%E7%AE%A1%E7%90%86%EF%BC%8C%E7%AE%A1%E7%90%86%E7%AE%A1%E7%90%86%E5%91%98%E7%AD%89%E9%AB%98%E6%9D%83%E9%99%90%E8%B4%A6%E6%88%B7%22%7D%2C%7B%22term%22%3A%22mTLS%22%2C%22english%22%3A%22Mutual%20TLS%22%2C%22definition%22%3A%22%E5%8F%8C%E5%90%91TLS%EF%BC%8C%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%8F%8C%E6%96%B9%E4%BA%92%E7%9B%B8%E9%AA%8C%E8%AF%81%E8%AF%81%E4%B9%A6%22%7D%5D" />

## 传统安全模型的困境

### "城堡与护城河"模型

传统网络安全的核心思想是**边界防御**：

`,
  quizzes: [
        {
          id: 'quiz-61-01',
          type: 'choice',
          question: '零信任架构的核心原则是什么？',
          options: [
            '边界防御，内网信任',
            '永不信任，始终验证',
            'VPN 加密，安全接入',
            '防火墙过滤，入侵检测'
          ],
          answer: 'B',
          explanation: '零信任的核心原则是"永不信任，始终验证"（Never Trust, Always Verify），不因网络位置或设备类型给予默认信任。'
        },
        {
          id: 'quiz-61-02',
          type: 'choice',
          question: '以下哪项不是 SASE 的核心组件？',
          options: ['ZTNA', 'SWG', 'IDS', 'CASB'],
          answer: 'C',
          explanation: 'SASE 的核心组件包括 ZTNA、SWG（安全 Web 网关）、CASB（云访问安全代理）、FWaaS 和 DLP。IDS（入侵检测系统）不是 SASE 的核心组件。'
        },
        {
          id: 'quiz-61-03',
          type: 'fill',
          question: '微分段将网络隔离从 VLAN 级别细化到每个______级别。',
          answer: ['工作负载'],
          explanation: '微分段（Microsegmentation）将隔离粒度从传统的 VLAN（整个子网）细化到每个工作负载（VM/容器），实现更精细的访问控制。'
        },
        {
          id: 'quiz-61-04',
          type: 'short-answer',
          question: '请对比 ZTNA 和传统 VPN 的主要区别，并说明 ZTNA 为什么更适合远程办公场景。',
          answer: 'ZTNA 与 VPN 的主要区别：(1) 访问粒度：VPN 接入后可访问整个内网，ZTNA 只授权访问具体应用；(2) 信任模型：VPN 接入即信任，ZTNA 持续验证；(3) 安全暴露：VPN 网关公网可见易被攻击，ZTNA 网关不可见；(4) 用户体验：VPN 需要安装客户端，ZTNA 浏览器即可；(5) 微分段：VPN 不支持，ZTNA 原生支持。ZTNA 更适合远程办公因为它在保证安全的前提下提供了更好的用户体验，权限更精准，即使员工设备被攻陷，攻击者也只能接触到被授权的极少数应用，而非整个内网。',
          explanation: 'ZTNA 是零信任在网络访问层面的核心落地技术，正在快速替代传统 VPN。'
        }
      ],
  references: [
        'NIST SP 800-207 - Zero Trust Architecture',
        'Gartner - Cool Vendors in Zero Trust Network Access',
        'Forrester - Zero Trust eXtended (ZTX) Framework'
      ]
};
