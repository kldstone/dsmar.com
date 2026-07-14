import { useParams, Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";

// ============================================================
// 产品详情页
// 图片来源：gani.com.cn 产品图
// 文案：基于原始文案润色
// ============================================================

const productData: Record<string, {
  title: string;
  subtitle: string;
  heroImg: string;
  color: string;
  gallery: string[];
}> = {
  "0": {
    title: "桃李春风",
    subtitle: "Cristallo Pink Quartzite",
    heroImg: "/gani-products/gani_001_桃李春风_large.webp",
    color: "红色系",
    gallery: ["/gani-products/gani_001_桃李春风_large.webp", "/gani-products/gani_001_桃李春风.webp"],
  },
  "1": {
    title: "宇宙金",
    subtitle: "Black Cosmic",
    heroImg: "/gani-products/gani_002_宇宙金_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_002_宇宙金_large.webp", "/gani-products/gani_002_宇宙金.webp"],
  },
  "2": {
    title: "安第斯雪景",
    subtitle: "Avalanche",
    heroImg: "/gani-products/gani_003_安第斯雪景_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_003_安第斯雪景_large.webp", "/gani-products/gani_003_安第斯雪景.webp"],
  },
  "3": {
    title: "天山暮雪",
    subtitle: "Patagonia",
    heroImg: "/gani-products/gani_004_天山暮雪_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_004_天山暮雪_large.webp", "/gani-products/gani_004_天山暮雪.webp"],
  },
  "4": {
    title: "经典宝石蓝",
    subtitle: "Brazil Blue Sodalite",
    heroImg: "/gani-products/gani_005_经典宝石蓝_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_005_经典宝石蓝_large.webp", "/gani-products/gani_005_经典宝石蓝.webp"],
  },
  "5": {
    title: "浅杏岩",
    subtitle: "Matera Beige",
    heroImg: "/gani-products/gani_006_浅杏岩_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_006_浅杏岩_large.webp", "/gani-products/gani_006_浅杏岩.webp"],
  },
  "6": {
    title: "和光石",
    subtitle: "Sereno Beige",
    heroImg: "/gani-products/gani_007_和光石_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_007_和光石_large.webp", "/gani-products/gani_007_和光石.webp"],
  },
  "7": {
    title: "轻岚雪影",
    subtitle: "Bianco Gioia",
    heroImg: "/gani-products/gani_008_轻岚雪影_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_008_轻岚雪影_large.webp", "/gani-products/gani_008_轻岚雪影.webp"],
  },
  "8": {
    title: "经典白金沙",
    subtitle: "Palissandro White",
    heroImg: "/gani-products/gani_009_经典白金沙_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_009_经典白金沙_large.webp", "/gani-products/gani_009_经典白金沙.webp"],
  },
  "9": {
    title: "香格里拉白",
    subtitle: "Bianco Namibia",
    heroImg: "/gani-products/gani_010_香格里拉白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_010_香格里拉白_large.webp", "/gani-products/gani_010_香格里拉白.webp"],
  },
  "10": {
    title: "烟雨江南",
    subtitle: "Camouflage Light",
    heroImg: "/gani-products/gani_011_烟雨江南_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_011_烟雨江南_large.webp", "/gani-products/gani_011_烟雨江南.webp"],
  },
  "11": {
    title: "水晶芬迪白",
    subtitle: "Oyster White Extra",
    heroImg: "/gani-products/gani_012_水晶芬迪白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_012_水晶芬迪白_large.webp", "/gani-products/gani_012_水晶芬迪白.webp"],
  },
  "12": {
    title: "蓝水晶",
    subtitle: "Calcite Blue",
    heroImg: "/gani-products/gani_013_蓝水晶_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_013_蓝水晶_large.webp", "/gani-products/gani_013_蓝水晶.webp"],
  },
  "13": {
    title: "宝格丽",
    subtitle: "Calacatta Viola",
    heroImg: "/gani-products/gani_014_宝格丽_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_014_宝格丽_large.webp", "/gani-products/gani_014_宝格丽.webp"],
  },
  "14": {
    title: "柏悦石",
    subtitle: "Calacatta Michelangelo",
    heroImg: "/gani-products/gani_015_柏悦石_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_015_柏悦石_large.webp", "/gani-products/gani_015_柏悦石.webp"],
  },
  "15": {
    title: "世纪冰玉",
    subtitle: "Ice Onyx",
    heroImg: "/gani-products/gani_016_世纪冰玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_016_世纪冰玉_large.webp", "/gani-products/gani_016_世纪冰玉.webp"],
  },
  "16": {
    title: "细纹芬迪白",
    subtitle: "Oyster White",
    heroImg: "/gani-products/gani_017_细纹芬迪白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_017_细纹芬迪白_large.webp", "/gani-products/gani_017_细纹芬迪白.webp"],
  },
  "17": {
    title: "菲拉格慕",
    subtitle: "Grey Ivory",
    heroImg: "/gani-products/gani_018_菲拉格慕_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_018_菲拉格慕_large.webp", "/gani-products/gani_018_菲拉格慕.webp"],
  },
  "18": {
    title: "巴赫石",
    subtitle: "Moon Beige",
    heroImg: "/gani-products/gani_019_巴赫石_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_019_巴赫石_large.webp", "/gani-products/gani_019_巴赫石.webp"],
  },
  "19": {
    title: "温德姆",
    subtitle: "Lovina Grey",
    heroImg: "/gani-products/gani_020_温德姆_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_020_温德姆_large.webp", "/gani-products/gani_020_温德姆.webp"],
  },
  "20": {
    title: "摩卡石",
    subtitle: "Savanna",
    heroImg: "/gani-products/gani_021_摩卡石_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_021_摩卡石_large.webp", "/gani-products/gani_021_摩卡石.webp"],
  },
  "21": {
    title: "新巴西鱼肚灰",
    subtitle: "Super White",
    heroImg: "/gani-products/gani_022_新巴西鱼肚灰_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_022_新巴西鱼肚灰_large.webp", "/gani-products/gani_022_新巴西鱼肚灰.webp"],
  },
  "22": {
    title: "阿尔卑斯",
    subtitle: "Verde Alpi Premium",
    heroImg: "/gani-products/gani_023_阿尔卑斯_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_023_阿尔卑斯_large.webp", "/gani-products/gani_023_阿尔卑斯.webp"],
  },
  "23": {
    title: "新细纹雪花白",
    subtitle: "Bianco Carrara",
    heroImg: "/gani-products/gani_024_新细纹雪花白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_024_新细纹雪花白_large.webp", "/gani-products/gani_024_新细纹雪花白.webp"],
  },
  "24": {
    title: "霜喜",
    subtitle: "Fior Di Bosco Luna",
    heroImg: "/gani-products/gani_025_霜喜_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_025_霜喜_large.webp", "/gani-products/gani_025_霜喜.webp"],
  },
  "25": {
    title: "云雾白",
    subtitle: "Bardiglio",
    heroImg: "/gani-products/gani_026_云雾白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_026_云雾白_large.webp", "/gani-products/gani_026_云雾白.webp"],
  },
  "26": {
    title: "赛亚白",
    subtitle: "Olympia White",
    heroImg: "/gani-products/gani_027_赛亚白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_027_赛亚白_large.webp", "/gani-products/gani_027_赛亚白.webp"],
  },
  "27": {
    title: "卡塔白",
    subtitle: "Extra Calacatta",
    heroImg: "/gani-products/gani_028_卡塔白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_028_卡塔白_large.webp", "/gani-products/gani_028_卡塔白.webp"],
  },
  "28": {
    title: "冰岛白",
    subtitle: "Bianco Rhino",
    heroImg: "/gani-products/gani_029_冰岛白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_029_冰岛白_large.webp", "/gani-products/gani_029_冰岛白.webp"],
  },
  "29": {
    title: "卡拉拉白",
    subtitle: "Statuario Calacatta",
    heroImg: "/gani-products/gani_030_卡拉拉白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_030_卡拉拉白_large.webp", "/gani-products/gani_030_卡拉拉白.webp"],
  },
  "30": {
    title: "皇家白玉",
    subtitle: "White Ony×",
    heroImg: "/gani-products/gani_031_皇家白玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_031_皇家白玉_large.webp", "/gani-products/gani_031_皇家白玉.webp"],
  },
  "31": {
    title: "新鱼肚白",
    subtitle: "Statuario Extra",
    heroImg: "/gani-products/gani_032_新鱼肚白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_032_新鱼肚白_large.webp", "/gani-products/gani_032_新鱼肚白.webp"],
  },
  "32": {
    title: "林肯白",
    subtitle: "Bianco Lincoln",
    heroImg: "/gani-products/gani_033_林肯白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_033_林肯白_large.webp", "/gani-products/gani_033_林肯白.webp"],
  },
  "33": {
    title: "新品雅士白",
    subtitle: "New Ariston",
    heroImg: "/gani-products/gani_034_新品雅士白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_034_新品雅士白_large.webp", "/gani-products/gani_034_新品雅士白.webp"],
  },
  "34": {
    title: "透光白玉",
    subtitle: "Pearl Onyx",
    heroImg: "/gani-products/gani_035_透光白玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_035_透光白玉_large.webp", "/gani-products/gani_035_透光白玉.webp"],
  },
  "35": {
    title: "伊莉莎白",
    subtitle: "Calacatta",
    heroImg: "/gani-products/gani_036_伊莉莎白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_036_伊莉莎白_large.webp", "/gani-products/gani_036_伊莉莎白.webp"],
  },
  "36": {
    title: "雅士白",
    subtitle: "Ariston",
    heroImg: "/gani-products/gani_037_雅士白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_037_雅士白_large.webp", "/gani-products/gani_037_雅士白.webp"],
  },
  "37": {
    title: "巴西熊猫白",
    subtitle: "Panda White",
    heroImg: "/gani-products/gani_038_巴西熊猫白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_038_巴西熊猫白_large.webp", "/gani-products/gani_038_巴西熊猫白.webp"],
  },
  "38": {
    title: "卡慕白",
    subtitle: "Camouflage White",
    heroImg: "/gani-products/gani_039_卡慕白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_039_卡慕白_large.webp", "/gani-products/gani_039_卡慕白.webp"],
  },
  "39": {
    title: "卡拉卡塔",
    subtitle: "Calacatta Gold Extra",
    heroImg: "/gani-products/gani_040_卡拉卡塔_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_040_卡拉卡塔_large.webp", "/gani-products/gani_040_卡拉卡塔.webp"],
  },
  "40": {
    title: "卡拉拉金",
    subtitle: "Oro Carrara",
    heroImg: "/gani-products/gani_041_卡拉拉金_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_041_卡拉拉金_large.webp", "/gani-products/gani_041_卡拉拉金.webp"],
  },
  "41": {
    title: "拉萨维拉白",
    subtitle: "Bianco Li lac",
    heroImg: "/gani-products/gani_042_拉萨维拉白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_042_拉萨维拉白_large.webp", "/gani-products/gani_042_拉萨维拉白.webp"],
  },
  "42": {
    title: "经典雪花白",
    subtitle: "Bianco Venato",
    heroImg: "/gani-products/gani_043_经典雪花白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_043_经典雪花白_large.webp", "/gani-products/gani_043_经典雪花白.webp"],
  },
  "43": {
    title: "希腊伯爵白",
    subtitle: "Volakas",
    heroImg: "/gani-products/gani_044_希腊伯爵白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_044_希腊伯爵白_large.webp", "/gani-products/gani_044_希腊伯爵白.webp"],
  },
  "44": {
    title: "春序",
    subtitle: "Macaub",
    heroImg: "/gani-products/gani_045_春序_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_045_春序_large.webp", "/gani-products/gani_045_春序.webp"],
  },
  "45": {
    title: "柏妮丝",
    subtitle: "Bernice Grey",
    heroImg: "/gani-products/gani_046_柏妮丝_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_046_柏妮丝_large.webp", "/gani-products/gani_046_柏妮丝.webp"],
  },
  "46": {
    title: "古罗马灰",
    subtitle: "Assinis Fantasia",
    heroImg: "/gani-products/gani_047_古罗马灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_047_古罗马灰_large.webp", "/gani-products/gani_047_古罗马灰.webp"],
  },
  "47": {
    title: "纳斯",
    subtitle: "Oscar Beige",
    heroImg: "/gani-products/gani_048_纳斯_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_048_纳斯_large.webp", "/gani-products/gani_048_纳斯.webp"],
  },
  "48": {
    title: "欧米茄",
    subtitle: "Omega Beige",
    heroImg: "/gani-products/gani_049_欧米茄_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_049_欧米茄_large.webp", "/gani-products/gani_049_欧米茄.webp"],
  },
  "49": {
    title: "香格娜米黄",
    subtitle: "Roman Jade",
    heroImg: "/gani-products/gani_050_香格娜米黄_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_050_香格娜米黄_large.webp", "/gani-products/gani_050_香格娜米黄.webp"],
  },
  "50": {
    title: "非洲米黄",
    subtitle: "Safari Beige",
    heroImg: "/gani-products/gani_051_非洲米黄_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_051_非洲米黄_large.webp", "/gani-products/gani_051_非洲米黄.webp"],
  },
  "51": {
    title: "新矿莎安娜",
    subtitle: "Premium Botticino",
    heroImg: "/gani-products/gani_052_新矿莎安娜_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_052_新矿莎安娜_large.webp", "/gani-products/gani_052_新矿莎安娜.webp"],
  },
  "52": {
    title: "塞阿拉米黄",
    subtitle: "Taj Mahal Quartzite",
    heroImg: "/gani-products/gani_053_塞阿拉米黄_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_053_塞阿拉米黄_large.webp", "/gani-products/gani_053_塞阿拉米黄.webp"],
  },
  "53": {
    title: "纳沃纳黄洞",
    subtitle: "Navona Travertine Classic",
    heroImg: "/gani-products/gani_054_纳沃纳黄洞_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_054_纳沃纳黄洞_large.webp", "/gani-products/gani_054_纳沃纳黄洞.webp"],
  },
  "54": {
    title: "纳沃纳白洞",
    subtitle: "Navona Travertine Gardenia",
    heroImg: "/gani-products/gani_055_纳沃纳白洞_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_055_纳沃纳白洞_large.webp", "/gani-products/gani_055_纳沃纳白洞.webp"],
  },
  "55": {
    title: "钢琴灰",
    subtitle: "Teak Wood Cream",
    heroImg: "/gani-products/gani_056_钢琴灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_056_钢琴灰_large.webp", "/gani-products/gani_056_钢琴灰.webp"],
  },
  "56": {
    title: "芬迪灰",
    subtitle: "Fendi Grey",
    heroImg: "/gani-products/gani_057_芬迪灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_057_芬迪灰_large.webp", "/gani-products/gani_057_芬迪灰.webp"],
  },
  "57": {
    title: "意大利云灰",
    subtitle: "Bardiglio Bluette",
    heroImg: "/gani-products/gani_058_意大利云灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_058_意大利云灰_large.webp", "/gani-products/gani_058_意大利云灰.webp"],
  },
  "58": {
    title: "阿波罗银",
    subtitle: "Claros Grey (light)",
    heroImg: "/gani-products/gani_059_阿波罗银_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_059_阿波罗银_large.webp", "/gani-products/gani_059_阿波罗银.webp"],
  },
  "59": {
    title: "保加利亚灰",
    subtitle: "Pietra Grey",
    heroImg: "/gani-products/gani_060_保加利亚灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_060_保加利亚灰_large.webp", "/gani-products/gani_060_保加利亚灰.webp"],
  },
  "60": {
    title: "卡斯特",
    subtitle: "Soveraia Grey",
    heroImg: "/gani-products/gani_061_卡斯特_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_061_卡斯特_large.webp", "/gani-products/gani_061_卡斯特.webp"],
  },
  "61": {
    title: "秦川沃野",
    subtitle: "Louis Grey",
    heroImg: "/gani-products/gani_062_秦川沃野_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_062_秦川沃野_large.webp", "/gani-products/gani_062_秦川沃野.webp"],
  },
  "62": {
    title: "星际蓝",
    subtitle: "Emperador Grey",
    heroImg: "/gani-products/gani_063_星际蓝_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_063_星际蓝_large.webp", "/gani-products/gani_063_星际蓝.webp"],
  },
  "63": {
    title: "伏旭",
    subtitle: "Grigio Soverala",
    heroImg: "/gani-products/gani_064_伏旭_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_064_伏旭_large.webp", "/gani-products/gani_064_伏旭.webp"],
  },
  "64": {
    title: "奥斯汀",
    subtitle: "Starry Sky",
    heroImg: "/gani-products/gani_065_奥斯汀_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_065_奥斯汀_large.webp", "/gani-products/gani_065_奥斯汀.webp"],
  },
  "65": {
    title: "巴洛特灰",
    subtitle: "Ballot Grey",
    heroImg: "/gani-products/gani_066_巴洛特灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_066_巴洛特灰_large.webp", "/gani-products/gani_066_巴洛特灰.webp"],
  },
  "66": {
    title: "贝纳灰",
    subtitle: "Savoy Grey",
    heroImg: "/gani-products/gani_067_贝纳灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_067_贝纳灰_large.webp", "/gani-products/gani_067_贝纳灰.webp"],
  },
  "67": {
    title: "亚马逊蓝",
    subtitle: "Amazon Blue",
    heroImg: "/gani-products/gani_068_亚马逊蓝_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_068_亚马逊蓝_large.webp", "/gani-products/gani_068_亚马逊蓝.webp"],
  },
  "68": {
    title: "云朵灰",
    subtitle: "Tundra Grey",
    heroImg: "/gani-products/gani_069_云朵灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_069_云朵灰_large.webp", "/gani-products/gani_069_云朵灰.webp"],
  },
  "69": {
    title: "欧迪芬蓝",
    subtitle: "Earth Grey",
    heroImg: "/gani-products/gani_070_欧迪芬蓝_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_070_欧迪芬蓝_large.webp", "/gani-products/gani_070_欧迪芬蓝.webp"],
  },
  "70": {
    title: "鱼肚灰",
    subtitle: "Cenere Di Pesce",
    heroImg: "/gani-products/gani_071_鱼肚灰_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_071_鱼肚灰_large.webp", "/gani-products/gani_071_鱼肚灰.webp"],
  },
  "71": {
    title: "希腊灰",
    subtitle: "Assinis Grey",
    heroImg: "/gani-products/gani_072_希腊灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_072_希腊灰_large.webp", "/gani-products/gani_072_希腊灰.webp"],
  },
  "72": {
    title: "爱马仕灰",
    subtitle: "Pearl Grey",
    heroImg: "/gani-products/gani_073_爱马仕灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_073_爱马仕灰_large.webp", "/gani-products/gani_073_爱马仕灰.webp"],
  },
  "73": {
    title: "普佩斯米灰",
    subtitle: "Pulpis Grey",
    heroImg: "/gani-products/gani_074_普佩斯米灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_074_普佩斯米灰_large.webp", "/gani-products/gani_074_普佩斯米灰.webp"],
  },
  "74": {
    title: "云棕灰",
    subtitle: "Nuvola Marrone",
    heroImg: "/gani-products/gani_075_云棕灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_075_云棕灰_large.webp", "/gani-products/gani_075_云棕灰.webp"],
  },
  "75": {
    title: "云朵拉灰",
    subtitle: "New Castle Grey",
    heroImg: "/gani-products/gani_076_云朵拉灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_076_云朵拉灰_large.webp", "/gani-products/gani_076_云朵拉灰.webp"],
  },
  "76": {
    title: "幻彩白麻",
    subtitle: "Kashmir Granite",
    heroImg: "/gani-products/gani_077_幻彩白麻_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_077_幻彩白麻_large.webp", "/gani-products/gani_077_幻彩白麻.webp"],
  },
  "77": {
    title: "卡拉卡塔黑",
    subtitle: "Calacatta Black",
    heroImg: "/gani-products/gani_078_卡拉卡塔黑_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_078_卡拉卡塔黑_large.webp", "/gani-products/gani_078_卡拉卡塔黑.webp"],
  },
  "78": {
    title: "塞浦路斯灰",
    subtitle: "Cyprus Grey",
    heroImg: "/gani-products/gani_079_塞浦路斯灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_079_塞浦路斯灰_large.webp", "/gani-products/gani_079_塞浦路斯灰.webp"],
  },
  "79": {
    title: "罗马假日",
    subtitle: "Jas Tuff",
    heroImg: "/gani-products/gani_080_罗马假日_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_080_罗马假日_large.webp", "/gani-products/gani_080_罗马假日.webp"],
  },
  "80": {
    title: "英格兰灰",
    subtitle: "Maui Grey",
    heroImg: "/gani-products/gani_081_英格兰灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_081_英格兰灰_large.webp", "/gani-products/gani_081_英格兰灰.webp"],
  },
  "81": {
    title: "诺曼底灰",
    subtitle: "Atlantic Grey",
    heroImg: "/gani-products/gani_082_诺曼底灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_082_诺曼底灰_large.webp", "/gani-products/gani_082_诺曼底灰.webp"],
  },
  "82": {
    title: "蓝色多瑙河",
    subtitle: "Azul Sodalite",
    heroImg: "/gani-products/gani_083_蓝色多瑙河_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_083_蓝色多瑙河_large.webp", "/gani-products/gani_083_蓝色多瑙河.webp"],
  },
  "83": {
    title: "皇家蓝",
    subtitle: "Azul Macaubas",
    heroImg: "/gani-products/gani_084_皇家蓝_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_084_皇家蓝_large.webp", "/gani-products/gani_084_皇家蓝.webp"],
  },
  "84": {
    title: "蓝贝露",
    subtitle: "Palissandro Blue",
    heroImg: "/gani-products/gani_085_蓝贝露_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_085_蓝贝露_large.webp", "/gani-products/gani_085_蓝贝露.webp"],
  },
  "85": {
    title: "碧海伽蓝",
    subtitle: "Locke Blue Grey",
    heroImg: "/gani-products/gani_086_碧海伽蓝_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_086_碧海伽蓝_large.webp", "/gani-products/gani_086_碧海伽蓝.webp"],
  },
  "86": {
    title: "听雨",
    subtitle: "Nero Picasso",
    heroImg: "/gani-products/gani_087_听雨_large.webp",
    color: "黑色系",
    gallery: ["/gani-products/gani_087_听雨_large.webp", "/gani-products/gani_087_听雨.webp"],
  },
  "87": {
    title: "鎏金岁月",
    subtitle: "Golden Midnight",
    heroImg: "/gani-products/gani_088_鎏金岁月_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_088_鎏金岁月_large.webp", "/gani-products/gani_088_鎏金岁月.webp"],
  },
  "88": {
    title: "新皇室灰",
    subtitle: "New Silver Fantasy",
    heroImg: "/gani-products/gani_089_新皇室灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_089_新皇室灰_large.webp", "/gani-products/gani_089_新皇室灰.webp"],
  },
  "89": {
    title: "黑白根",
    subtitle: "Nero Marquina",
    heroImg: "/gani-products/gani_090_黑白根_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_090_黑白根_large.webp", "/gani-products/gani_090_黑白根.webp"],
  },
  "90": {
    title: "劳伦斯金",
    subtitle: "Laurent Black",
    heroImg: "/gani-products/gani_091_劳伦斯金_large.webp",
    color: "黑色系",
    gallery: ["/gani-products/gani_091_劳伦斯金_large.webp", "/gani-products/gani_091_劳伦斯金.webp"],
  },
  "91": {
    title: "石榴红宝",
    subtitle: "Rose Notte Lumos",
    heroImg: "/gani-products/gani_092_石榴红宝_large.webp",
    color: "红色系",
    gallery: ["/gani-products/gani_092_石榴红宝_large.webp", "/gani-products/gani_092_石榴红宝.webp"],
  },
  "92": {
    title: "夏荷",
    subtitle: "Quartizite Avocado",
    heroImg: "/gani-products/gani_093_夏荷_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_093_夏荷_large.webp", "/gani-products/gani_093_夏荷.webp"],
  },
  "93": {
    title: "皇家绿",
    subtitle: "Royal Green",
    heroImg: "/gani-products/gani_094_皇家绿_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_094_皇家绿_large.webp", "/gani-products/gani_094_皇家绿.webp"],
  },
  "94": {
    title: "四季绿洲",
    subtitle: "Four Seasons",
    heroImg: "/gani-products/gani_095_四季绿洲_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_095_四季绿洲_large.webp", "/gani-products/gani_095_四季绿洲.webp"],
  },
  "95": {
    title: "亚马逊绿",
    subtitle: "Amazon Green",
    heroImg: "/gani-products/gani_096_亚马逊绿_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_096_亚马逊绿_large.webp", "/gani-products/gani_096_亚马逊绿.webp"],
  },
  "96": {
    title: "青山远黛",
    subtitle: "Calacatta Mint",
    heroImg: "/gani-products/gani_097_青山远黛_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_097_青山远黛_large.webp", "/gani-products/gani_097_青山远黛.webp"],
  },
  "97": {
    title: "绿野仙踪",
    subtitle: "Verde Lapponia",
    heroImg: "/gani-products/gani_098_绿野仙踪_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_098_绿野仙踪_large.webp", "/gani-products/gani_098_绿野仙踪.webp"],
  },
  "98": {
    title: "青松耸翠",
    subtitle: "Verde Calacatta",
    heroImg: "/gani-products/gani_099_青松耸翠_large.webp",
    color: "绿色系",
    gallery: ["/gani-products/gani_099_青松耸翠_large.webp", "/gani-products/gani_099_青松耸翠.webp"],
  },
  "99": {
    title: "卡慕棕",
    subtitle: "Camouflage",
    heroImg: "/gani-products/gani_100_卡慕棕_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_100_卡慕棕_large.webp", "/gani-products/gani_100_卡慕棕.webp"],
  },
  "100": {
    title: "雅典木纹",
    subtitle: "Twilight Ashwood",
    heroImg: "/gani-products/gani_101_雅典木纹_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_101_雅典木纹_large.webp", "/gani-products/gani_101_雅典木纹.webp"],
  },
  "101": {
    title: "阿玛尼棕",
    subtitle: "Amani Brown",
    heroImg: "/gani-products/gani_102_阿玛尼棕_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_102_阿玛尼棕_large.webp", "/gani-products/gani_102_阿玛尼棕.webp"],
  },
  "102": {
    title: "四季粉",
    subtitle: "Four Seasons Rosa",
    heroImg: "/gani-products/gani_103_四季粉_large.webp",
    color: "红色系",
    gallery: ["/gani-products/gani_103_四季粉_large.webp", "/gani-products/gani_103_四季粉.webp"],
  },
  "103": {
    title: "柿秋",
    subtitle: "Breche Fantastique",
    heroImg: "/gani-products/gani_104_柿秋_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_104_柿秋_large.webp", "/gani-products/gani_104_柿秋.webp"],
  },
  "104": {
    title: "西施红",
    subtitle: "Rosa Zarci",
    heroImg: "/gani-products/gani_105_西施红_large.webp",
    color: "红色系",
    gallery: ["/gani-products/gani_105_西施红_large.webp", "/gani-products/gani_105_西施红.webp"],
  },
  "105": {
    title: "锡耶纳黄",
    subtitle: "Giallo Siena",
    heroImg: "/gani-products/gani_106_锡耶纳黄_large.webp",
    color: "金色系",
    gallery: ["/gani-products/gani_106_锡耶纳黄_large.webp", "/gani-products/gani_106_锡耶纳黄.webp"],
  },
  "106": {
    title: "序知",
    subtitle: "Petal Line",
    heroImg: "/gani-products/gani_107_序知_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_107_序知_large.webp", "/gani-products/gani_107_序知.webp"],
  },
  "107": {
    title: "点序",
    subtitle: "Dot Rhythm",
    heroImg: "/gani-products/gani_108_点序_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_108_点序_large.webp", "/gani-products/gani_108_点序.webp"],
  },
  "108": {
    title: "蓝屿",
    subtitle: "Blue Isle",
    heroImg: "/gani-products/gani_109_蓝屿_large.webp",
    color: "蓝色系",
    gallery: ["/gani-products/gani_109_蓝屿_large.webp", "/gani-products/gani_109_蓝屿.webp"],
  },
  "109": {
    title: "摩咔",
    subtitle: "Ripple",
    heroImg: "/gani-products/gani_110_摩咔_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_110_摩咔_large.webp", "/gani-products/gani_110_摩咔.webp"],
  },
  "110": {
    title: "影棠",
    subtitle: "Shadow Blossom",
    heroImg: "/gani-products/gani_111_影棠_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_111_影棠_large.webp", "/gani-products/gani_111_影棠.webp"],
  },
  "111": {
    title: "观境",
    subtitle: "Vista Scape",
    heroImg: "/gani-products/gani_112_观境_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_112_观境_large.webp", "/gani-products/gani_112_观境.webp"],
  },
  "112": {
    title: "岫石",
    subtitle: "Stone Breath",
    heroImg: "/gani-products/gani_113_岫石_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_113_岫石_large.webp", "/gani-products/gani_113_岫石.webp"],
  },
  "113": {
    title: "橘晖",
    subtitle: "Amber Glow",
    heroImg: "/gani-products/gani_114_橘晖_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_114_橘晖_large.webp", "/gani-products/gani_114_橘晖.webp"],
  },
  "114": {
    title: "银杏",
    subtitle: "Ginkgo",
    heroImg: "/gani-products/gani_115_银杏_large.webp",
    color: "米色系",
    gallery: ["/gani-products/gani_115_银杏_large.webp", "/gani-products/gani_115_银杏.webp"],
  },
  "115": {
    title: "晶彩",
    subtitle: "Crystalight",
    heroImg: "/gani-products/gani_116_晶彩_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_116_晶彩_large.webp", "/gani-products/gani_116_晶彩.webp"],
  },
  "116": {
    title: "衍构",
    subtitle: "Stone Frost",
    heroImg: "/gani-products/gani_117_衍构_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_117_衍构_large.webp", "/gani-products/gani_117_衍构.webp"],
  },
  "117": {
    title: "井构",
    subtitle: "Wellframe",
    heroImg: "/gani-products/gani_118_井构_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_118_井构_large.webp", "/gani-products/gani_118_井构.webp"],
  },
  "118": {
    title: "律格",
    subtitle: "Rhythm Grid",
    heroImg: "/gani-products/gani_119_律格_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_119_律格_large.webp", "/gani-products/gani_119_律格.webp"],
  },
  "119": {
    title: "十葵",
    subtitle: "Frame Arc",
    heroImg: "/gani-products/gani_120_十葵_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_120_十葵_large.webp", "/gani-products/gani_120_十葵.webp"],
  },
  "120": {
    title: "钛谷",
    subtitle: "Titanium",
    heroImg: "/gani-products/gani_121_钛谷_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_121_钛谷_large.webp", "/gani-products/gani_121_钛谷.webp"],
  },
  "121": {
    title: "藤屿",
    subtitle: "Vine Isle",
    heroImg: "/gani-products/gani_122_藤屿_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_122_藤屿_large.webp", "/gani-products/gani_122_藤屿.webp"],
  },
  "122": {
    title: "原点",
    subtitle: "Daybreak",
    heroImg: "/gani-products/gani_123_原点_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_123_原点_large.webp", "/gani-products/gani_123_原点.webp"],
  },
  "123": {
    title: "云筑",
    subtitle: "Whisper Line",
    heroImg: "/gani-products/gani_124_云筑_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_124_云筑_large.webp", "/gani-products/gani_124_云筑.webp"],
  },
  "124": {
    title: "星瓣月拼花",
    subtitle: "",
    heroImg: "/gani-products/gani_125_星瓣月拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_125_星瓣月拼花_large.webp", "/gani-products/gani_125_星瓣月拼花.webp"],
  },
  "125": {
    title: "月牙环拼花",
    subtitle: "",
    heroImg: "/gani-products/gani_126_月牙环拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_126_月牙环拼花_large.webp", "/gani-products/gani_126_月牙环拼花.webp"],
  },
  "126": {
    title: "白冰玉",
    subtitle: "",
    heroImg: "/gani-products/gani_127_白冰玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_127_白冰玉_large.webp", "/gani-products/gani_127_白冰玉.webp"],
  },
  "127": {
    title: "温德姆深灰",
    subtitle: "",
    heroImg: "/gani-products/gani_128_温德姆深灰_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_128_温德姆深灰_large.webp", "/gani-products/gani_128_温德姆深灰.webp"],
  },
  "128": {
    title: "成都木化石",
    subtitle: "",
    heroImg: "/gani-products/gani_129_成都木化石_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_129_成都木化石_large.webp", "/gani-products/gani_129_成都木化石.webp"],
  },
  "129": {
    title: "东方白",
    subtitle: "D9182824BM",
    heroImg: "/gani-products/gani_130_东方白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_130_东方白_large.webp", "/gani-products/gani_130_东方白.webp"],
  },
  "130": {
    title: "天府蓝水晶",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_131_天府蓝水晶_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_131_天府蓝水晶_large.webp", "/gani-products/gani_131_天府蓝水晶.webp"],
  },
  "131": {
    title: "米白洞石",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_132_米白洞石_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_132_米白洞石_large.webp", "/gani-products/gani_132_米白洞石.webp"],
  },
  "132": {
    title: "冰玉木纹",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_133_冰玉木纹_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_133_冰玉木纹_large.webp", "/gani-products/gani_133_冰玉木纹.webp"],
  },
  "133": {
    title: "白玉",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_134_白玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_134_白玉_large.webp", "/gani-products/gani_134_白玉.webp"],
  },
  "134": {
    title: "云映星城",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_135_云映星城_large.webp",
    color: "灰色系",
    gallery: ["/gani-products/gani_135_云映星城_large.webp", "/gani-products/gani_135_云映星城.webp"],
  },
  "135": {
    title: "雪照锦宸拼花",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_136_雪照锦宸拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_136_雪照锦宸拼花_large.webp", "/gani-products/gani_136_雪照锦宸拼花.webp"],
  },
  "136": {
    title: "雪照锦宸",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_137_雪照锦宸_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_137_雪照锦宸_large.webp", "/gani-products/gani_137_雪照锦宸.webp"],
  },
  "137": {
    title: "白金沙线灰拼花",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_138_白金沙线灰拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_138_白金沙线灰拼花_large.webp", "/gani-products/gani_138_白金沙线灰拼花.webp"],
  },
  "138": {
    title: "汉妮玉臻果",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_139_汉妮玉臻果_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_139_汉妮玉臻果_large.webp", "/gani-products/gani_139_汉妮玉臻果.webp"],
  },
  "139": {
    title: "白金沙拼花",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_140_白金沙拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_140_白金沙拼花_large.webp", "/gani-products/gani_140_白金沙拼花.webp"],
  },
  "140": {
    title: "定制米白洞石",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_141_定制米白洞石_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_141_定制米白洞石_large.webp", "/gani-products/gani_141_定制米白洞石.webp"],
  },
  "141": {
    title: "直纹白金沙",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_142_直纹白金沙_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_142_直纹白金沙_large.webp", "/gani-products/gani_142_直纹白金沙.webp"],
  },
  "142": {
    title: "苏州招商永旺拼花",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_143_苏州招商永旺拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_143_苏州招商永旺拼花_large.webp", "/gani-products/gani_143_苏州招商永旺拼花.webp"],
  },
  "143": {
    title: "苏州道壹号木纹",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_144_苏州道壹号木纹_large.webp",
    color: "棕色系",
    gallery: ["/gani-products/gani_144_苏州道壹号木纹_large.webp", "/gani-products/gani_144_苏州道壹号木纹.webp"],
  },
  "144": {
    title: "凝脂玉",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_145_凝脂玉_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_145_凝脂玉_large.webp", "/gani-products/gani_145_凝脂玉.webp"],
  },
  "145": {
    title: "仿古砖",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_146_仿古砖_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_146_仿古砖_large.webp", "/gani-products/gani_146_仿古砖.webp"],
  },
  "146": {
    title: "阿布扎比白",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_147_阿布扎比白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_147_阿布扎比白_large.webp", "/gani-products/gani_147_阿布扎比白.webp"],
  },
  "147": {
    title: "中旅白金沙拼花",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_148_中旅白金沙拼花_large.webp",
    color: "水刀拼花",
    gallery: ["/gani-products/gani_148_中旅白金沙拼花_large.webp", "/gani-products/gani_148_中旅白金沙拼花.webp"],
  },
  "148": {
    title: "大花白",
    subtitle: "工程定制产品",
    heroImg: "/gani-products/gani_149_大花白_large.webp",
    color: "白色系",
    gallery: ["/gani-products/gani_149_大花白_large.webp", "/gani-products/gani_149_大花白.webp"],
  }
};

// 每个产品的独立文案（来自gani.com.cn，品牌名已替换为东升）
const productCopy: Record<string, string[]> = {
  "0": ["灵感源自巴西天然石材中的“粉色贵族”，它因粉玉般的基底与光斑流转", "受到人们的青睐，被赋予“朱丽叶水晶”的雅称", "我们完整保留其最具辨识度的粉玉底纹，减少杂乱的纹理", "使其更有艺术感，契合现代空间", "柔美而不张扬，正是浪漫主义空间的语言，愿成为你心中隐世桃源的背景"],
  "1": ["灵感源自巴西米纳斯吉拉斯州一款备受推崇的珍稀花岗岩，", "其深邃基底中洒落的金银矿物，宛如凝固的星空，因此得名“宇宙金”", "我们从海派建筑的“骑楼光影”中汲取灵感，编织成更具叙事感的流动祥云纹样", "这不仅是对自然奇观的致敬，也融入了东方文化中对尊贵与祥瑞的审美", "为空间奠定深邃静谧、暗藏华彩的艺术基调"],
  "2": ["灵感源自巴西矿山的天然大理石，它因优雅的外观而闻名", "动人的色彩混合创造出流动感和视觉吸引力", "其名呼应南美安第斯山脉的壮丽景观，象征力量与永恒", "我们理解顶级空间对格调的追求，提炼原生纹理中极具流动感的脉络", "将底色稳定于高级的象牙白  为还原天然石材润透感与原生包浆效果", "推出亲肤细腻的缎光面，将雪山气场凝练为充满秩序感与艺术张力的空间背景"],
  "3": ["灵感源自巴西矿脉的珍稀石材，其名取自“天山暮雪”的意象，象征高洁与永恒", "面对这份自然的杰作，我们在设计中弱化局部繁复纹理，令艺术张力归于从容", "让经典奢石质感自然嵌入高端生活，适配从海派摩登洋房到现代顶奢私邸"],
  "4": ["稀有的蓝，自古便是身份的象征。西方仅供皇室珍藏，中国古代称“帝青色”，为品官以上专属。", "经典宝石蓝，灵感正是源自被历史选中的巴西天然石材，被称为“石中蓝钻”。自开采以来，仅为少数顶级空间专属。", "我们还原它深邃而富有变化的钻蓝色，推出能呈现亮、净、透的晶钻效果的臻石面，只为匹配真正懂得品味的奢享空间，彰显非凡气度。"],
  "5": ["灵感源自意大利“石头城”马泰拉的天然石材，凝结着地中海的阳光与数个世纪的人文痕迹", "色调温暖而质朴，常被视为“实力与颜值并存”的材质代表", "我们捕捉了这份独特的温暖，并通过设计重组，让原本粗粝的岩块呈现出舒缓的视觉节奏", "在保留岩石温度的同时，实现大面积铺陈，为空间营造出有故事感的温暖衬景"],
  "6": ["它是文明载体的沉默见证者——法国卢浮宫、凡尔赛宫外立面皆有其踪迹", "和光石的灵感源自克罗地亚的天然石材，其肌理是远古海洋的沉积日记，记录着静谧的时光", "我们保留自然印记，又提升视觉统一性，弥补原生材质在强度与耐污上的局限", "适配从局部到墙地大面积应用的多元场景，成为包容日常生活、有呼吸感的底色"],
  "7": ["灵感源自意大利阿尔卑斯山脉的天然石材， 这片产区孕育了众多世界顶级石材", "它被誉为“白色艺术品”。在西方艺术史中常被用于雕塑与建筑，象征高贵与永恒", "我们深知经典无需修饰，精准还原其雪白基底与灰纹的独特质感", "让这份西方艺术史的顶级材质，以纯粹面貌，适配多元住宅的经典白色背景", "成为日常生活中触手可及的高级感"],
  "8": ["灵感源自意大利皮埃蒙特的大理石，它是帕维亚大教堂、米兰和平门等欧洲经典建筑的华贵立面材料", "记录着阿尔卑斯山脉的地质故事", "我们尊重这份悠久的历史与自然的叙事感", "针对原生直纹的局部断连问题，我们强化干净利落的延伸感", "叠加金沙颗粒工艺，还原原石中的细碎金点", "特别设计东西方共通的经典回字纹，在现代空间中焕发新的装饰趣味"],
  "9": ["灵感源自纳米比亚的大理石， 其矿脉与传奇的苏迪白相邻", "共享着顶级白色大理石的血统,拥有简约雅致的气质", "我们忠实还原其纯净的乳白基底与独特的碎块肌理", "填补白色石材中细根纹与流纹之间的风格空白", "以百搭的底色，成为营造纯净、宁静氛围的理想选择，一如其名所喻的隐世之境"],
  "10": ["灵感源自意大利珍稀名贵石材，延续奢石润白色调", "我们通过优化深浅反差强烈的肌理结构，极致还原层块堆叠与似连非连的自然美感", "纹理如轻盈的云海，带来远离喧嚣的灵动气质，为空间注入雅致静谧的氛围"],
  "11": ["原石产自非洲", "以灰白色为基底", "地质层般的天然肌理厚重而深邃", "整体优雅、简约，沉稳中勃发永恒的结构之美"],
  "12": ["灵感源自巴西珍稀蓝水晶奢石，浅湖蓝与纯白交织为底，缀以星芒般结晶", "我们提炼静谧底色、重构纹理节奏，兼顾自然诗意与现代秩序", "适配轻法式、简约风格，贴合宁静浪漫的人居需求"],
  "13": ["原石主要产自意大利托斯卡纳矿区", "与经典Calacatta大理石同源", "因其独特的紫色纹理而闻名", "尽显奢华与灵动之美"],
  "14": ["原石采自意大利", "雾白含砂，墨韵氤氲", "化一方含蓄雅致山水之境", "以低饱和笔触", "静诉东西方美学共鸣"],
  "15": ["南极，无数人心目中向往的神圣秘境", "汲取冰川的清冷融入如玉石的温润质感", "带来诗意般的纯净之美"],
  "16": ["原石产自非洲", "以灰白色为基底,丝带状纹理在岩层肌理间游走", "简约中凝练非凡格调", "沉稳中勃发永恒的结构之美"],
  "17": ["菲拉格慕开采于意大利，用于室内高档装饰", "纯净的暖灰色调带来舒适体验", "灰白色深浅不一的细腻纹理，也如浩渺的水墨云雾", "温润的质感营造出柔和宁静的氛围", "将深厚的文化韵味与简约的时尚风格融汇在一起", "风格百搭，尤其适合大面积使用"],
  "18": ["以月光为设计灵感，浅米色主调如月光轻抚大地，柔和而舒缓", "当视线轻轻扫过，随角度以及光影的变化流转，呈现出含蓄迷人的细腻光泽", "3D工艺精准复刻岩层风化的自然肌理，营造纯净深邃的空间意境", "仿佛将人引入一片被月光温柔笼罩的神秘之地", "适用于追寻细腻质感与宁静氛围的品味之士"],
  "19": ["灵感源自巴厘岛火山，以沉敛的灰调灰为底色", "丝缕纹理如火山岩冷却时留下的独特脉络", "采用精细抛光工艺，完美凸显石材的天然肌理", "在这高密度的时空密度里，安宁感自心底蔓延"],
  "20": ["灵感源自非洲草原的晨曦时刻", "灰咖调如同黎明时分大地与天空的交融，交织的纹理似草原上流动的沙砾", "3D工艺精妙还原亿万年风化轨迹，将原始野性凝练为现代空间的静谧画卷", "为居住者在茫茫草原中找到了温暖的栖息地"],
  "21": ["原石源自巴西米纳斯吉拉斯州", "以粗粝块状与细腻线纹交织，在沉稳灰度中律动原始生命力", "细哑面工艺，完美复刻亿万年前地质运动的层叠肌理", "釉面经特殊处理后，触感如抚过天然大理石的温润表皮"],
  "22": ["取材意大利恒久传世的珍稀矿脉，", "在延续经典墨绿色调基础上，以16道高精丝网叠加1道智能喷墨的突破性工艺，", "使墨绿底蕴呈现从晨雾到深林的丰富层次。", "釉面下若隐若现的结晶脉络，如初春冰裂时迸发的自然张力，", "赋予空间内敛奢华与永恒质感。"],
  "23": ["原石产自意大利卡拉拉矿区", "--文艺复兴巨匠米开朗基罗《大卫》的诞生之地", "以纯白基底、细腻纹理而得名", "赋予空间自然与高贵并存的气质"],
  "24": ["人间初雪，露水结成霜雪染尽大地", "万物褪去了缤纷回归本真的状态", "生命的脉络历经沉淀变得更加鲜明成熟"],
  "25": ["云雾白石材源自朝鲜", "朝鲜羊角岛国际酒店采用了此款石材", "以白色为基调，穿插着多种深度的灰色流纹", "如天空中云雾般自然协调", "从现代到传统美学", "这款优雅精致的天然石材可完美配合任何设计"],
  "26": ["雪白的底色如云般纯净洒脱", "用墨色浓淡勾勒出如云海般的灵动缥缈", "起伏交融间体悟笑观云卷云舒的豁然通达"],
  "27": ["纯粹柔和的底色自带直抵人心的高贵质感", "与轻盈的纹理彼此辉映", "雪域秘境的清雅与浪漫油然而生"],
  "28": ["纯粹的底色透着玉石般温润的质感", "灰色流纹如同绵延的山脊线", "整体简约时尚又不失格调"],
  "29": ["卡拉拉白开采于意大利", "以自然雕刻的图案为特色", "与顶级雪花白并称为", "罗马时期以来最受欢迎的室内装修用料", "纹理犹如一幅山水画，很柔和，洁白通透"],
  "30": ["皇家白玉大理石开采于丹麦", "犹如独特而奢华的白色天然玛瑙", "米黄色深浅变化，与白色纹理叠加、融合", "更彰显了白玉的纯白与冰澈", "温润的玉质感适合古典与现代的各种奢华空间", "也是柜台面、壁炉和盥洗台的首选"],
  "31": ["开采于意大利中部的", "托斯卡纳卡拉拉地区附近的采石场", "以乳白色为底色", "配以错落有致的金灰色纹理", "彰显了其优雅、细腻的质感"],
  "32": ["纯白色坯底上看似随意", "却独具匠心地点缀着浅金色块", "更有简约大气的浅灰色线条状纹理穿插其中", "纵横交错，似有无穷变幻", "凸显莹亮而温暖的质感"],
  "33": ["新品雅士白开采自希腊，被誉为“最好的大理石”", "并因其白色背景上浅灰色的深纹理而备受赞誉", "兼顾古典和现代风格", "在浴室、厨房、住宅、地板和墙壁上", "增添优雅和个性"],
  "34": ["白玉，开采于土耳其", "世界上最著名的大理石国家之一", "浅灰色和白色的纹理标志着其不同层次的沉积", "其柔软细腻的效果，经常被用于浴室洗脸台", "也被广泛应用在十分高端的项目的地板和墙面覆层"],
  "35": ["这款特别的大理石仅能从", "意大利托斯卡纳北部的卡拉拉的山上被提取", "以其纯白色背景下", "大胆富有戏剧性的灰色纹理而闻名", "可以在欧洲各地的大教堂和城堡中找到这款大理石", "如巴黎圣心大教堂，意大利圣母百花大教堂、", "北美第一高建筑多伦多塔的旋转餐厅"],
  "36": ["雅士白石材采于希腊", "其希腊名字意味着 \" 最佳大理石 \"", "白色的白云石背景被斜纹细线分解", "增添内部的魅力", "可以与其他彩色大理石相匹配", "在每个空间添加对比度和个性"],
  "37": ["以经典石材巴西熊猫白为创作蓝本", "结合釉艺、蚀纹、精磨等工艺呈现如蜜蜡琥珀般温润质感", "黛黑、鹤灰和墨绿等奢石晶体的巧妙融合", "构成极具张力且富有韵律的主体肌理，宛如雪霁归春舒展的新绿", "在大气与宁静之间，展露属于东方的大美意境和生动气韵"],
  "38": ["取材意大利珍稀名贵石材", "整体延续奢石润白色调", "通过优化调整深浅反差强烈的肌理结构", "极致还原奢石层块堆叠与似连非连的自然美感", "如壮阔轻盈的云海，带来一种远离喧嚣的灵动气质"],
  "39": ["取材意大利珍稀名贵石材，整体延续奢石润白色调", "通过优化调整深浅反差强烈的肌理结构", "极致还原奢石层块堆叠与似连非连的自然美感", "如壮阔轻盈的云海，带来一种远离喧嚣的灵动气质"],
  "40": ["产品纹理高雅华贵通体润泽", "大面积乳白打底，奠定空间温润的基调", "搭配鲜明的灰金流线型纹理", "在自然光的烘托下，提升空间明亮度"],
  "41": ["纯白的基底之上", "随性不羁的肌理如起伏的山峦线", "暖色根纹的点缀", "如同傲立于风雪中的寒梅", "给人以踏雪寻梅的阔达意境"],
  "42": ["灵感源于意大利西海岸地区自然岩石形成的脉络", "复刻大自然原生纹理，色彩洁白，质感纯净", "散发天然的柔美气息", "灰白相间的纹理大方舒展着，色泽深浅不一", "丰富空间层次感，给平淡的生活带来曼妙气息", "罗马广场、圣德彼大教堂、维罗纳香草广场等著名建筑可以看到原石材的应用"],
  "43": ["源于希腊北部", "希腊伯爵白白色的背景上覆盖着细腻的灰色纹理", "符合全世界任一地方对\"经典\"大理石的共识而被深受青睐", "可用于各种室内，能够完全兼顾到古典或现代的氛围", "著名的北京饭店、香港天际万豪酒店就采用了希腊伯爵白石材"],
  "44": ["初春的风唤醒蛰伏的诗意", "万物冒出新芽拉开生命的序幕", "一切美好都会在四季流转中如约而至"],
  "45": ["天然茶色搭配碎石般的纹理", "带来波光粼粼的质感效果", "有着薄纱般的朦胧美感", "轻松塑造柔和舒适的精致空间"],
  "46": ["古罗马灰开采自希腊，橄榄褐色调经典优雅", "斜纹层次分明，充满大自然气息", "适用于高品质的现代风格空间设计", "如书房、卫浴、客厅的地墙等", "著名的西班牙马德里普拉多美术馆就采用了古罗马灰原石"],
  "47": ["细劲饱满的肌理", "宛如黄河九曲的流脉流淌在辽阔的华夏原野之上", "辅以温暖的大地黄作主调", "展露属于东方的生动气韵"],
  "48": ["高度还原舒适柔和的米色及晶体细线极致质感", "经典的色系和纹理搭配", "更加适应现代生活的悠闲与舒适"],
  "49": ["开采于意大利蒂沃利地区的石灰石", "是伟大雕塑家们最喜爱的石材之一", "香格娜米黄的暖色以白色、米色和象牙色的三种颜色的排列而成", "颜色的交替创造了这种永恒石灰石的典型深度", "当代艺术殿堂、意大利罗马国立当代艺术馆采用了香格娜米黄大理石"],
  "50": ["非洲米黄大理石源于意大利", "米黄的背景上呈现暖白的纹理", "看上去却依然像一块色彩均匀", "和谐统一的大理石，温暖优雅", "埃及最大的神庙卡纳克神庙采用了非洲米黄大理石"],
  "51": ["恰到好处的色度如同冬日暖阳般温暖舒适", "与燕窝盏状的冰裂纹理相得益彰", "空间既温馨舒适，又明亮大气"],
  "52": ["取材巴西珍稀名贵石材，提取奢石稀贵的金丝线", "纹，糅合月灰、橙黄、雅棕等同色系细致肌理衬托", "微妙的色彩渐变和冰絮状晶体结构的打磨造就更灵", "动立体的自然肌理，辅以水晶般通透温润的质感", "如同一片自由漫游的轻云，安宁、平静、惬意。"],
  "53": ["采撷意大利经典名贵石材", "延续奢石柔和的米黄基调，采用东升独创 3D ink 多模态融合技术", "通过对色彩、纹理和结构的精妙匹配", "极致还原奢石优雅的自然韵味与历经岁月沉淀的质感", "赋予空间温暖舒适的人文氛围"],
  "54": ["采撷意大利经典名贵石材，延续奢石柔和的米白基调", "采用东升独创 3D ink 多模态融合技术", "通过对色彩、纹理和结构的精妙捕捉与融合", "极致还原奢石优雅的自然韵味，以及历经岁月沉淀的质感", "赋予空间自然舒适与岁月静好的人文氛围。"],
  "55": ["既像木又像石", "完美融合原木的温暖和灰色的质感", "在细节中还原宁静致远的意境之美"],
  "56": ["复刻原始石材的质感", "芬迪灰刻意规避浮夸的色调与繁复的纹路", "采用简约干净的灰白基调", "搭载原石细腻而随", "性感的自然纹路", "带来舒适、安宁的心境与空间氛围"],
  "57": ["意大利云灰的灵感来源于意大利亚平宁山脉", "通过提取、重构、组合设计手法", "将山脉的线条美感呈现于砖面之上", "一丝一缕此起彼伏", "细腻律动的线条赋予了意大利云灰独特的自然之美", "方寸之间见天地"],
  "58": ["一款优雅而精致的浅灰色土耳其大理石", "深灰色使石材质感更加强烈", "清晰的裂纹质感突出时尚动感的外观效果", "在各种空间中均能展现极致的奢华雅致空间效果", "美国纽约古根海姆博物馆就是用了阿波罗银原石"],
  "59": ["开采于伊朗，保加利亚灰大理石以黑色为基调", "夹杂着纯白色与浅灰色线条受到世界的热捧", "多与白色系或灰色系大理石相搭配应用于大面积区域", "伊朗首都德黑兰的地标建筑工程组织", "库姆中央大厦就运用了保加利亚灰原石"],
  "60": ["凝聚玉石的天然质感和丰富层次的金色纹理", "犹如阳光下波澜壮阔的海浪", "空间的开阔感一览无遗"],
  "61": ["设计灵感源自意大利托斯卡纳地区自然岩石形成的脉络", "宁静灰调，融入欧式时尚", "其纹理细腻柔和，深浅不一，随性延展", "灰咖遇上精致白", "不规则点线错综交替营造丰富的空间层次感"],
  "62": ["沉稳雅致的灰调搭载不同形态的纹理", "彼此映衬如同深邃、静谧、内敛的虚空之境", "透着不露锋芒的高级感"],
  "63": ["铺垫、积累、蛰伏、曙光", "当凛冬走到了尽头，大地归于沉静", "蛰伏的生机正酝酿着一场盛大的春天"],
  "64": ["沉稳雅致的深灰加上白色晶体的点缀", "犹如夜空中的星辰", "低调中透着自然灵动的美感"],
  "65": ["巴洛特灰原石材开采自意大利", "以雅致灰色调为底，细小白色纹理随意游走其中", "拥有逼真细腻的裂纹质感", "深浅不一的灰白色纹理自然过渡", "呈现低调典雅气质", "捕捉石材的天然美感"],
  "66": ["贝纳，法国一座自然与人文交相辉映的小镇", "沉稳的灰调恰如小镇的静谧", "微妙的纹理像清晨的微风", "裹挟着淡淡的法式面包香", "悠然舒心"],
  "67": ["亚马逊雨林，一个与世隔绝的伊甸园", "引入雨林水流的曲线与色彩", "将雨林的宁静带到喧嚣的城市", "造一方清雅之地"],
  "68": ["云朵灰开采自意大利", "纵横交错的奶油色和青铜色纹理", "呈大片灰白色簇拥而开的云状", "这款富有魅力石材的表面均匀一致", "灰白色调给人一种安宁、平静的视觉感受", "意大利著名的米兰大教堂就采用了云朵灰原石"],
  "69": ["纯净清浅的灰调", "不张扬有着与生俱来的高级感", "独特的闪电状金丝纹自带岁月的沉静之美", "不动声色却悄悄惊艳", "远看淡然，近看有质"],
  "70": ["开采自巴西的鱼肚灰以中性灰调为底，", "表面有灰白色纹理层层叠叠", "呈现簇拥云雾状", "可以为任何设计项目带来恬静优雅的氛围", "提高空间格调"],
  "71": ["希腊灰是一款开采于意大利的独特灰白色大理石", "烟灰色着色颇为独特 , 色调差异明显", "灰色纹理与白色纹理呈线条状流动 , 大气、动感、自然", "呈现雅致奢华的空间效果", "这款大理石是室内项目如浴室、", "厨房和地板入口处的理想选择", "联合国总部大楼就是用了希腊灰原石"],
  "72": ["没有雍容华丽的灿烂", "素净而不张扬的灰调", "搭载金黄调的裂纹线条点缀其中", "释放出高级的奢雅感"],
  "73": ["充满轻甜质感的米灰色调", "如奶油般轻盈、温柔", "纤细的线纹还原自然本质的细腻美感", "为空间带来治愈人心的奇妙力量"],
  "74": ["云棕灰，原石产自土耳其", "浅浅的暖烟灰色调 , 纵横交错的白色纹理", "这款富有魅力的石材表面均匀一致", "灰白色调给人一种宁静平和、温馨简约的视觉享受", "大面积铺贴下，纹理不断线的流畅美", "展现极致的奢华大气、自然雅致的空间效果"],
  "75": ["云朵拉灰是土耳其的一种变质岩", "云朵拉灰表面有明显结晶效果", "雅致灰色为底，搭配白色和褐色的线条", "尽显优雅飘逸质感", "尽显优雅飘逸质感"],
  "76": ["幻彩白麻是产品中唯一一款为阳台空间研发的产品", "原石材源自巴西 , 是一款花岗岩石材", "洁白的表面分布着黑色点状型流线纹理", "蕴含着一种阴阳太极美感", "是高档住宅室外阳台的首选"],
  "77": ["取材意大利珍稀名贵石材", "在延续奢石高纯净度底色基础上，巧妙融入棕灰色块", "借由丰富微妙的色块变化增强底色的细节感", "如同一夕流星唤醒万籁俱寂的天地", "油然生出一种沉稳大气、深邃静谧的意境"],
  "78": ["取材意大利珍稀名贵石材", "在保留奢石细腻的方解石和小砾石特质基础上", "融入灵动轻盈的晶体线条纹理", "内敛沉静的灰调自带东方隐奢气质", "带来一种微妙而深远的空间张力"],
  "79": ["设计灵感源于土耳其自然岩石形成的脉络", "纹理平静柔和，给人以和谐统一的视觉感受", "灰黄底色柔和温暖，天然纹理细腻雅致", "让整体空间极具亲和力，感性之中绽放优雅格调", "营造轻松自由的生活氛围", "在圣索菲亚大教堂、古堡酒店、金洛奇度假庄园等", "建筑均能看到原石材的应用"],
  "80": ["英格兰灰设计灵感源于英国卡菲利古堡", "古堡倒影在湖心形成的独特纹理作为创意的起源", "产品整体以灰为主调，通过灰调的明暗变化展现错", "综复杂的纹理结构，营造了清澈沉静而又蕴含历史", "文化的空间氛围，将静谧高级融入在细节里"],
  "81": ["设计灵感源于土耳其自然岩石形成的脉络", "整体以暖灰为主调", "通过不同程度灰度的微妙变化", "带来暖人心魄的视觉感受", "泛着灰白的纹理飘荡", "张力无限，使空间充满格调与品位"],
  "82": ["取材世界著名稀有蓝色宝石", "采用半透明方钠石晶体搭配独特的蓝色釉料", "还原奢石天然晶体效果和薄切透光质感", "蓝白相间融入金色云母晶髓", "纹理更具韵律感和深度感"],
  "83": ["皇家蓝是一款开采于巴西的珍贵石英岩", "深浅不一的蓝色", "其表面搭配以烟雾状的白色纹理", "可以给任何项目带来优雅和精致的气氛", "是园林绿化墙和室内工程的完美选择"],
  "84": ["开采自意大利的蓝贝露", "是白云岩中真正的宝藏", "颜色密集且多样", "从古典粉到深紫红，从蓝色到灰色", "非常适合用于室内和外部设计", "深圳希尔顿南海酒店就是采用了蓝贝露瓷砖"],
  "85": ["灵感源于意大利自然岩石形成的脉络", "大片纹理自然流淌，宛若无尽大海之上的浪花", "随性洒脱，迷离朦胧，为空间增加几抹生机", "其清晰的纹理色彩撞击", "让自由的因子活跃在瓷砖上", "给空间带来自然灵动", "大面积连纹效果还原石材的自然大气", "置身其中亲自感受天然的赠与"],
  "86": ["二月的春雨，细密绵长", "像轻柔的夜曲催促着新生的步伐", "春雨落下的痕迹", "终将收获春暖花开的精彩"],
  "87": ["在意大利托斯卡纳", "满眼的橄榄林在金色的阳光下交相辉映", "孕育了鎏金岁月的设计灵感", "以岁月为纹，以自然为彩", "在光的照射下散发出意式的奢华与自然的宁静"],
  "88": ["新皇室灰以水为灵感载体", "不同色度的灰色调产生丰富的层次立体感", "似奔腾不息的长江与黄河", "波澜壮阔，浑厚大气", "拥有天生的主角光环新皇室灰", "空间效果更显大气高端"],
  "89": ["黑白根大理石起源于意大利", "黑色的背景上是优雅细腻的白色云状纹理", "被认为是高品质的黑色系大理石并受到全球设计师的青睐", "著名的德国法兰克福商业银行大厦就采用了黑白根石材"],
  "90": ["开采自意大利的大理石以其黑色的背景", "和大胆的白色纹理而独具特色和原创性", "劳伦斯金大理石具有其他石材无法媲美的个性及排他性", "打造出与众不同的家庭和公共空间", "劳伦斯金可以用来实现优雅和时尚的地板", "现代化的覆层和楼梯", "意大利威尼斯公爵宫大量采用了劳伦斯金石材"],
  "91": ["取材世界著名稀有石材", "运用定位透光陶瓷工艺等多重技艺加以创作并丰富", "形成凹凸有致的肌理质感", "光线下红色品体石榴籽透着宝石般深邃的光华", "与银灰基底交相辉映如榴花蔓生纷繁有序", "几分幽远 , 几分宁静"],
  "92": ["江南可采莲，莲叶何田田", "绿色肆意生长的盛夏", "不过是清风，蝉鸣，一池荷香"],
  "93": ["在英国苏格兰高地", "苍翠的山脉与神秘的湖泊", "交织出一幅宁静自然的画卷", "汲取这片自然美景为灵感", "将高地的神秘与壮美融入设计之中", "让人时刻感受到大自然的陪伴"],
  "94": ["四季绿洲这款顶级原石开采于法国"],
  "95": ["基调为浅绿色，褐色和奶油色相间", "这款特别的玉石开采自巴西", "完美地赋予浴室或温泉区域", "一个自然和原始的外观", "帮助你获得内心舒适和从周围的环境中感到舒心", "世界著名的美国西雅图中央图书馆就应用了亚马逊绿原石"],
  "96": ["紫黛之上，苍、碧、靛、青", "色彩层次自然过渡", "勾勒出山石的自然脉络与质感", "清雅的纹理如同绿水沿着蜿蜒曲折的山脊汩汩流淌", "舒适、怡然、大气"],
  "97": ["设计灵感源于挪威高山上由千层岩、角闪石、", "石榴石结晶在一起的罕见纹理", "色彩丰富和谐，轮廓若隐若现却又层次分明", "犹如油画般奇幻", "如青山、如麦田、如庄稼成碧浪、", "给平淡的生活营造出舒适放松的感觉", "让人有一种遐想的空间"],
  "98": ["设计灵感源于意大利卡拉拉地区自然岩石形成的脉络", "以绿线带金丝，色调柔和温馨，纹理高雅华贵", "飘逸灵动的线条使得整个空间更纯净、时尚", "在意大利米兰大教堂、西班牙巴塞罗那圣家堂、", "英国白金汉宫、德国柏林勃兰登堡门等建筑", "可看到原石材的应用"],
  "99": ["采撷意大利经典名贵石材，延续奢石柔和的米白基", "调，采用东升独创 3D ink 多模态融合技术，通过", "对色彩、纹理和结构的精妙捕捉与融合，极致还原", "奢石优雅的自然韵味，以及历经岁月沉淀的质感，", "赋予空间自然舒适与岁月静好的人文氛围。"],
  "100": ["石中有木", "独特的木纹纹理带来强烈的空间延伸感", "灵动线条带来有节奏的空间律动", "更显端庄的独特气质。"],
  "101": ["阿玛尼棕开采于意大利", "经典而温馨的浅褐色色调，点缀着精致的蜂蜜色纹理", "承载了珍贵大理石的优雅美态", "缔造高品质的生活空间，其精致适合大部分应用", "如室内设计，尤其是地板和梳妆台台面等元素", "世界第一高楼迪拜塔就采用了阿玛尼棕原石"],
  "102": ["四季粉是对大地万千色彩的礼赞,灵感源于法国近乎绝迹的“四季春”,以虹彩笔触凝住时光的斑斓--浅粉如初绽的野樱,鼠尾草绿似拂过草甸的微风,而酒红是深秋层峦的一瞥。温润水洗工艺,营造丰富立体的艺术效果,无需远行,抬眼即可赏遍四季山川。"],
  "103": ["人间暮秋，银杏黄了枫叶红了"],
  "104": ["来自西班牙的西施红大理石", "是一种典型金粉颜色背景温暖均匀", "拥有棕色和白色的小接缝和斑点的特征", "使其在任何室内空间都可带来愉快和欢迎的感觉", "西施红可应用在优雅的地板，镀层， 楼梯", "“宫殿之城”西班牙阿兰布拉宫（红宫）、", "中国太原著名的洪洞大槐树酒店就应用了西施红原石"],
  "105": ["如灿烂的向日葵般的大理石"],
  "106": ["走进酒店公区，黑白拼花地面即刻映入眼帘", "白色基底搭配黑色几何图案，仿佛夜空中闪烁的繁星", "又似波涛中跳跃的浪花，灵动而富有韵律", "拼花设计巧妙地平衡了空间的稳重与轻盈", "让酒店公区在现代简约中透着艺术气息。"],
  "107": ["藏在几何里的时光密码", "踩过这些菱形纹样", "仿佛能听见岁月在脚下低语", "层次之美:粗细变化的线条勾勒立体感", "风格适配:轻松融入复古、欧式或中式空间"],
  "108": ["灵感源自古典建筑的对称美学与现代时尚的极简线条", "花窗元素的雕纹，赋予拼贴艺术以优雅庄重的气质", "棕色质感的点缀，则为其增添利落与精致感", "二者的巧妙结合，打造出这款蕴含历史韵味又贴合当代审美的艺术拼贴"],
  "109": ["灵感源于波浪曲线图案，行止自如的流畅曲线", "如舒展的绸帛般在地面自由延展，交织出温润涟漪", "似微风轻吻水面，漾开层层柔波", "将凝固的石材赋予流动的呼吸感", "空间因这起伏的韵律而轻盈生动。"],
  "110": ["法式浪漫的当代注解", "当东方白大理石瓷砖邂逅花窗灵感", "地面便绽放出永不凋零的花", "时空对谈：古典花窗的现代转译", "仪式感：让日常进出都值得被珍藏", "艺术廊厅：静谧底色适用于任何需要被温柔对待的空间"],
  "111": ["藏在几何里的幸运絮语", "踩过这些图案", "连脚步都会变得轻快起来", "在现代与复古间自在游走", "幸运方程：重复图案暗藏美好期许", "色彩私语：米白与浅黄的温暖搭配"],
  "112": ["时光凝固的艺术", "当黑与米白在几何间起舞", "空间便有了岁月的温度", "色彩叙事：午夜黑与温润米白的对话", "空间雕塑：用不规则几何重塑视觉平衡"],
  "113": ["让客厅墙面会说话", "干净利落的几何图案", "藏着不简单的设计心思", "明亮氛围：让归家时刻值得期待", "空间适配：现代简约客厅、餐厅背景"],
  "114": ["海派风情的平衡与和谐", "光脚踩过这些纹样", "仿佛能听见老唱片里的歌声", "风格叙事：灵感源自海派建筑，", "灰白配色与对称构图，古典又现代", "空间适配：学者客厅、茶室阳台、文化质感空间"],
  "115": ["灵感源自法式建筑与自然之美", "素雅底色衬托几何图案", "展现繁华中的宁静秩序", "纹样特点：自然灵动的法式对称美学", "空间适配：艺术家居所、轻奢风格客厅、追求优雅氛围的空间"],
  "116": ["解构经典，重构现代", "汲取中国传统方胜纹精髓", "方正菱形交叠构建几何美感", "纹样特点：秩序与留白的完美平衡", "空间适配：新中式风、文化主题展示空间、追求现代艺术感的场所"],
  "117": ["都市玄关的第一眼", "当脚步轻触这些交错的线条", "空间便开始诉说摩登故事", "秩序之美：简练纹样构建现代韵律", "空间适配：完美适配玄关与过渡区域"],
  "118": ["当脚步遇见城市的韵律", "用深浅交错的直线", "在您脚下复刻都市的脉搏", "秩序之美：黄金分割的网格阵列，延伸空间感", "隐形引导：线条自然指向关键区域", "现代基因：灵感来自构成主义艺术与都市规划"],
  "119": ["纹理源于传统井字纹", "这种独特的几何形态，既有方形的规整与现代感", "又因弧形的融入而多了几分柔和与圆润，整体构型中正平衡", "透露出宋韵极简与现代几何的融合之美", "为空间注入静谧而隽永的底蕴"],
  "120": ["以石材为笔，以空间为笺", "勾勒出立体的方形轮廓", "当其大面积铺陈开来，几何单元于韵律中轻盈复现", "锐利的线条与模块化的构成，赋予地面强烈的结构秩序感", "为现代摩登空间奠定理性而前卫的视觉基调"],
  "121": ["感源于繁华都市的街道布局与现代艺术构成", "都市中棋盘式的街道规划，横竖交错的线条充满秩序感", "为拼花图案提供基础框架；现代艺术中的构成主义", "强调几何图形的组合与对比，赋予拼花独特的视觉冲击力"],
  "122": ["贴近大地的质朴感", "方与菱的秩序共舞", "米黄与棕的温暖调色盘", "视觉韵律：规整中跳动的灵动细节", "空间适配：客厅过渡区、庭院地面、自然系商业空间"],
  "123": ["东方的呼吸感", "当回字纹遇见现代解构", "地面便晕染开一片水墨意境", "文化转译：传统纹样的当代演绎", "视觉韵律：深浅错落如云影徘徊", "空间疗愈：为洽谈区注入静谧能量"],
  "124": ["工程定制产品"],
  "125": ["工程定制产品"],
  "126": ["工程定制产品", "型号 TD9182365BM-S"],
  "127": ["工程定制产品", "型号 TD9185637BM-S"],
  "128": ["工程定制产品", "型号 TD9182128N"],
  "129": ["工程定制产品"],
  "130": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "131": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "132": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "133": ["TD9182822BI-S / TD9182822NF-S"],
  "134": ["TD9182107BM / TD9182107NF"],
  "135": ["TD9182361BM/TD9182361NF"],
  "136": ["TD9182340NF/BM/BS"],
  "137": ["TD9182403BM/TD9182403NF/TD9182403SP"],
  "138": ["TD9272376BM"],
  "139": ["TD9182382SP"],
  "140": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "141": ["TD1262399N-1"],
  "142": ["TD9182448BM", "宝格丽灰、成都木化石"],
  "143": ["TD9182447BM"],
  "144": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "145": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "146": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
  "147": ["TD9182425BS"],
  "148": ["白色，是所有颜色的起点，也是终点。在石材的世界里，白色系大理石以其纯净的底色和灵动的纹理，成为永恒的经典。东升精选全球顶级矿源，从选料到切割全程把控，确保每一块板材纹理自然、色调均匀。"],
};

export default function CollectionDetail() {
  const { lang, t } = useLang();
  const { id } = useParams<{
    id: string;
  }>();

  const data = (id && productData[id]) ? productData[id] : productData["0"];
  const colorKey = `collections_color_${data.color}`;
  const englishTitle = data.subtitle && !data.subtitle.includes("工程定制产品")
    ? data.subtitle
    : t("collections_custom_stone");
  const displayTitle = lang === "en" ? englishTitle : data.title;
  const displayColor = t(colorKey);
  const intro = lang === "en"
    ? [t("collection_detail_description", { product: englishTitle, color: displayColor })]
    : (productCopy[id!] || [t("collection_detail_missing_description")]);

  if (!id || !productData[id]) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#111] mb-4">{t("collection_detail_not_found")}</h1>
          <Link to="/collections" className="text-[#111] font-bold tracking-[0.06em]">← {t("collection_detail_back")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] bg-[#e5e5e5] overflow-hidden">
        <img src={optimizedImage(data.heroImg)} alt="" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/70 text-[11px] font-bold tracking-[0.18em] uppercase">{data.subtitle}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.02em] mt-3 mb-3">
              {displayTitle}
            </h1>
            <span className="inline-block text-white/50 text-[12px] tracking-[0.08em] border border-white/30 px-4 py-1.5">
              {displayColor}
            </span>
            <div className="mt-4">
              <Link to="/collections" className="inline-block text-white/50 text-[12px] tracking-[0.08em] hover:text-white transition-colors">
                ← {t("collection_detail_back")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 文案 */}
      <section className="max-w-[920px] mx-auto px-6 py-20">
        <div className="space-y-6">
          {intro.map((p, i) => (
            <p key={i} className="text-[#111]/75 text-[16px] leading-[1.9]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 产品图集 */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <span className="text-[#111] text-[11px] font-bold tracking-[0.18em] uppercase">Gallery</span>
          <h2 className="text-[#111] text-[1.5rem] font-black tracking-[0.03em] mt-2">{t("collection_detail_gallery")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data.gallery.map((src, i) => (
            <div key={i} className="overflow-hidden img-hover cursor-pointer">
              <img src={optimizedImage(src)} alt="" className="w-full aspect-[4/3] object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f8f8] py-20 px-6 border-t border-black/8">
        <div className="max-w-[820px] mx-auto text-center">
          <h2 className="text-[#111] text-[1.5rem] font-black tracking-[0.03em] mb-4">{t("collection_detail_interested")}</h2>
          <p className="text-[#111]/50 text-[14px] mb-8">{t("collection_detail_cta_subtitle")}</p>
          <Link
            to="/contact"
            className="inline-block px-10 py-3.5 bg-[#111] text-white text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#333] transition-colors"
          >
            {t("collection_detail_cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
