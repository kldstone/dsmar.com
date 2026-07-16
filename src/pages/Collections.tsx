import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { optimizedImage } from "@/lib/images";
import { useLang } from "@/lib/i18n";
import { projectCases } from "@/data/projectCases";

// ============================================================
// 产品一览：gani.com.cn 风格
// 按色系分类 + 水刀拼花
// 图片来源：gani.com.cn 产品图
// ============================================================

type Product = {
  name: string;
  en: string;
  img: string;
  color: string;
  href?: string;
};

type CollectionsProps = {
  filter?: "marble" | "mosaic";
};

const products: Product[] = [
  // ===== 白色系 =====,
  { name: "安第斯雪景", en: "Avalanche", img: "/gani-products/gani_003_安第斯雪景.webp", color: "白色系" },
  { name: "天山暮雪", en: "Patagonia", img: "/gani-products/gani_004_天山暮雪.webp", color: "白色系" },
  { name: "和光石", en: "Sereno Beige", img: "/gani-products/gani_007_和光石.webp", color: "米色系" },
  { name: "轻岚雪影", en: "Bianco Gioia", img: "/gani-products/gani_008_轻岚雪影.webp", color: "白色系" },
  { name: "经典白金沙", en: "Palissandro White", img: "/gani-products/gani_009_经典白金沙.webp", color: "白色系" },
  { name: "香格里拉白", en: "Bianco Namibia", img: "/gani-products/gani_010_香格里拉白.webp", color: "白色系" },
  { name: "水晶芬迪白", en: "Oyster White Extra", img: "/gani-products/gani_012_水晶芬迪白.webp", color: "白色系" },
  { name: "蓝水晶", en: "Calcite Blue", img: "/gani-products/gani_013_蓝水晶.webp", color: "白色系" },
  { name: "宝格丽", en: "Calacatta Viola", img: "/gani-products/gani_014_宝格丽.webp", color: "白色系" },
  { name: "柏悦石", en: "Calacatta Michelangelo", img: "/gani-products/gani_015_柏悦石.webp", color: "白色系" },
  { name: "世纪冰玉", en: "Ice Onyx", img: "/gani-products/gani_016_世纪冰玉.webp", color: "白色系" },
  { name: "细纹芬迪白", en: "Oyster White", img: "/gani-products/gani_017_细纹芬迪白.webp", color: "白色系" },
  { name: "菲拉格慕", en: "Grey Ivory", img: "/gani-products/gani_018_菲拉格慕.webp", color: "灰色系" },
  { name: "新巴西鱼肚灰", en: "Super White", img: "/gani-products/gani_022_新巴西鱼肚灰.webp", color: "白色系" },
  { name: "新细纹雪花白", en: "Bianco Carrara", img: "/gani-products/gani_024_新细纹雪花白.webp", color: "白色系" },
  { name: "霜喜", en: "Fior Di Bosco Luna", img: "/gani-products/gani_025_霜喜.webp", color: "灰色系" },
  { name: "云雾白", en: "Bardiglio", img: "/gani-products/gani_026_云雾白.webp", color: "白色系" },
  { name: "赛亚白", en: "Olympia White", img: "/gani-products/gani_027_赛亚白.webp", color: "白色系" },
  { name: "卡塔白", en: "Extra Calacatta", img: "/gani-products/gani_028_卡塔白.webp", color: "白色系" },
  { name: "冰岛白", en: "Bianco Rhino", img: "/gani-products/gani_029_冰岛白.webp", color: "白色系" },
  { name: "卡拉拉白", en: "Statuario Calacatta", img: "/gani-products/gani_030_卡拉拉白.webp", color: "白色系" },
  { name: "皇家白玉", en: "White Ony×", img: "/gani-products/gani_031_皇家白玉.webp", color: "白色系" },
  { name: "新鱼肚白", en: "Statuario Extra", img: "/gani-products/gani_032_新鱼肚白.webp", color: "白色系" },
  { name: "林肯白", en: "Bianco Lincoln", img: "/gani-products/gani_033_林肯白.webp", color: "白色系" },
  { name: "新品雅士白", en: "New Ariston", img: "/gani-products/gani_034_新品雅士白.webp", color: "白色系" },
  { name: "透光白玉", en: "Pearl Onyx", img: "/gani-products/gani_035_透光白玉.webp", color: "白色系" },
  { name: "伊莉莎白", en: "Calacatta", img: "/gani-products/gani_036_伊莉莎白.webp", color: "白色系" },
  { name: "雅士白", en: "Ariston", img: "/gani-products/gani_037_雅士白.webp", color: "白色系" },
  { name: "巴西熊猫白", en: "Panda White", img: "/gani-products/gani_038_巴西熊猫白.webp", color: "白色系" },
  { name: "卡慕白", en: "Camouflage White", img: "/gani-products/gani_039_卡慕白.webp", color: "白色系" },
  { name: "卡拉卡塔", en: "Calacatta Gold Extra", img: "/gani-products/gani_040_卡拉卡塔.webp", color: "白色系" },
  { name: "拉萨维拉白", en: "Bianco Li lac", img: "/gani-products/gani_042_拉萨维拉白.webp", color: "白色系" },
  { name: "经典雪花白", en: "Bianco Venato", img: "/gani-products/gani_043_经典雪花白.webp", color: "白色系" },
  { name: "希腊伯爵白", en: "Volakas", img: "/gani-products/gani_044_希腊伯爵白.webp", color: "白色系" },
  { name: "春序", en: "Macaub", img: "/gani-products/gani_045_春序.webp", color: "金色系" },
  { name: "纳沃纳白洞", en: "Navona Travertine Gardenia", img: "/gani-products/gani_055_纳沃纳白洞.webp", color: "白色系" },
  { name: "阿波罗银", en: "Claros Grey (light)", img: "/gani-products/gani_059_阿波罗银.webp", color: "灰色系" },
  { name: "鱼肚灰", en: "Cenere Di Pesce", img: "/gani-products/gani_071_鱼肚灰.webp", color: "白色系" },
  { name: "幻彩白麻", en: "Kashmir Granite", img: "/gani-products/gani_077_幻彩白麻.webp", color: "白色系" },
  { name: "卡拉卡塔黑", en: "Calacatta Black", img: "/gani-products/gani_078_卡拉卡塔黑.webp", color: "白色系" },
  { name: "罗马假日", en: "Jas Tuff", img: "/gani-products/gani_080_罗马假日.webp", color: "白色系" },
  { name: "黑白根", en: "Nero Marquina", img: "/gani-products/gani_090_黑白根.webp", color: "白色系" },
  { name: "序知", en: "Petal Line", img: "/gani-products/gani_107_序知.webp", color: "水刀拼花" },
  { name: "点序", en: "Dot Rhythm", img: "/gani-products/gani_108_点序.webp", color: "水刀拼花" },
  { name: "摩咔", en: "Ripple", img: "/gani-products/gani_110_摩咔.webp", color: "水刀拼花" },
  { name: "影棠", en: "Shadow Blossom", img: "/gani-products/gani_111_影棠.webp", color: "水刀拼花" },
  { name: "观境", en: "Vista Scape", img: "/gani-products/gani_112_观境.webp", color: "水刀拼花" },
  { name: "岫石", en: "Stone Breath", img: "/gani-products/gani_113_岫石.webp", color: "水刀拼花" },
  { name: "橘晖", en: "Amber Glow", img: "/gani-products/gani_114_橘晖.webp", color: "水刀拼花" },
  { name: "晶彩", en: "Crystalight", img: "/gani-products/gani_116_晶彩.webp", color: "水刀拼花" },
  { name: "衍构", en: "Stone Frost", img: "/gani-products/gani_117_衍构.webp", color: "水刀拼花" },
  { name: "井构", en: "Wellframe", img: "/gani-products/gani_118_井构.webp", color: "水刀拼花" },
  { name: "律格", en: "Rhythm Grid", img: "/gani-products/gani_119_律格.webp", color: "水刀拼花" },
  { name: "十葵", en: "Frame Arc", img: "/gani-products/gani_120_十葵.webp", color: "水刀拼花" },
  { name: "钛谷", en: "Titanium", img: "/gani-products/gani_121_钛谷.webp", color: "水刀拼花" },
  { name: "藤屿", en: "Vine Isle", img: "/gani-products/gani_122_藤屿.webp", color: "水刀拼花" },
  { name: "原点", en: "Daybreak", img: "/gani-products/gani_123_原点.webp", color: "水刀拼花" },
  { name: "云筑", en: "Whisper Line", img: "/gani-products/gani_124_云筑.webp", color: "水刀拼花" },
  { name: "白冰玉", en: "", img: "/gani-products/gani_127_白冰玉.webp", color: "白色系" },
  { name: "东方白", en: "D9182824BM", img: "/gani-products/gani_130_东方白.webp", color: "白色系" },
  { name: "天府蓝水晶", en: "工程定制产品", img: "/gani-products/gani_131_天府蓝水晶.webp", color: "白色系" },
  { name: "米白洞石", en: "工程定制产品", img: "/gani-products/gani_132_米白洞石.webp", color: "白色系" },
  { name: "冰玉木纹", en: "工程定制产品", img: "/gani-products/gani_133_冰玉木纹.webp", color: "白色系" },
  { name: "白玉", en: "工程定制产品", img: "/gani-products/gani_134_白玉.webp", color: "白色系" },
  { name: "云映星城", en: "工程定制产品", img: "/gani-products/gani_135_云映星城.webp", color: "灰色系" },
  { name: "雪照锦宸", en: "工程定制产品", img: "/gani-products/gani_137_雪照锦宸.webp", color: "白色系" },
  { name: "汉妮玉臻果", en: "工程定制产品", img: "/gani-products/gani_139_汉妮玉臻果.webp", color: "白色系" },
  { name: "定制米白洞石", en: "工程定制产品", img: "/gani-products/gani_141_定制米白洞石.webp", color: "白色系" },
  { name: "直纹白金沙", en: "工程定制产品", img: "/gani-products/gani_142_直纹白金沙.webp", color: "白色系" },
  { name: "凝脂玉", en: "工程定制产品", img: "/gani-products/gani_145_凝脂玉.webp", color: "白色系" },
  { name: "仿古砖", en: "工程定制产品", img: "/gani-products/gani_146_仿古砖.webp", color: "白色系" },
  { name: "阿布扎比白", en: "工程定制产品", img: "/gani-products/gani_147_阿布扎比白.webp", color: "白色系" },
  { name: "大花白", en: "工程定制产品", img: "/gani-products/gani_149_大花白.webp", color: "白色系" },
  // ===== 灰色系 =====,
  { name: "烟雨江南", en: "Camouflage Light", img: "/gani-products/gani_011_烟雨江南.webp", color: "灰色系" },
  { name: "温德姆", en: "Lovina Grey", img: "/gani-products/gani_020_温德姆.webp", color: "灰色系" },
  { name: "柏妮丝", en: "Bernice Grey", img: "/gani-products/gani_046_柏妮丝.webp", color: "灰色系" },
  { name: "古罗马灰", en: "Assinis Fantasia", img: "/gani-products/gani_047_古罗马灰.webp", color: "灰色系" },
  { name: "钢琴灰", en: "Teak Wood Cream", img: "/gani-products/gani_056_钢琴灰.webp", color: "灰色系" },
  { name: "芬迪灰", en: "Fendi Grey", img: "/gani-products/gani_057_芬迪灰.webp", color: "灰色系" },
  { name: "意大利云灰", en: "Bardiglio Bluette", img: "/gani-products/gani_058_意大利云灰.webp", color: "灰色系" },
  { name: "保加利亚灰", en: "Pietra Grey", img: "/gani-products/gani_060_保加利亚灰.webp", color: "灰色系" },
  { name: "卡斯特", en: "Soveraia Grey", img: "/gani-products/gani_061_卡斯特.webp", color: "灰色系" },
  { name: "秦川沃野", en: "Louis Grey", img: "/gani-products/gani_062_秦川沃野.webp", color: "灰色系" },
  { name: "星际蓝", en: "Emperador Grey", img: "/gani-products/gani_063_星际蓝.webp", color: "灰色系" },
  { name: "伏旭", en: "Grigio Soverala", img: "/gani-products/gani_064_伏旭.webp", color: "灰色系" },
  { name: "奥斯汀", en: "Starry Sky", img: "/gani-products/gani_065_奥斯汀.webp", color: "灰色系" },
  { name: "巴洛特灰", en: "Ballot Grey", img: "/gani-products/gani_066_巴洛特灰.webp", color: "灰色系" },
  { name: "贝纳灰", en: "Savoy Grey", img: "/gani-products/gani_067_贝纳灰.webp", color: "灰色系" },
  { name: "云朵灰", en: "Tundra Grey", img: "/gani-products/gani_069_云朵灰.webp", color: "灰色系" },
  { name: "欧迪芬蓝", en: "Earth Grey", img: "/gani-products/gani_070_欧迪芬蓝.webp", color: "灰色系" },
  { name: "希腊灰", en: "Assinis Grey", img: "/gani-products/gani_072_希腊灰.webp", color: "灰色系" },
  { name: "爱马仕灰", en: "Pearl Grey", img: "/gani-products/gani_073_爱马仕灰.webp", color: "灰色系" },
  { name: "普佩斯米灰", en: "Pulpis Grey", img: "/gani-products/gani_074_普佩斯米灰.webp", color: "灰色系" },
  { name: "云棕灰", en: "Nuvola Marrone", img: "/gani-products/gani_075_云棕灰.webp", color: "灰色系" },
  { name: "云朵拉灰", en: "New Castle Grey", img: "/gani-products/gani_076_云朵拉灰.webp", color: "灰色系" },
  { name: "塞浦路斯灰", en: "Cyprus Grey", img: "/gani-products/gani_079_塞浦路斯灰.webp", color: "灰色系" },
  { name: "英格兰灰", en: "Maui Grey", img: "/gani-products/gani_081_英格兰灰.webp", color: "灰色系" },
  { name: "诺曼底灰", en: "Atlantic Grey", img: "/gani-products/gani_082_诺曼底灰.webp", color: "灰色系" },
  { name: "新皇室灰", en: "New Silver Fantasy", img: "/gani-products/gani_089_新皇室灰.webp", color: "灰色系" },
  { name: "温德姆深灰", en: "", img: "/gani-products/gani_128_温德姆深灰.webp", color: "灰色系" },
  // ===== 黑色系 =====,
  { name: "听雨", en: "Nero Picasso", img: "/gani-products/gani_087_听雨.webp", color: "黑色系" },
  { name: "劳伦斯金", en: "Laurent Black", img: "/gani-products/gani_091_劳伦斯金.webp", color: "黑色系" },
  // ===== 米色系 =====,
  { name: "浅杏岩", en: "Matera Beige", img: "/gani-products/gani_006_浅杏岩.webp", color: "米色系" },
  { name: "巴赫石", en: "Moon Beige", img: "/gani-products/gani_019_巴赫石.webp", color: "米色系" },
  { name: "摩卡石", en: "Savanna", img: "/gani-products/gani_021_摩卡石.webp", color: "米色系" },
  { name: "纳斯", en: "Oscar Beige", img: "/gani-products/gani_048_纳斯.webp", color: "米色系" },
  { name: "欧米茄", en: "Omega Beige", img: "/gani-products/gani_049_欧米茄.webp", color: "米色系" },
  { name: "非洲米黄", en: "Safari Beige", img: "/gani-products/gani_051_非洲米黄.webp", color: "米色系" },
  { name: "新矿莎安娜", en: "Premium Botticino", img: "/gani-products/gani_052_新矿莎安娜.webp", color: "米色系" },
  { name: "塞阿拉米黄", en: "Taj Mahal Quartzite", img: "/gani-products/gani_053_塞阿拉米黄.webp", color: "米色系" },
  { name: "纳沃纳黄洞", en: "Navona Travertine Classic", img: "/gani-products/gani_054_纳沃纳黄洞.webp", color: "米色系" },
  { name: "银杏", en: "Ginkgo", img: "/gani-products/gani_115_银杏.webp", color: "水刀拼花" },
  // ===== 棕色系 =====,
  { name: "卡慕棕", en: "Camouflage", img: "/gani-products/gani_100_卡慕棕.webp", color: "棕色系" },
  { name: "雅典木纹", en: "Twilight Ashwood", img: "/gani-products/gani_101_雅典木纹.webp", color: "棕色系" },
  { name: "阿玛尼棕", en: "Amani Brown", img: "/gani-products/gani_102_阿玛尼棕.webp", color: "棕色系" },
  { name: "柿秋", en: "Breche Fantastique", img: "/gani-products/gani_104_柿秋.webp", color: "棕色系" },
  { name: "成都木化石", en: "", img: "/gani-products/gani_129_成都木化石.webp", color: "棕色系" },
  { name: "苏州道壹号木纹", en: "工程定制产品", img: "/gani-products/gani_144_苏州道壹号木纹.webp", color: "棕色系" },
  // ===== 蓝色系 =====,
  { name: "经典宝石蓝", en: "Brazil Blue Sodalite", img: "/gani-products/gani_005_经典宝石蓝.webp", color: "蓝色系" },
  { name: "亚马逊蓝", en: "Amazon Blue", img: "/gani-products/gani_068_亚马逊蓝.webp", color: "蓝色系" },
  { name: "蓝色多瑙河", en: "Azul Sodalite", img: "/gani-products/gani_083_蓝色多瑙河.webp", color: "蓝色系" },
  { name: "皇家蓝", en: "Azul Macaubas", img: "/gani-products/gani_084_皇家蓝.webp", color: "蓝色系" },
  { name: "蓝贝露", en: "Palissandro Blue", img: "/gani-products/gani_085_蓝贝露.webp", color: "蓝色系" },
  { name: "碧海伽蓝", en: "Locke Blue Grey", img: "/gani-products/gani_086_碧海伽蓝.webp", color: "蓝色系" },
  { name: "蓝屿", en: "Blue Isle", img: "/gani-products/gani_109_蓝屿.webp", color: "水刀拼花" },
  // ===== 绿色系 =====,
  { name: "阿尔卑斯", en: "Verde Alpi Premium", img: "/gani-products/gani_023_阿尔卑斯.webp", color: "绿色系" },
  { name: "夏荷", en: "Quartizite Avocado", img: "/gani-products/gani_093_夏荷.webp", color: "绿色系" },
  { name: "皇家绿", en: "Royal Green", img: "/gani-products/gani_094_皇家绿.webp", color: "绿色系" },
  { name: "四季绿洲", en: "Four Seasons", img: "/gani-products/gani_095_四季绿洲.webp", color: "绿色系" },
  { name: "亚马逊绿", en: "Amazon Green", img: "/gani-products/gani_096_亚马逊绿.webp", color: "绿色系" },
  { name: "青山远黛", en: "Calacatta Mint", img: "/gani-products/gani_097_青山远黛.webp", color: "绿色系" },
  { name: "绿野仙踪", en: "Verde Lapponia", img: "/gani-products/gani_098_绿野仙踪.webp", color: "绿色系" },
  { name: "青松耸翠", en: "Verde Calacatta", img: "/gani-products/gani_099_青松耸翠.webp", color: "绿色系" },
  // ===== 红色系 =====,
  { name: "桃李春风", en: "Cristallo Pink Quartzite", img: "/gani-products/gani_001_桃李春风.webp", color: "红色系" },
  { name: "石榴红宝", en: "Rose Notte Lumos", img: "/gani-products/gani_092_石榴红宝.webp", color: "红色系" },
  { name: "四季粉", en: "Four Seasons Rosa", img: "/gani-products/gani_103_四季粉.webp", color: "红色系" },
  { name: "西施红", en: "Rosa Zarci", img: "/gani-products/gani_105_西施红.webp", color: "红色系" },
  // ===== 金色系 =====,
  { name: "宇宙金", en: "Black Cosmic", img: "/gani-products/gani_002_宇宙金.webp", color: "金色系" },
  { name: "卡拉拉金", en: "Oro Carrara", img: "/gani-products/gani_041_卡拉拉金.webp", color: "金色系" },
  { name: "香格娜米黄", en: "Roman Jade", img: "/gani-products/gani_050_香格娜米黄.webp", color: "金色系" },
  { name: "鎏金岁月", en: "Golden Midnight", img: "/gani-products/gani_088_鎏金岁月.webp", color: "金色系" },
  { name: "锡耶纳黄", en: "Giallo Siena", img: "/gani-products/gani_106_锡耶纳黄.webp", color: "金色系" },
  // ===== 水刀拼花 =====,
  { name: "星瓣月拼花", en: "", img: "/gani-products/gani_125_星瓣月拼花.webp", color: "水刀拼花" },
  { name: "月牙环拼花", en: "", img: "/gani-products/gani_126_月牙环拼花.webp", color: "水刀拼花" },
  { name: "雪照锦宸拼花", en: "工程定制产品", img: "/gani-products/gani_136_雪照锦宸拼花.webp", color: "水刀拼花" },
  { name: "白金沙线灰拼花", en: "工程定制产品", img: "/gani-products/gani_138_白金沙线灰拼花.webp", color: "水刀拼花" },
  { name: "白金沙拼花", en: "工程定制产品", img: "/gani-products/gani_140_白金沙拼花.webp", color: "水刀拼花" },
  { name: "苏州招商永旺拼花", en: "工程定制产品", img: "/gani-products/gani_143_苏州招商永旺拼花.webp", color: "水刀拼花" },
  { name: "中旅白金沙拼花", en: "工程定制产品", img: "/gani-products/gani_148_中旅白金沙拼花.webp", color: "水刀拼花" }
];

const projectCaseProducts: Product[] = projectCases.map((projectCase) => ({
  name: projectCase.name,
  en: projectCase.en,
  img: projectCase.cover,
  color: "工程案例",
  href: `/cases/${projectCase.slug}`,
}));

// 天然大理石 tab（不含水刀拼花）
const MARBLE_TABS = [
  { key: "全部", label: "全部" }, { key: "白色系", label: "白色系" }, { key: "灰色系", label: "灰色系" }, { key: "黑色系", label: "黑色系" }, { key: "米色系", label: "米色系" }, { key: "棕色系", label: "棕色系" }, { key: "蓝色系", label: "蓝色系" }, { key: "绿色系", label: "绿色系" }, { key: "红色系", label: "红色系" }, { key: "金色系", label: "金色系" }
];

const ALL_TABS = [...MARBLE_TABS, { key: "水刀拼花", label: "水刀拼花" }];

export default function Collections({ filter }: CollectionsProps) {
  const { lang, t } = useLang();
  const [active, setActive] = useState("全部");

  const isMosaic = filter === "mosaic";
  const isProjectCases = filter === "marble";

  const TABS = isMosaic || isProjectCases ? [] : ALL_TABS;

  // 基础产品列表
  const baseProducts = useMemo(() => {
    if (isMosaic) return products.filter((p) => p.color === "水刀拼花");
    if (isProjectCases) return projectCaseProducts;
    return products;
  }, [isMosaic, isProjectCases]);

  const filtered = useMemo(() => {
    if (active === "全部" || isMosaic) return baseProducts;
    return baseProducts.filter((p) => p.color === active);
  }, [active, baseProducts, isMosaic]);

  const pageTitle = isProjectCases
    ? (lang === "zh" ? "工程案例" : "PROJECT CASES")
    : isMosaic ? t("collections_mosaic") : t("collections_natural_marble");
  const pageSub = isProjectCases
    ? (lang === "zh" ? "精选天然石材应用项目，点击查看完整案例图集。" : "Selected natural stone applications. Open a case to view the complete gallery.")
    : isMosaic
    ? t("collections_mosaic_subtitle")
    : t("collections_marble_subtitle");
  const labelForColor = (color: string) => t(`collections_color_${color}`);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] bg-[#e5e5e5] overflow-hidden">
        <img
          src={optimizedImage("/brand-gallery/hero-marble.jpg")}
          alt="水头石材产业基地"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <span className="text-white/80 text-[11px] font-bold tracking-[0.20em] uppercase">{t("collections_product")}</span>
            <h1 className="text-white text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[0.03em] mt-3 mb-4">
              {pageTitle}
            </h1>
            <p className="text-white/80 text-[15px] max-w-[560px] mx-auto leading-relaxed">
              {pageSub}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      {TABS.length > 0 && (
      <section className="max-w-[1400px] mx-auto px-6 pt-14 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`text-[13px] tracking-[0.06em] pb-2 border-b-2 transition-colors $ {
                  active === t.key
                    ? "text-[#111] border-[#111] font-semibold"
                    : "text-[#111]/50 border-transparent hover:text-[#111] hover:border-[#111]/30"
                }`}
              >
                {labelForColor(t.key)}
              </button>
            ))}
          </div>
          <div className="text-[#111]/40 text-[12px] tracking-[0.04em]">
            {t("collections_total", { count: String(filtered.length) })}
          </div>
        </div>
      </section>
      )}

      {/* Product Grid — gani 5列风格 */}
      <section className={`max-w-[1400px] mx-auto px-6 pb-20 ${TABS.length === 0 ? "pt-14" : ""}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((p, i) => {
            // 从图片路径提取 gani 编号作为详情页 id（gani_003 → "2"）
            const match = p.img.match(/gani_(\d+)/);
            const productId = match ? String(parseInt(match[1], 10) - 1) : "0";
            return (
            <Link
              key={`${p.name}-${i}`}
              to={p.href || `/collections/product/${productId}`}
              className="group relative block overflow-hidden bg-[#f5f5f5] aspect-[3/4]"
            >
              <img
                src={optimizedImage(p.img)}
                alt={lang === "en" ? (p.en || p.name) : p.name}
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* 左下角半透明黑蒙层 + 白字 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-0 right-0 bottom-0 px-4 py-3">
                <p className="text-white text-[13px] font-semibold tracking-[0.04em] leading-tight">
                  {lang === "en" ? (p.en || t("collections_custom_stone")) : p.name}
                </p>
                {p.en && (
                  <p className="text-white/65 text-[10px] font-medium tracking-[0.08em] mt-0.5">
                    {p.en}
                  </p>
                )}
              </div>
            </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-[#111]/40 text-[14px]">
            {t("collections_empty")}
          </div>
        )}
      </section>
    </div>
  );
}
