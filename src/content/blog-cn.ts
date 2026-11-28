type LocalizedText = {
  zh: string;
  en: string;
};

type BlogSource = {
  title: LocalizedText;
  url: string;
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
  sources?: BlogSource[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "dongsheng-luxury-stone-transformation",
    title: { zh: "东升石业高端奢石选材：产品与供货信息确认", en: "Luxury Stone Sourcing from Dongsheng: Confirming Material and Supply Details" },
    date: "2026-05-29",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "东升官网介绍大理石荒料采购、批发及大板生产加工业务。选购奢石时，应按具体产品和批次确认品种、产地、规格、饰面、库存与价格。", en: "Dongsheng's published profile describes marble block sourcing and wholesale, plus slab production and processing. Confirm the material, origin, dimensions, finish, stock, and price for the specific product and lot." },
    image: "/brand-gallery/blog-expo-2025-07-22-01.jpg",
    tags: [{ zh: "奢石", en: "Luxury Stone" }, { zh: "选材", en: "Material Selection" }, { zh: "石材采购", en: "Stone Sourcing" }],
    content: {
      zh: `<p>东升官网企业资料介绍，公司业务包括大理石荒料采购、批发及大板生产加工。官网目录用于浏览产品记录和系列；产品名称与图片本身不能确认石材的地质分类、矿山来源或某一批次的供货情况。</p><h2>询价时应核对哪些信息？</h2><p>请先确认具体产品记录或样品，再向东升核实对应批次的材料名称与来源、板材尺寸和厚度、表面处理、可供数量、库存状态、价格及交付安排。不同批次和加工要求可能影响可供规格与报价。</p><h2>图片能否确认石材颜色和纹理？</h2><p>产品图片适合初步浏览，实际颜色、纹理和表面效果会受天然石材个体差异、批次、光线、显示设备和饰面处理影响。大面积项目选材前，请索取对应批次的实物照片或样板并与供货方确认。</p><h2>如何开始项目询价？</h2><p>联系东升时，可提供产品页面、项目用途、所需数量、目标尺寸或厚度、饰面要求和交付地点。东升可据此核实具体材料与供货条件；网站目录不代表实时库存、固定价格或已确认的供货承诺。</p><p>参考：<a href="https://www.dsmar.com/about/">东升企业资料</a>与<a href="https://www.dsmar.com/catalog/">官网石材目录</a>。</p>`,
      en: `<p>Dongsheng's published company profile describes marble block sourcing and wholesale, as well as slab production and processing. The online catalog helps visitors browse product records and collections; a product name or image alone does not establish geological classification, quarry origin, or availability from a particular lot.</p><h2>What should I confirm when requesting a quote?</h2><p>Identify the specific product record or sample, then ask Dongsheng to confirm the material name and origin for the relevant lot, slab dimensions and thickness, finish, quantity, stock status, price, and delivery terms. Available sizes and quotations may vary by lot and processing requirements.</p><h2>Can a photo confirm a stone's color and veining?</h2><p>Product photos are useful for initial browsing, but natural variation, lot, lighting, display settings, and finish can affect the appearance. Before specifying a large project, request photos or a sample from the relevant lot and confirm the details with the supplier.</p><h2>How do I start a project inquiry?</h2><p>When contacting Dongsheng, include the product page, intended application, quantity, target dimensions or thickness, finish requirements, and delivery location. Dongsheng can then confirm the material and supply terms for that request. The online catalog does not represent live stock, a fixed price, or a confirmed supply commitment.</p><p>References: <a href="https://www.dsmar.com/about/">Dongsheng's company profile</a> and the <a href="https://www.dsmar.com/catalog/">stone catalog</a>.</p>`,
    },
    sources: [
      {
        title: { zh: "东升大理石：企业资料", en: "Dongsheng Marble: Company Profile" },
        url: "https://www.dsmar.com/about/",
      },
      {
        title: { zh: "东升大理石：石材目录", en: "Dongsheng Marble: Stone Catalog" },
        url: "https://www.dsmar.com/catalog/",
      },
    ],
  },
  {
    slug: "dongsheng-baishi-cloud-warehouse",
    title: { zh: "东升股份与东华环球就「百市云仓」达成战略共识", en: "Dongsheng and Donghua Global Reach Strategic Consensus on a Cloud Warehouse" },
    date: "2026-05-21",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "据东华环球2026年5月21日报道，双方就「百市云仓」模式达成战略共识；首批1至2万平方米、20至30个品种是报道当时的入库计划，不代表当前库存。", en: "Donghua Global reported on May 21, 2026 that the parties reached strategic consensus on a Cloud Warehouse model. Its first-phase plan for 10,000–20,000 square metres across 20–30 varieties describes the plan at that time, not current stock." },
    image: "/brand-gallery/blog-expo-2025-07-22-02.jpg",
    tags: [{ zh: "百市云仓", en: "Cloud Warehouse" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "全国布局", en: "National Network" }],
    content: { zh: `<h2>「百市云仓」合作方案</h2><p>东华环球于2026年5月21日报道，东升股份董事长王尚云一行于5月20日到访东华环球，双方围绕「百市云仓」模式达成战略共识。报道将该模式描述为「窗口+仓库」，以源头直供、市场代储和商户共用为方向。</p><h2>报道中的首批入库计划</h2><p>东华环球当时介绍，首批计划组织1至2万平方米石材入库，覆盖20至30个品种，并计划在一个月内完成首批入库。该内容记录的是当时的推进计划；如需了解当前项目进度、库存或供货条件，请直接向双方核实。</p>`, en: `<h2>The Cloud Warehouse Partnership</h2><p>Donghua Global reported on May 21, 2026 that Dongsheng Chairman Wang Shangyun and his team visited on May 20, and that the two parties reached a strategic understanding on the Cloud Warehouse model. The report described it as a showroom-and-warehouse model built around direct sourcing, local storage, and shared use by merchants.</p><h2>First-Phase Inventory Plan Reported at the Time</h2><p>Donghua Global said the first phase was planned to hold 10,000 to 20,000 square metres across 20 to 30 varieties, with the initial inventory planned within one month. This records the plan at the time of publication. Contact the parties directly for current project status, inventory, and supply terms.</p>` },
    sources: [{
      title: {
        zh: "东华环球：东升股份董事长王尚云到访，共启百市云仓战略合作",
        en: "Donghua Global: Dongsheng Chairman Wang Shangyun Visits to Launch the Cloud Warehouse Partnership",
      },
      url: "https://www.dhge.cn/artice426.html",
    }],
  },
  {
    slug: "dongsheng-hanbaiyu-cooperation",
    title: { zh: "东升石业获尚玥矿业2026年经销商授权", en: "Dongsheng Receives Shangyue Mining's 2026 Distributor Authorization" },
    date: "2026-02-07",
    category: { zh: "行业资讯", en: "INDUSTRY NEWS" },
    summary: { zh: "尚玥矿业官方报道记载，2026年经销商大会于2月2日至3日在山东临沂举行，福建省东升石业股份有限公司列入获颁授权书的经销商名单。", en: "Shangyue Mining's official report says its 2026 dealer conference was held in Linyi on February 2–3 and lists Fujian Dongsheng Stone Industry Co., Ltd. among the dealers receiving authorization letters." },
    image: "/brand-gallery/blog-expo-2025-07-22-03.jpg",
    tags: [{ zh: "汉白玉", en: "Chinese White Marble" }, { zh: "战略合作", en: "Strategic Partnership" }, { zh: "矿山", en: "Quarry" }],
    content: { zh: `<h2>尚玥2026年经销商大会</h2><p>尚玥矿业官方报道记载，大会于2026年2月2日至3日在山东临沂举行。会议回顾了2025年合作情况，并发布2026年度战略规划与经销商支持体系。</p><h2>东升石业获颁授权书</h2><p>在大会报道列出的授权书颁发名单中，福建省东升石业股份有限公司位列其中。该来源确认东升在大会上获颁授权书；具体授权区域、期限、产品范围及当前合作条件，应以授权文件和双方最新确认为准。</p>`, en: `<h2>Shangyue's 2026 Dealer Conference</h2><p>Shangyue Mining's official report says the conference took place in Linyi, Shandong, on February 2–3, 2026. It reviewed cooperation in 2025 and introduced the company's 2026 strategy and dealer support programme.</p><h2>Dongsheng Received an Authorization Letter</h2><p>Fujian Dongsheng Stone Industry Co., Ltd. appears in the authorization-letter list published with the conference report. That source confirms Dongsheng received an authorization letter at the event; confirm its territory, term, product scope, and current conditions against the authorization document and with both parties.</p>` },
    sources: [{
      title: {
        zh: "尚玥矿业：尚玥2026年经销商大会圆满举行",
        en: "Shangyue Mining: 2026 Dealer Conference Successfully Held",
      },
      url: "https://www.shangyuemarble.com/xinwenzhongxin/1451.html",
    }],
  },
  {
    slug: "korea-stone-delegation",
    title: { zh: "第二十六届厦门国际石材展：海外客商参与情况", en: "The 26th Xiamen Stone Fair: International Buyer Participation" },
    date: "2026-03-31",
    category: { zh: "展会信息", en: "EVENT NEWS" },
    summary: { zh: "厦门市会议展览业协会2026年3月31日发布的简报记载，本届展会累计客商15.4万人次、来自120个国家和地区；境外客商同比增长10.2%，韩国位列客源国前五。", en: "A Xiamen convention-industry association bulletin dated March 31, 2026 reports 154,000 cumulative visitor attendances from 120 countries and regions. Overseas attendance grew 10.2% year over year, with Korea among the top five source countries." },
    image: "/brand-gallery/blog-expo-2025-07-22-04.jpg",
    tags: [{ zh: "国际合作", en: "International Cooperation" }, { zh: "韩国", en: "Korea" }, { zh: "厦门石材展", en: "Xiamen Stone Fair" }],
    content: { zh: `<h2>展会时间与国际客商情况</h2><p>厦门市会议展览业协会承办、厦门市会议展览局主办的2026年第4期会展业简报记载，第二十六届中国厦门国际石材展于2026年3月16日至19日在厦门国际会展中心举办。简报称，展会累计客商15.4万人次，来自120个国家和地区；境外客商同比增长10.2%，印度、韩国、澳大利亚、俄罗斯和马来西亚位列前五大客源国。</p><h2>展会规模与产业覆盖</h2><p>简报记载，大会展览面积为124,000平方米，汇聚超过2,000家参展品牌；展品覆盖矿山、石材产品、机械工具及辅料养护等产业环节。</p>`, en: `<h2>Dates and International Visitor Participation</h2><p>A March 2026 industry bulletin sponsored by the Xiamen Convention and Exhibition Bureau and prepared by the Xiamen Convention and Exhibition Association reports that the 26th China Xiamen International Stone Fair took place at the Xiamen International Conference &amp; Exhibition Center on March 16–19. It records 154,000 cumulative visitor attendances from 120 countries and regions. Overseas attendance grew 10.2% year over year, and India, Korea, Australia, Russia, and Malaysia were the five leading source countries.</p><h2>Exhibition Scale and Industry Coverage</h2><p>The bulletin reports 124,000 square metres of exhibition space and more than 2,000 exhibiting brands, covering quarrying, stone products, machinery, tools, and stone-care supplies.</p>` },
    sources: [{
      title: {
        zh: "厦门市会议展览业协会：2026年第4期会展业简报",
        en: "Xiamen Convention and Exhibition Association: 2026 Bulletin No. 4",
      },
      url: "https://www.xmce.org/upload/file9908.pdf",
    }],
  },
  {
    slug: "dongsheng-chairman-visit-zhengzhou",
    title: { zh: "东升集团发布：董事长王尚云赴郑州产业园考察交流", en: "Dongsheng Report: Chairman Wang Shangyun Visits an Industrial Park in Zhengzhou" },
    date: "2026-03-31",
    category: { zh: "公司动态", en: "COMPANY NEWS" },
    summary: { zh: "东升集团发布消息称，董事长王尚云一行曾赴众合（郑州）国际产业园交流，话题包括石材行业转型、智能制造、绿色低碳与数字化管理。", en: "Dongsheng reports that Chairman Wang Shangyun and his team visited Zhonghe (Zhengzhou) International Industrial Park for discussions on industry transformation, intelligent manufacturing, sustainability, and digital management." },
    image: "/brand-gallery/blog-expo-2025-07-22-05.jpg",
    tags: [{ zh: "公司动态", en: "Company News" }, { zh: "产业考察", en: "Industry Visit" }, { zh: "转型升级", en: "Transformation" }],
    content: { zh: `<h2>东升集团发布的考察交流信息</h2><p>据东升集团发布的公司动态，福建省东升石业股份有限公司董事长王尚云一行曾赴众合（郑州）国际产业园考察，双方就石材行业转型升级、智能制造、绿色低碳及数字化管理等议题交流。行程与交流内容以东升发布的信息及双方后续确认的文件为准。</p>`, en: `<h2>Visit Reported by Dongsheng</h2><p>According to a company update published by Dongsheng, Chairman Wang Shangyun of Fujian Dongsheng Stone Industry Co., Ltd. and his team visited Zhonghe (Zhengzhou) International Industrial Park for discussions on stone-industry transformation, intelligent manufacturing, sustainability, and digital management. The visit and discussion details reflect Dongsheng's published account and should be confirmed against any subsequent documentation issued by the parties.</p>` },
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
    sources: [
      {
        title: {
          zh: "Natural Stone Institute：天然石材清洁与养护",
          en: "Natural Stone Institute: Care and Cleaning of Natural Stone",
        },
        url: "https://www.naturalstoneinstitute.org/consumers/care/",
      },
      {
        title: {
          zh: "Natural Stone Institute：天然石材封护",
          en: "Natural Stone Institute: Sealing Natural Stone",
        },
        url: "https://www.naturalstoneinstitute.org/consumers/sealing-stone/",
      },
    ],
  },
];
