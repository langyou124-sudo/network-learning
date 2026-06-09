import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl animate-in">
      <Link href="/" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6 inline-block">
        ← 返回首页
      </Link>

      <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight mb-2">隐私政策</h1>
      <p className="text-[13px] text-[var(--text-muted)] mb-8">最后更新：2026 年 6 月 9 日</p>

      <div className="space-y-8 text-[14px] text-[var(--text-secondary)] leading-relaxed">

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">一、我们收集的信息</h2>
          <p>当你使用达博理时，我们会收集以下信息：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>账户信息</strong>：邮箱地址（用于注册和登录）</li>
            <li><strong>学习数据</strong>：学习进度、练习成绩、错题记录、课堂笔记</li>
            <li><strong>对话记录</strong>：你与 AI 助手的聊天内容（用于提供回答服务）</li>
            <li><strong>技术信息</strong>：IP 地址、浏览器类型（用于安全防护和限流）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">二、信息的使用目的</h2>
          <p>我们收集的信息仅用于以下目的：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>提供用户认证和账户管理服务</li>
            <li>记录和追踪你的学习进度</li>
            <li>通过 AI 助手回答你的学习问题</li>
            <li>防止滥用和保障系统安全（频率限制）</li>
            <li>改进平台功能和用户体验</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">三、信息的存储与安全</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>账户信息</strong>：存储在 Supabase（PostgreSQL 数据库），采用 AES-256 加密存储，传输使用 TLS 加密</li>
            <li><strong>学习数据</strong>：存储在你的浏览器本地（localStorage），不会上传到服务器</li>
            <li><strong>对话记录</strong>：通过 MiMo AI API 处理，我们不永久存储聊天内容</li>
            <li><strong>频率限制数据</strong>：存储在 Upstash Redis，仅包含请求计数，24 小时后自动清除</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">四、第三方服务</h2>
          <p>我们使用以下第三方服务来提供功能：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Supabase</strong>：用户认证和数据库服务（隐私政策：supabase.com/privacy）</li>
            <li><strong>MiMo AI</strong>：AI 对话服务（小米提供的大语言模型 API）</li>
            <li><strong>Upstash</strong>：Redis 限流服务（仅存储请求频率数据）</li>
            <li><strong>Vercel</strong>：网站托管服务</li>
          </ul>
          <p className="mt-2">我们不会向第三方出售或分享你的个人信息，仅在提供服务所必需的范围内与上述服务商共享数据。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">五、你的权利</h2>
          <p>你享有以下权利：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>访问权</strong>：随时查看你的学习数据和账户信息</li>
            <li><strong>导出权</strong>：通过设置页导出你的所有学习数据（JSON 格式）</li>
            <li><strong>删除权</strong>：通过设置页清除所有本地学习数据，或联系管理员删除账户</li>
            <li><strong>更正权</strong>：随时修改你的昵称和个人信息</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">六、Cookie 与本地存储</h2>
          <p>我们使用以下本地存储技术：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Cookie</strong>：仅用于维持登录状态（Supabase Auth session）</li>
            <li><strong>localStorage</strong>：存储学习进度、错题记录和笔记（纯本地，不上传服务器）</li>
          </ul>
          <p className="mt-2">你可以通过浏览器设置随时清除这些数据。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">七、未成年人保护</h2>
          <p>如果你未满 18 周岁，请在监护人的陪同下阅读本政策并使用本平台。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">八、政策更新</h2>
          <p>我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明最新更新日期。重大变更时会通过平台通知你。</p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">九、联系我们</h2>
          <p>如果你对本隐私政策有任何疑问，请通过平台内的 AI 助手联系我们。</p>
        </section>
      </div>
    </div>
  );
}
