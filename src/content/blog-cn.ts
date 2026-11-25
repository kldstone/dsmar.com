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
      zh: `<p><strong>简要回答：</strong>日常清洁大理石，可用温水配合中性石材清洁剂、石材皂或温和洗涤剂；之后用清水冲净并以软布擦干。石种、表面处理和安装环境不同，具体维护方式也应相应调整。<a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">天然石材行业协会（Natural Stone Institute）的清洁建议</a>提供了通用做法。</p><h2>大理石日常应该怎么清洁？</h2><ul><li>液体洒落后尽快用干净软布按压吸干，不要来回擦拭。</li><li>用温水和中性石材清洁剂、石材皂或温和洗涤剂清洁；按清洁剂说明操作，再用清水冲洗并擦干。</li><li>避免用醋、柠檬汁等酸性用品清洁大理石。含方解石的石材可能被酸性物质蚀刻，表面会失去光泽；研磨性清洁粉也可能刮伤表面。</li></ul><p>以上清洁方法依据 <a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute 的天然石材清洁与养护说明</a>整理。清洁剂若未标明适用于天然石材，请先不要直接用于石面。</p><h2>醋或柠檬汁会损伤大理石吗？</h2><p>可能会。醋和柠檬汁属于酸性物质；对含方解石的大理石，酸可能造成蚀刻，使表面出现暗淡或失光的痕迹。蚀刻是表面受损，不一定是污渍；不确定痕迹类型时，先咨询石材供应商或专业石材修复人员。<a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute 关于酸蚀与清洁的说明</a></p><h2>大理石一定要做封护吗？</h2><p>不一定。是否封护要结合具体石材、用途和安装条件确认。封护剂可能提高对日常污渍的抵抗力，但不代表石材完全防污；请向供应商或安装人员确认产品是否适用，并按产品说明施工。<a href="https://www.naturalstoneinstitute.org/consumers/sealing-stone/" target="_blank" rel="noopener noreferrer">Natural Stone Institute 关于天然石材台面封护的说明</a></p><h2>表面出现暗斑或失光怎么办？</h2><p>先避免继续使用酸性或研磨性清洁剂。酸蚀可能表现为表面失光，和液体渗入造成的污渍并非同一问题；请拍下现场情况并联系石材供应商或专业修复人员判断处理方式。不要先用未经确认的强力清洁剂或抛光剂。</p><h2>维护建议适用于所有石材吗？</h2><p>不适用于所有情况。本指南是一般性的天然石材清洁信息，不能替代针对具体石种、饰面和安装条件的维护说明。采购或安装后，请向供货方索取与实际石材相匹配的清洁和维护建议。</p>`,
      en: `<p><strong>Short answer:</strong> For everyday marble cleaning, use warm water with a neutral stone cleaner, stone soap, or a mild detergent; rinse with clean water and dry with a soft cloth. Care depends on the stone, finish, and installation. This general guidance follows the <a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute's stone-care recommendations</a>.</p><h2>How should I clean marble every day?</h2><ul><li>Blot spills promptly with a clean, soft cloth instead of wiping across the surface.</li><li>Clean with warm water and a neutral stone cleaner, stone soap, or mild detergent. Follow the cleaner's directions, rinse with clean water, and dry the surface.</li><li>Avoid vinegar, lemon juice, and other acidic cleaners. Acids can etch calcite-based stone and dull its finish; abrasive powders may scratch the surface.</li></ul><p>These steps summarize the <a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute's care guidance</a>. Do not apply a cleaner directly to stone unless its label says it is suitable for natural stone.</p><h2>Can vinegar or lemon juice damage marble?</h2><p>Yes, they can. Vinegar and lemon juice are acidic. On calcite-based marble, acids may etch the surface and leave a dull mark. Etching is surface damage and is not necessarily a stain. If you are unsure what caused a mark, ask your stone supplier or a stone-restoration professional. See the <a href="https://www.naturalstoneinstitute.org/consumers/care/" target="_blank" rel="noopener noreferrer">Natural Stone Institute's explanation of acid etching</a>.</p><h2>Does marble always need a sealer?</h2><p>No. Whether to seal depends on the specific stone, use, and installation. A sealer may improve resistance to everyday stains, but it does not make stone stain-proof. Ask your supplier or installer whether a sealer is appropriate and follow its product instructions. See the <a href="https://www.naturalstoneinstitute.org/consumers/sealing-stone/" target="_blank" rel="noopener noreferrer">Natural Stone Institute guidance on sealing natural-stone countertops</a>.</p><h2>What should I do about a dull mark?</h2><p>Stop using acidic or abrasive cleaners on the area. Acid etching can dull a finish and is different from a stain caused by a substance absorbed into the stone. Photograph the area and ask your stone supplier or a qualified restoration professional to identify the issue before applying a strong cleaner or polish.</p><h2>Does this advice apply to every stone?</h2><p>No. This is general natural-stone care information, not a maintenance specification for every stone, finish, or installation. After purchase or installation, ask the supplier for care instructions that match the material and finish at your site.</p>`,
    },
  },
];
