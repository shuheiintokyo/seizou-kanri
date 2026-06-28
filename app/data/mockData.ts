export type Status = 'urgent' | 'active' | 'pending' | 'done';

export interface Member {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  email: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'xlsx' | 'docx' | 'cad' | 'image';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Message {
  id: string;
  from: string;
  fromId: string;
  initials: string;
  color: string;
  time: string;
  text: string;
  isAI?: boolean;
  isMine?: boolean;
  attachments?: string[];
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: Status;
  tags: string[];
  members: Member[];
  messages: Message[];
  documents: Document[];
  agenda: string[];
  nextMeeting?: string;
  description: string;
}

export const currentUser: Member = {
  id: 'tanaka',
  name: '田中 修平',
  role: '営業部・管理者',
  initials: '田',
  color: '#eef3fd',
  email: 'tanaka@hirata-trading.co.jp',
};

export const projects: Project[] = [
  {
    id: 'yamaha',
    name: 'ヤマハ B&O アルトサックスケース',
    client: 'ヤマハ株式会社',
    status: 'urgent',
    tags: ['吹込み成形', '超軽量', 'B&O'],
    description: '吹込み成形による超軽量アルトサックスケースの開発。総重量340g以下・ABS+PC混合材料を検討中。',
    nextMeeting: '2026年7月1日 14:00',
    members: [
      { id: 'tanaka', name: '田中 修平', role: '担当営業', initials: '田', color: '#eef3fd', email: 'tanaka@hirata-trading.co.jp' },
      { id: 'suzuki', name: '鈴木 健一', role: '技術確認', initials: '鈴', color: '#f0fdf4', email: 'suzuki@hirata-trading.co.jp' },
      { id: 'ryoke', name: 'リョーケ 担当', role: '外部パートナー', initials: 'R', color: '#fdf0ef', email: 'info@ryoke.co.jp' },
    ],
    messages: [
      { id: '1', from: '鈴木 健一', fromId: 'suzuki', initials: '鈴', color: '#f0fdf4', time: '6/25 10:12', text: 'ヤマハ様より図面が届きました。吹込み成形で0.8mm肉厚の要件です。リョーケさんに転送しました。' },
      { id: '2', from: '田中 修平', fromId: 'tanaka', initials: '田', color: '#eef3fd', time: '6/25 11:30', text: '確認しました。総重量340g以下という要件が一番厳しいですね。材料はABS+PC混合を検討しましょう。', isMine: true },
      { id: '3', from: 'AIナビゲーター', fromId: 'ai', initials: 'AI', color: '#f5f3ff', time: '6/25 12:00', text: '【AIサマリー】吹込み成形での超軽量ケース製造において、ABS+PC混合材料は軽量性と耐衝撃性のバランスが優れています。リョーケ工業への見積依頼は今週中に完了させることを推奨します。次のアクション：①図面の最終確認 ②見積依頼の送付 ③7月1日ミーティングの議題準備', isAI: true },
      { id: '4', from: '鈴木 健一', fromId: 'suzuki', initials: '鈴', color: '#f0fdf4', time: '6/26 09:00', text: 'リョーケさんから回答来ました。添付PDF参照。7月1日に打ち合わせを入れてもらいました。', attachments: ['リョーケ見積書_v1.pdf'] },
    ],
    documents: [
      { id: 'd1', name: 'ヤマハ図面_v3.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: '鈴木 健一', uploadedAt: '6/25' },
      { id: 'd2', name: 'リョーケ見積書.xlsx', type: 'xlsx', size: '380 KB', uploadedBy: '鈴木 健一', uploadedAt: '6/26' },
      { id: 'd3', name: '要件定義書.docx', type: 'docx', size: '1.1 MB', uploadedBy: '田中 修平', uploadedAt: '6/24' },
    ],
    agenda: [
      '図面の最終確認と寸法承認',
      '吹込み成形の金型費用見積',
      'スケジュール（試作→量産）確認',
      '材料サンプルの提出時期',
    ],
  },
  {
    id: 'rapyuta',
    name: 'Rapyuta 導電塗装プロジェクト',
    client: 'Rapyuta Robotics',
    status: 'active',
    tags: ['導電塗装', '与信確認', 'IoT'],
    description: 'ロボット筐体向け導電塗装の調達。プラスコート経由で野村ユニゾンと交渉中。与信リスク要管理。',
    nextMeeting: '2026年7月7日 10:00',
    members: [
      { id: 'tanaka', name: '田中 修平', role: '担当営業', initials: '田', color: '#eef3fd', email: 'tanaka@hirata-trading.co.jp' },
      { id: 'nomura', name: '野村 担当', role: '野村ユニゾン', initials: '野', color: '#fdf0ef', email: 'contact@nomura-unison.co.jp' },
      { id: 'plus', name: 'Pluscoat 担当', role: '中間業者', initials: 'P', color: '#fef9ec', email: 'info@pluscoat.co.jp' },
    ],
    messages: [
      { id: '1', from: '田中 修平', fromId: 'tanaka', initials: '田', color: '#eef3fd', time: '6/24 14:00', text: 'Rapyutaより導電塗装の要件が届きました。プラスコートさん経由で野村ユニゾンに確認中です。', isMine: true },
      { id: '2', from: 'AIナビゲーター', fromId: 'ai', initials: 'AI', color: '#f5f3ff', time: '6/24 14:30', text: '【与信リスク警告】野村ユニゾンへの発注金額が与信限度額の85%に達します。事前に経理部門との確認を推奨します。回答期限：6/29（明日）。担当：田中さん。', isAI: true },
      { id: '3', from: '野村 担当', fromId: 'nomura', initials: '野', color: '#fdf0ef', time: '6/24 16:00', text: '品質基準のサンプルを来週月曜に提出できます。表面抵抗値10^4Ω以下の仕様で対応可能です。' },
    ],
    documents: [
      { id: 'd1', name: '導電塗装仕様書.pdf', type: 'pdf', size: '1.8 MB', uploadedBy: '野村 担当', uploadedAt: '6/24' },
      { id: 'd2', name: '与信審査資料.xlsx', type: 'xlsx', size: '520 KB', uploadedBy: '田中 修平', uploadedAt: '6/24' },
    ],
    agenda: [
      '与信承認の最終確認',
      '塗装仕様書の署名',
      '品質検査基準の合意',
      '初回ロット数量と納期',
    ],
  },
  {
    id: 'moiron',
    name: 'Moiron M2-1 金型CAD設計',
    client: '社内プロジェクト',
    status: 'pending',
    tags: ['CAD', '金型', '展示会'],
    description: 'Upworkフリーランサーによるミニ簡易金型CAD設計。展示会デモ向け。Sandor P.よりデータ提出済。',
    nextMeeting: '2026年7月15日 13:00',
    members: [
      { id: 'tanaka', name: '田中 修平', role: '担当', initials: '田', color: '#eef3fd', email: 'tanaka@hirata-trading.co.jp' },
      { id: 'sandor', name: 'Sandor P.', role: 'CADフリーランサー', initials: 'S', color: '#f5f3ff', email: 'sandor@upwork.com' },
    ],
    messages: [
      { id: '1', from: '田中 修平', fromId: 'tanaka', initials: '田', color: '#eef3fd', time: '6/20 09:00', text: 'Upworkでフリーランサー2名をショートリストしました。Sandor P.（スロバキア）とBlagoja N.（北マケドニア）です。', isMine: true },
      { id: '2', from: 'AIナビゲーター', fromId: 'ai', initials: 'AI', color: '#f5f3ff', time: '6/22 10:00', text: '【進捗更新】Sandor P.よりCADデータが提出されました。SolidWorks形式、全8部品。展示会デモ向け金型として適切なクオリティです。寸法チェックのレビューをお願いします。', isAI: true },
    ],
    documents: [
      { id: 'd1', name: 'M2-1_mold_v2.SLDPRT', type: 'cad', size: '8.2 MB', uploadedBy: 'Sandor P.', uploadedAt: '6/22' },
      { id: 'd2', name: '展示会要件定義.docx', type: 'docx', size: '890 KB', uploadedBy: '田中 修平', uploadedAt: '6/19' },
    ],
    agenda: [
      'CADデータ寸法チェック',
      '金型材料の最終選定',
      '展示会スケジュール確認',
    ],
  },
  {
    id: 'fuji',
    name: 'FUJI 3D印刷・防水PCB検討',
    client: '富士機械製造',
    status: 'done',
    tags: ['3D印刷', 'PCB', '防水'],
    description: '防水PCBシーリング用途での産業3Dプリンター選定。3社比較調査完了。Nano Dimension推奨。',
    members: [
      { id: 'tanaka', name: '田中 修平', role: '担当', initials: '田', color: '#eef3fd', email: 'tanaka@hirata-trading.co.jp' },
    ],
    messages: [
      { id: '1', from: '田中 修平', fromId: 'tanaka', initials: '田', color: '#eef3fd', time: '6/15 11:00', text: 'Stratasys PolyJet、Nano Dimension DragonFly IV、FUJI FPM-Trinityの3社を調査しました。', isMine: true },
      { id: '2', from: 'AIナビゲーター', fromId: 'ai', initials: 'AI', color: '#f5f3ff', time: '6/15 11:30', text: '【調査完了】防水PCBシーリング用途では、Nano Dimension DragonFly IVが最も適合度が高い結果です。誘電率と絶縁性能が要件を満たします。調査レポートを添付します。', isAI: true },
    ],
    documents: [
      { id: 'd1', name: '3D印刷調査レポート.pdf', type: 'pdf', size: '3.1 MB', uploadedBy: '田中 修平', uploadedAt: '6/15' },
    ],
    agenda: [
      '最終候補機器の選定',
      '予算承認申請',
      '導入スケジュール策定',
    ],
  },
];

export const statusConfig: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  urgent: { label: '要対応', color: '#c0392b', bg: '#fdf0ef', border: '#f5c6c2' },
  active: { label: '進行中', color: '#1e5fd4', bg: '#eef3fd', border: '#b8ccf5' },
  pending: { label: 'レビュー待ち', color: '#b45309', bg: '#fef9ec', border: '#fde68a' },
  done: { label: '完了', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
};

export const statusBorderColor: Record<Status, string> = {
  urgent: '#c0392b',
  active: '#1e5fd4',
  pending: '#b45309',
  done: '#15803d',
};
