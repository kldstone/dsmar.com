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
    image: "/brand-gallery/blog-expo-2025-07-22-01.jpg",
    tags: [{ zh: "奢石", en: "Luxury Stone" }, { zh: "品牌转型", en: "Brand Transformation" }, { zh: "高端市场", en: "Premium Market" }],
    content: { zh: `<h2>从价格内卷到高端突围</h2><p>位于南安水头镇的福建省东升石业股份有限公司，面对行业低价竞争，选择了一条与众不同的路——聚焦高端奢石市场。</p><p>公司全面引进线锯加工设备（已启用9台），提升出材率、减少损耗，从技术上降低成本的同时保持品质优势。</p><h2>独家包矿，以稀为贵</h2><p>东升独家包矿品种如「雪山翡翠」「紫气东来」等奢石在市场上具有极高的辨识度，单品售价可达18万元。</p><h2>从B端到C端的转型</h2><p>企业从传统B端工程供货向C端高端家装市场转型，产品覆盖高端酒店、别墅、大平层等场景。</p>`, en: `<h2>Moving Beyond Price Competition</h2><p>Based in Shuitou, Nan'an, Fujian Dongsheng Stone Co., Ltd. has taken a different path amid low-price competition: concentrating on the premium luxury-stone market.</p><p>The company has introduced wire-saw equipment, with nine units already in operation, to improve yield and reduce waste while maintaining its quality advantage.</p><h2>Exclusive Quarry Resources</h2><p>Exclusive quarry varieties such as Xueshan Jade and Ziqi Donglai have strong market recognition and help define Dongsheng's distinctive stone portfolio.</p><h2>From Project Supply to Premium Residential Spaces</h2><p>Dongsheng is expanding from traditional project supply toward premium residential applications, including high-end hotels, villas, and large private residences.</p>` },
  },
  {
    slug: "dongsheng-baishi-cloud-warehouse",
    title: { zh: "东升股份与东华环球共启「百市云仓」战略合作", en: "Dongsheng and Donghua Global Launch a Strategic Cloud Warehouse Partnership" },
    date: "2026-05-21",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "东升股份董事长王尚云到访上海东华环球，双方达成「百市云仓」战略合作，定位为源头直供的现货展示与仓储服务。", en: "Dongsheng and Shanghai Donghua Global have entered a strategic Cloud Warehouse partnership for direct-source inventory display and storage services." },
    image: "/brand-gallery/blog-expo-2025-07-22-02.jpg",
    tags: [{ zh: "百市云仓", en: "Cloud Warehouse" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "全国布局", en: "National Network" }],
    content: { zh: `<h2>「百市云仓」新模式</h2><p>东升股份董事长王尚云近日到访上海东华环球，双方正式达成「百市云仓」战略合作。该模式定位为「窗口+仓库」，专注于源头直供的现货展示与仓储服务。</p><h2>首批1-2万平方米石材入库</h2><p>双方计划首批组织1~2万平方米石材入库，覆盖20~30个品种，解决上海市场「有价无货」的困局。</p>`, en: `<h2>A New Cloud Warehouse Model</h2><p>Dongsheng Chairman Wang Shangyun recently visited Shanghai Donghua Global, where the two sides formally established the Cloud Warehouse strategic partnership. The model combines a showroom with a warehouse to provide direct-source inventory display and storage.</p><h2>Initial Inventory Programme</h2><p>The first phase plans to stock 10,000 to 20,000 square metres of stone across 20 to 30 varieties, improving product availability for the Shanghai market.</p>` },
  },
  {
    slug: "dongsheng-hanbaiyu-cooperation",
    title: { zh: "东升石业×尚玥矿业：共拓高端汉白玉全球市场", en: "Dongsheng and Shangyue Mining Expand the Global Premium White Marble Market" },
    date: "2026-02-03",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "东升石业与尚玥矿业深化战略合作，共同推广国宝级汉白玉产品，目标打造「西有鱼肚白、东有尚玥白」的行业格局。", en: "Dongsheng and Shangyue Mining have deepened their strategic partnership to promote premium Chinese white marble in global markets." },
    image: "/brand-gallery/blog-expo-2025-07-22-03.jpg",
    tags: [{ zh: "汉白玉", en: "Chinese White Marble" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "矿山", en: "Quarry" }],
    content: { zh: `<h2>深化战略合作</h2><p>东升石业总经理王明显率队出席尚玥2026年经销商大会，双方就长期稳定供货、品质保障升级、品牌联合推广、全球市场拓展达成高度共识。</p><h2>国宝级汉白玉</h2><p>东升石业获颁尚玥矿业核心战略经销商授权证书，共同推广国宝级汉白玉产品。</p>`, en: `<h2>Deepening Strategic Cooperation</h2><p>Dongsheng's general manager Wang Mingxian led a team to Shangyue's 2026 dealer conference. Both parties reached a strong consensus on stable long-term supply, enhanced quality assurance, joint brand promotion, and global market development.</p><h2>Premium Chinese White Marble</h2><p>Dongsheng received Shangyue Mining's core strategic distributor authorisation and will jointly promote this distinctive Chinese white marble collection.</p>` },
  },
  {
    slug: "korea-stone-delegation",
    title: { zh: "韩国石材考察团走进水头，深入东升等龙头企业考察", en: "Korean Stone Delegation Visits Shuitou and Dongsheng" },
    date: "2026-03-17",
    category: { zh: "展会信息", en: "EVENT NEWS" },
    summary: { zh: "第二十六届厦门国际石材展期间，韩国石材产业考察团专程到访南安水头，实地考察东升股份等企业，推动中韩石材产业合作。", en: "During the 26th Xiamen International Stone Fair, a Korean stone-industry delegation visited Shuitou and Dongsheng to strengthen industry cooperation." },
    image: "/brand-gallery/blog-expo-2025-07-22-04.jpg",
    tags: [{ zh: "国际合作", en: "International Cooperation" }, { zh: "韩国", en: "Korea" }, { zh: "厦门石材展", en: "Xiamen Stone Fair" }],
    content: { zh: `<h2>中韩石材产业交流</h2><p>第二十六届厦门国际石材展期间，韩国石材产业考察团20余人专程到访南安水头，实地考察东升股份等水头龙头企业。</p><h2>推动深度合作</h2><p>东升作为水头石材企业的代表，向韩国考察团展示了从矿山资源到精加工生产的全产业链能力。</p>`, en: `<h2>China–Korea Stone Industry Exchange</h2><p>During the 26th Xiamen International Stone Fair, a delegation of more than 20 Korean stone-industry representatives travelled to Shuitou, Nan'an, to visit leading companies including Dongsheng.</p><h2>Building Deeper Cooperation</h2><p>As a representative Shuitou stone company, Dongsheng presented its integrated capabilities, from quarry resources through precision processing and production.</p>` },
  },
  {
    slug: "dongsheng-chairman-visit-zhengzhou",
    title: { zh: "东升集团董事长王尚云考察众合（郑州）国际产业园", en: "Dongsheng Chairman Wang Shangyun Visits Zhonghe Zhengzhou International Industrial Park" },
    date: "2026-03-31",
    category: { zh: "公司动态", en: "COMPANY NEWS" },
    summary: { zh: "福建省东升石业股份有限公司董事长王尚云一行赴郑州考察，就石材行业转型升级、智能制造、绿色低碳等议题展开交流。", en: "Dongsheng Chairman Wang Shangyun and his team visited Zhengzhou to exchange views on industry transformation, intelligent manufacturing, and sustainable development." },
    image: "/brand-gallery/blog-expo-2025-07-22-05.jpg",
    tags: [{ zh: "公司动态", en: "Company News" }, { zh: "产业考察", en: "Industry Visit" }, { zh: "转型升级", en: "Transformation" }],
    content: { zh: `<h2>考察交流</h2><p>福建省东升石业股份有限公司董事长王尚云一行赴众合（郑州）国际产业园考察，双方就石材行业转型升级、智能制造、绿色低碳、数字化管理等议题展开深入交流。</p>`, en: `<h2>Industry Exchange</h2><p>Dongsheng Chairman Wang Shangyun and his team visited Zhonghe Zhengzhou International Industrial Park. Both sides held in-depth discussions on stone-industry transformation, intelligent manufacturing, green and low-carbon development, and digital management.</p>` },
  },
  {
    slug: "natural-marble-care-guide",
    title: { zh: "天然大理石日常养护指南：让石材历久弥新", en: "Daily Natural Marble Care Guide" },
    date: "2026-07-01",
    category: { zh: "石材知识", en: "STONE KNOWLEDGE" },
    summary: { zh: "天然大理石的清洁与防护方式取决于石种、表面处理和使用环境。本文整理日常清洁要点，并附天然石材行业协会的养护资料。", en: "Marble care depends on the stone, finish, and setting. This guide covers everyday cleaning and links to Natural Stone Institute care guidance." },
    image: "/brand-gallery/blog-expo-2025-07-22-06.jpg",
    tags: [{ zh: "石材养护", en: "Stone Care" }, { zh: "大理石", en: "Marble" }, { zh: "保养知识", en: "Care Guide" }],
    content: {
      zh: `<h2>日常清洁</h2><p>及时擦拭溢洒物，使用柔软的布和明确标注适用于天然石材的清洁产品。大理石可能受到酸性物质侵蚀，避免使用醋、柠檬汁等酸性清洁剂。</p><h2>封护与防护</h2><p>并非每种石材都需要封护。是否适用以及如何施工，应根据具体石种、表面处理和使用环境，向石材供应商或安装人员确认，并遵循产品说明。封护剂可能提升抗污能力，但不能让石材完全防污，也不能防止酸蚀。</p><h2>按现场情况维护</h2><p>清洁与维护方式和频率取决于石种、表面处理、使用频率及现场状况，不宜用统一周期代替针对性建议。需要判断封护或修复时，请咨询石材供应商或专业养护人员。</p><h2>参考资料</h2><p><a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">天然石材行业协会：天然石材清洁与养护</a>；<a href="https://www.naturalstoneinstitute.org/consumers/sealing-stone/" target="_blank" rel="noopener noreferrer">天然石材行业协会：天然石材台面封护说明</a>。</p>`,
      en: `<h2>Daily Cleaning</h2><p>Wipe up spills promptly. Use a soft cloth and a cleaner labeled safe for natural stone. Marble can be etched by acids, so avoid acidic cleaners such as vinegar or lemon juice.</p><h2>Sealing and Protection</h2><p>Not every stone needs sealing. Ask your stone supplier or installer whether sealing is suitable for the specific stone, finish, and setting, and follow the product instructions. A sealer may improve stain resistance, but it does not make stone stain-proof or protect it from acid etching.</p><h2>Maintenance for the Specific Setting</h2><p>Care methods and frequency depend on the stone, finish, use, and site conditions. A single maintenance schedule cannot replace advice for the specific installation. Ask your stone supplier or a qualified stone-care professional about sealing or repair.</p><h2>References</h2><p><a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute: Cleaning and Care</a>; <a href="https://www.naturalstoneinstitute.org/consumers/sealing-stone/" target="_blank" rel="noopener noreferrer">Natural Stone Institute: Sealing Natural Stone Countertops</a>.</p>`,
    },
  },
];
