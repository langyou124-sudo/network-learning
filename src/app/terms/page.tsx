import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-3xl animate-in">
      <Link href="/" className="text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6 inline-block">
        ← 返回首页
      </Link>

      <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight mb-2">用户协议</h1>
      <p className="text-[13px] text-[var(--text-muted)] mb-8">最后更新：2026 年 6 月 9 日</p>

      <div className="space-y-8 text-[14px] text-[var(--text-secondary)] leading-relaxed">

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">一、服务说明</h2>
          <p>
            达博理是一个 AI 驱动的智能知识学习平台，主要提供网络工程领域的学习内容、练习测验和 AI 问答服务。
            使用本平台即表示你同意遵守本协议的各项条款。
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">二、账户注册</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>你需要提供有效的邮箱地址进行注册</li>
            <li>你应妥善保管账户信息，因账户泄露导致的损失由你自行承担</li>
            <li>每人应仅注册一个账户，禁止批量注册</li>
            <li>如发现账户异常使用，平台有权暂停或终止该账户</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">三、使用规范</h2>
          <p>使用本平台时，你不得：</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>利用 AI 助手生成违法、有害或不当内容</li>
            <li>通过自动化工具大量调用平台接口（刷请求、爬虫等）</li>
            <li>尝试绕过安全机制（鉴权、限流等）</li>
            <li>上传或传播恶意代码、病毒</li>
            <li>侵犯他人知识产权或其他合法权益</li>
            <li>对平台进行反向工程、反编译或反汇编</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">四、AI 助手免责</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>AI 助手的回答基于课程知识库和大语言模型生成，仅供参考</li>
            <li>AI 回答可能存在不准确或不完整之处，不构成专业建议</li>
            <li>对于因依赖 AI 回答而产生的任何损失，平台不承担责任</li>
            <li>建议结合教材和实际操作验证 AI 提供的信息</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">五、知识产权</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>平台上的课程内容、题目、图表等受著作权法保护</li>
            <li>你可以使用平台内容进行个人学习，但不得用于商业用途</li>
            <li>禁止未经授权复制、分发或修改平台内容</li>
            <li>你在平台上创建的笔记和学习记录归你所有</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">六、服务变更与中断</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>平台可能因维护、升级等原因暂停服务，会尽量提前通知</li>
            <li>平台保留随时修改或终止部分功能的权利</li>
            <li>因不可抗力（自然灾害、政策变化等）导致的服务中断，平台不承担责任</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">七、协议修改</h2>
          <p>
            我们可能会不时修改本协议。修改后的协议将在本页面发布，继续使用平台即表示你接受修改后的条款。
            重大变更时会通过平台通知你。
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-semibold text-[var(--text)] mb-2">八、适用法律</h2>
          <p>本协议的签订、履行、解释及争议解决均适用中华人民共和国法律。</p>
        </section>
      </div>
    </div>
  );
}
