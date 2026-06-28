'use client';

export default function ArchitectureView() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#f9f8f6' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1917', marginBottom: 4 }}>システム構成図</div>
        <div style={{ fontSize: 12, color: '#9e9b93' }}>このアプリケーションの技術スタックと各コンポーネントの関係</div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e4e2dc', borderRadius: 12, padding: '20px', overflowX: 'auto' }}>
        <svg width="100%" viewBox="0 0 680 580" role="img">
          <title>システム構成図</title>
          <desc>フロントエンド、バックエンド、データベース、外部サービスの構成</desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          <rect x="280" y="20" width="120" height="44" rx="22" fill="#eef3fd" stroke="#b8ccf5" strokeWidth="1"/>
          <text x="340" y="38" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0C447C">ユーザー</text>
          <text x="340" y="53" textAnchor="middle" fontSize="10" fill="#185FA5">ブラウザ / PC</text>

          <line x1="340" y1="64" x2="340" y2="108" stroke="#9e9b93" strokeWidth="1" markerEnd="url(#arrow)"/>
          <text x="352" y="90" fontSize="10" fill="#9e9b93">HTTPS</text>

          <rect x="140" y="108" width="400" height="110" rx="12" fill="#f5f3ff" stroke="#AFA9EC" strokeWidth="1"/>
          <text x="340" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3C3489">Vercel — フロントエンド</text>
          <text x="340" y="146" textAnchor="middle" fontSize="10" fill="#534AB7">seizou-kanri.vercel.app</text>
          <rect x="160" y="155" width="100" height="48" rx="8" fill="#fff" stroke="#AFA9EC" strokeWidth="0.5"/>
          <text x="210" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3C3489">Next.js 16</text>
          <text x="210" y="189" textAnchor="middle" fontSize="10" fill="#534AB7">App Router</text>
          <rect x="290" y="155" width="100" height="48" rx="8" fill="#fff" stroke="#AFA9EC" strokeWidth="0.5"/>
          <text x="340" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3C3489">React</text>
          <text x="340" y="189" textAnchor="middle" fontSize="10" fill="#534AB7">Components</text>
          <rect x="420" y="155" width="100" height="48" rx="8" fill="#fff" stroke="#AFA9EC" strokeWidth="0.5"/>
          <text x="470" y="174" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3C3489">TypeScript</text>
          <text x="470" y="189" textAnchor="middle" fontSize="10" fill="#534AB7">型安全</text>

          <line x1="240" y1="218" x2="180" y2="288" stroke="#9e9b93" strokeWidth="1" markerEnd="url(#arrow)"/>
          <text x="185" y="258" fontSize="10" fill="#9e9b93">REST API</text>
          <line x1="440" y1="218" x2="500" y2="288" stroke="#9e9b93" strokeWidth="1" markerEnd="url(#arrow)"/>
          <text x="455" y="258" fontSize="10" fill="#9e9b93">API</text>

          <rect x="40" y="288" width="260" height="160" rx="12" fill="#f0fdf4" stroke="#97C459" strokeWidth="1"/>
          <text x="170" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#27500A">Supabase</text>
          <text x="170" y="328" textAnchor="middle" fontSize="10" fill="#3B6D11">ap-northeast-2 (Seoul)</text>
          <rect x="58" y="340" width="100" height="44" rx="8" fill="#fff" stroke="#97C459" strokeWidth="0.5"/>
          <text x="108" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#27500A">PostgreSQL</text>
          <text x="108" y="373" textAnchor="middle" fontSize="10" fill="#3B6D11">プロジェクトDB</text>
          <rect x="182" y="340" width="100" height="44" rx="8" fill="#fff" stroke="#97C459" strokeWidth="0.5"/>
          <text x="232" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#27500A">Auth</text>
          <text x="232" y="373" textAnchor="middle" fontSize="10" fill="#3B6D11">ログイン認証</text>
          <rect x="58" y="394" width="224" height="40" rx="8" fill="#fff" stroke="#97C459" strokeWidth="0.5"/>
          <text x="170" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#27500A">Row Level Security</text>
          <text x="170" y="427" textAnchor="middle" fontSize="10" fill="#3B6D11">アクセス制御</text>

          <rect x="380" y="288" width="260" height="160" rx="12" fill="#fdf0ef" stroke="#F0997B" strokeWidth="1"/>
          <text x="510" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill="#712B13">Anthropic</text>
          <text x="510" y="328" textAnchor="middle" fontSize="10" fill="#993C1D">Claude API</text>
          <rect x="398" y="340" width="100" height="44" rx="8" fill="#fff" stroke="#F0997B" strokeWidth="0.5"/>
          <text x="448" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#712B13">Sonnet 4.6</text>
          <text x="448" y="373" textAnchor="middle" fontSize="10" fill="#993C1D">AIナビゲーター</text>
          <rect x="522" y="340" width="100" height="44" rx="8" fill="#fff" stroke="#F0997B" strokeWidth="0.5"/>
          <text x="572" y="358" textAnchor="middle" fontSize="11" fontWeight="600" fill="#712B13">要約・分析</text>
          <text x="572" y="373" textAnchor="middle" fontSize="10" fill="#993C1D">議事録処理</text>
          <rect x="398" y="394" width="224" height="40" rx="8" fill="#fff" stroke="#F0997B" strokeWidth="0.5"/>
          <text x="510" y="412" textAnchor="middle" fontSize="11" fontWeight="600" fill="#712B13">アジェンダ生成</text>
          <text x="510" y="427" textAnchor="middle" fontSize="10" fill="#993C1D">アクションアイテム抽出</text>

          <rect x="140" y="488" width="160" height="72" rx="12" fill="#f5f4f1" stroke="#B4B2A9" strokeWidth="1"/>
          <text x="220" y="514" textAnchor="middle" fontSize="13" fontWeight="700" fill="#444441">GitHub</text>
          <text x="220" y="530" textAnchor="middle" fontSize="10" fill="#5F5E5A">shuheiintokyo</text>
          <text x="220" y="545" textAnchor="middle" fontSize="10" fill="#5F5E5A">/seizou-kanri</text>

          <rect x="380" y="488" width="160" height="72" rx="12" fill="#fef9ec" stroke="#EF9F27" strokeWidth="1"/>
          <text x="460" y="514" textAnchor="middle" fontSize="13" fontWeight="700" fill="#633806">Resend</text>
          <text x="460" y="530" textAnchor="middle" fontSize="10" fill="#854F0B">メール通知</text>
          <text x="460" y="545" textAnchor="middle" fontSize="10" fill="#854F0B">3,000通/月 無料</text>

          <path d="M220 488 L220 460 L340 460 L340 218" fill="none" stroke="#B4B2A9" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
          <text x="244" y="456" fontSize="10" fill="#9e9b93">push → 自動デプロイ</text>
          <path d="M440 460 L460 460 L460 488" fill="none" stroke="#EF9F27" strokeWidth="1" markerEnd="url(#arrow)"/>
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
        {[
          { color: '#f5f3ff', border: '#AFA9EC', text: '#3C3489', label: 'フロントエンド', sub: 'Next.js / React / TypeScript' },
          { color: '#f0fdf4', border: '#97C459', text: '#27500A', label: 'データベース', sub: 'Supabase / PostgreSQL' },
          { color: '#fdf0ef', border: '#F0997B', text: '#712B13', label: 'AI エンジン', sub: 'Claude API / Anthropic' },
        ].map(({ color, border, text, label, sub }) => (
          <div key={label} style={{ background: color, border: `1px solid ${border}`, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: text }}>{label}</div>
            <div style={{ fontSize: 11, color: text, opacity: 0.8, marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
