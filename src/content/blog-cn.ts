type LocalizedText = {
  zh: string;
  en: string;
};

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  date: string;
  category: LocalizedText;
  summary: LocalizedText;
  image: string;
  tags: LocalizedText[];
  content: LocalizedText;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dongsheng-luxury-stone-transformation",
    title: { zh: "跳出价格内卷：东升石业聚焦高端奢石赛道", en: "Beyond Price Competition: Dongsheng Focuses on Premium Luxury Stone" },
    date: "2026-05-29",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "面对行业低价竞争，东升石业选择聚焦高端奢石市场，全面引进线锯加工设备，独家包矿品种「雪山翡翠」「紫气东来」等单品售价可达18万元。", en: "Amid price competition in the industry, Dongsheng has focused on premium luxury stone, introduced wire-saw equipment, and developed exclusive quarry varieties including Xueshan Jade and Ziqi Donglai." },
    image: "/brand-gallery/blog-luxury.jpg",
    tags: [{ zh: "奢石", en: "Luxury Stone" }, { zh: "品牌转型", en: "Brand Transformation" }, { zh: "高端市场", en: "Premium Market" }],
    content: { zh: `<h2>从价格内卷到高端突围</h2><p>位于南安水头镇的福建省东升石业股份有限公司，面对行业低价竞争，选择了一条与众不同的路——聚焦高端奢石市场。</p><p>公司全面引进线锯加工设备（已启用9台），提升出材率、减少损耗，从技术上降低成本的同时保持品质优势。</p><h2>独家包矿，以稀为贵</h2><p>东升独家包矿品种如「雪山翡翠」「紫气东来」等奢石在市场上具有极高的辨识度，单品售价可达18万元。</p><h2>从B端到C端的转型</h2><p>企业从传统B端工程供货向C端高端家装市场转型，产品覆盖高端酒店、别墅、大平层等场景。</p>`, en: `<h2>Moving Beyond Price Competition</h2><p>Based in Shuitou, Nan'an, Fujian Dongsheng Stone Co., Ltd. has taken a different path amid low-price competition: concentrating on the premium luxury-stone market.</p><p>The company has introduced wire-saw equipment, with nine units already in operation, to improve yield and reduce waste while maintaining its quality advantage.</p><h2>Exclusive Quarry Resources</h2><p>Exclusive quarry varieties such as Xueshan Jade and Ziqi Donglai have strong market recognition and help define Dongsheng's distinctive stone portfolio.</p><h2>From Project Supply to Premium Residential Spaces</h2><p>Dongsheng is expanding from traditional project supply toward premium residential applications, including high-end hotels, villas, and large private residences.</p>` },
  },
  {
    slug: "dongsheng-baishi-cloud-warehouse",
    title: { zh: "东升股份与东华环球共启「百市云仓」战略合作", en: "Dongsheng and Donghua Global Launch a Strategic Cloud Warehouse Partnership" },
    date: "2026-05-21",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "东升股份董事长王尚云到访上海东华环球，双方达成「百市云仓」战略合作，定位为源头直供的现货展示与仓储服务。", en: "Dongsheng and Shanghai Donghua Global have entered a strategic Cloud Warehouse partnership for direct-source inventory display and storage services." },
    image: "/brand-gallery/blog-warehouse.jpg",
    tags: [{ zh: "百市云仓", en: "Cloud Warehouse" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "全国布局", en: "National Network" }],
    content: { zh: `<h2>「百市云仓」新模式</h2><p>东升股份董事长王尚云近日到访上海东华环球，双方正式达成「百市云仓」战略合作。该模式定位为「窗口+仓库」，专注于源头直供的现货展示与仓储服务。</p><h2>首批1-2万平方米石材入库</h2><p>双方计划首批组织1~2万平方米石材入库，覆盖20~30个品种，解决上海市场「有价无货」的困局。</p>`, en: `<h2>A New Cloud Warehouse Model</h2><p>Dongsheng Chairman Wang Shangyun recently visited Shanghai Donghua Global, where the two sides formally established the Cloud Warehouse strategic partnership. The model combines a showroom with a warehouse to provide direct-source inventory display and storage.</p><h2>Initial Inventory Programme</h2><p>The first phase plans to stock 10,000 to 20,000 square metres of stone across 20 to 30 varieties, improving product availability for the Shanghai market.</p>` },
  },
  {
    slug: "dongsheng-hanbaiyu-cooperation",
    title: { zh: "东升石业×尚玥矿业：共拓高端汉白玉全球市场", en: "Dongsheng and Shangyue Mining Expand the Global Premium White Marble Market" },
    date: "2026-02-03",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "东升石业与尚玥矿业深化战略合作，共同推广国宝级汉白玉产品，目标打造「西有鱼肚白、东有尚玥白」的行业格局。", en: "Dongsheng and Shangyue Mining have deepened their strategic partnership to promote premium Chinese white marble in global markets." },
    image: "/brand-gallery/blog-hanbaiyu.jpg",
    tags: [{ zh: "汉白玉", en: "Chinese White Marble" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "矿山", en: "Quarry" }],
    content: { zh: `<h2>深化战略合作</h2><p>东升石业总经理王明显率队出席尚玥2026年经销商大会，双方就长期稳定供货、品质保障升级、品牌联合推广、全球市场拓展达成高度共识。</p><h2>国宝级汉白玉</h2><p>东升石业获颁尚玥矿业核心战略经销商授权证书，共同推广国宝级汉白玉产品。</p>`, en: `<h2>Deepening Strategic Cooperation</h2><p>Dongsheng's general manager Wang Mingxian led a team to Shangyue's 2026 dealer conference. Both parties reached a strong consensus on stable long-term supply, enhanced quality assurance, joint brand promotion, and global market development.</p><h2>Premium Chinese White Marble</h2><p>Dongsheng received Shangyue Mining's core strategic distributor authorisation and will jointly promote this distinctive Chinese white marble collection.</p>` },
  },
  {
    slug: "korea-stone-delegation",
    title: { zh: "韩国石材考察团走进水头，深入东升等龙头企业考察", en: "Korean Stone Delegation Visits Shuitou and Dongsheng" },
    date: "2026-03-17",
    category: { zh: "展会信息", en: "EVENT NEWS" },
    summary: { zh: "第二十六届厦门国际石材展期间，韩国石材产业考察团专程到访南安水头，实地考察东升股份等企业，推动中韩石材产业合作。", en: "During the 26th Xiamen International Stone Fair, a Korean stone-industry delegation visited Shuitou and Dongsheng to strengthen industry cooperation." },
    image: "/brand-gallery/blog-korea.jpg",
    tags: [{ zh: "国际合作", en: "International Cooperation" }, { zh: "韩国", en: "Korea" }, { zh: "厦门石材展", en: "Xiamen Stone Fair" }],
    content: { zh: `<h2>中韩石材产业交流</h2><p>第二十六届厦门国际石材展期间，韩国石材产业考察团20余人专程到访南安水头，实地考察东升股份等水头龙头企业。</p><h2>推动深度合作</h2><p>东升作为水头石材企业的代表，向韩国考察团展示了从矿山资源到精加工生产的全产业链能力。</p>`, en: `<h2>China–Korea Stone Industry Exchange</h2><p>During the 26th Xiamen International Stone Fair, a delegation of more than 20 Korean stone-industry representatives travelled to Shuitou, Nan'an, to visit leading companies including Dongsheng.</p><h2>Building Deeper Cooperation</h2><p>As a representative Shuitou stone company, Dongsheng presented its integrated capabilities, from quarry resources through precision processing and production.</p>` },
  },
  {
    slug: "dongsheng-chairman-visit-zhengzhou",
    title: { zh: "东升集团董事长王尚云考察众合（郑州）国际产业园", en: "Dongsheng Chairman Wang Shangyun Visits Zhonghe Zhengzhou International Industrial Park" },
    date: "2026-03-31",
    category: { zh: "公司动态", en: "COMPANY NEWS" },
    summary: { zh: "福建省东升石业股份有限公司董事长王尚云一行赴郑州考察，就石材行业转型升级、智能制造、绿色低碳等议题展开交流。", en: "Dongsheng Chairman Wang Shangyun and his team visited Zhengzhou to exchange views on industry transformation, intelligent manufacturing, and sustainable development." },
    image: "/brand-gallery/blog-chairman.jpg",
    tags: [{ zh: "公司动态", en: "Company News" }, { zh: "产业考察", en: "Industry Visit" }, { zh: "转型升级", en: "Transformation" }],
    content: { zh: `<h2>考察交流</h2><p>福建省东升石业股份有限公司董事长王尚云一行赴众合（郑州）国际产业园考察，双方就石材行业转型升级、智能制造、绿色低碳、数字化管理等议题展开深入交流。</p>`, en: `<h2>Industry Exchange</h2><p>Dongsheng Chairman Wang Shangyun and his team visited Zhonghe Zhengzhou International Industrial Park. Both sides held in-depth discussions on stone-industry transformation, intelligent manufacturing, green and low-carbon development, and digital management.</p>` },
  },
  {
    slug: "natural-marble-care-guide",
    title: { zh: "天然大理石日常养护指南：让石材历久弥新", en: "Daily Natural Marble Care Guide" },
    date: "2026-07-01",
    category: { zh: "石材知识", en: "STONE KNOWLEDGE" },
    summary: { zh: "天然大理石需要适当的日常维护才能保持光泽。本文分享专业的石材清洁和保养方法，让您的天然大理石始终如新。", en: "Natural marble needs appropriate day-to-day care to retain its finish. This guide shares practical cleaning and maintenance advice." },
    image: "/brand-gallery/blog-care.jpg",
    tags: [{ zh: "石材养护", en: "Stone Care" }, { zh: "大理石", en: "Marble" }, { zh: "保养知识", en: "Care Guide" }],
    content: { zh: `<h2>日常清洁</h2><p>天然大理石日常清洁使用中性清洁剂配合软布擦拭即可。避免使用酸性或碱性强的清洁剂。</p><h2>防护处理</h2><p>大理石铺贴前应做六面渗透型防护处理。东升所有出厂板材均经过专业防护处理。</p><h2>定期养护</h2><p>家庭台面每6-12个月做一次结晶养护，商业空间每3-6个月养护一次。</p>`, en: `<h2>Daily Cleaning</h2><p>For daily cleaning, use a pH-neutral cleaner with a soft cloth. Avoid strongly acidic or alkaline cleaning products.</p><h2>Protective Treatment</h2><p>Before installation, marble should receive a six-sided penetrating protective treatment. Dongsheng slabs are professionally protected before delivery.</p><h2>Regular Maintenance</h2><p>For residential countertops, arrange crystallisation maintenance every 6 to 12 months. Commercial spaces generally benefit from maintenance every 3 to 6 months.</p>` },
  },
];
