import { STATES } from "../data/states";

// Removes the nukta dot (ज़ -> ज, ड़ -> ड) and lowercases, so spelling variants still match.
const norm = (s) => s.normalize("NFD").replace(/\u093C/g, "").toLowerCase();

const STATE_HI = {
  "Andhra Pradesh": ["आंध्र प्रदेश"],
  "Arunachal Pradesh": ["अरुणाचल प्रदेश"],
  Assam: ["असम"],
  Bihar: ["बिहार"],
  Chhattisgarh: ["छत्तीसगढ़"],
  Delhi: ["दिल्ली"],
  Goa: ["गोवा"],
  Gujarat: ["गुजरात"],
  Haryana: ["हरियाणा"],
  "Himachal Pradesh": ["हिमाचल प्रदेश"],
  "Jammu and Kashmir": ["जम्मू और कश्मीर", "जम्मू कश्मीर"],
  Jharkhand: ["झारखंड"],
  Karnataka: ["कर्नाटक"],
  Kerala: ["केरल"],
  "Madhya Pradesh": ["मध्य प्रदेश"],
  Maharashtra: ["महाराष्ट्र"],
  Manipur: ["मणिपुर"],
  Meghalaya: ["मेघालय"],
  Mizoram: ["मिजोरम"],
  Nagaland: ["नागालैंड"],
  Odisha: ["ओडिशा", "उड़ीसा"],
  Punjab: ["पंजाब"],
  Rajasthan: ["राजस्थान"],
  Sikkim: ["सिक्किम"],
  "Tamil Nadu": ["तमिलनाडु", "तमिल नाडु"],
  Telangana: ["तेलंगाना"],
  Tripura: ["त्रिपुरा"],
  "Uttar Pradesh": ["उत्तर प्रदेश"],
  Uttarakhand: ["उत्तराखंड"],
  "West Bengal": ["पश्चिम बंगाल"],
};

const SOIL = {
  alluvial: ["जलोढ़", "alluvial"],
  black: ["काली", "काला", "black"],
  red: ["लाल", "red"],
  laterite: ["लैटेराइट", "लेटराइट", "laterite"],
  sandy: ["रेतीली", "बलुई", "रेत", "sandy"],
  clay: ["चिकनी", "clay"],
  loamy: ["दोमट", "loamy", "loam"],
};
const SEASON = {
  kharif: ["खरीफ", "kharif"],
  rabi: ["रबी", "rabi"],
  zaid: ["जायद", "zaid"],
};
const WATER = {
  rainfed: ["वर्षा आधारित", "बारिश", "वर्षा", "rainfed"],
  canal: ["नहर", "canal"],
  borewell: ["बोरवेल", "बोरिंग", "ट्यूबवेल", "borewell", "bore well", "tubewell"],
  pond: ["तालाब", "पोखर", "pond"],
};

const NUMBER_WORDS = {
  आधा: 0.5, एक: 1, डेढ़: 1.5, दो: 2, ढाई: 2.5, तीन: 3, चार: 4,
  पांच: 5, पाँच: 5, छह: 6, छः: 6, सात: 7, आठ: 8, नौ: 10 - 1, दस: 10,
  half: 0.5, one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};
const NUMBER_MAP = Object.fromEntries(Object.entries(NUMBER_WORDS).map(([k, v]) => [norm(k), v]));

const DISTRICT_WORDS = ["जिला", "district", "जनपद"];
const STOP = new Set(
  [
    "मिट्टी", "soil", "एकड़", "acre", "acres", "में", "का", "की", "के", "से", "है", "और", "and",
    "in", "of", "प्रदेश", "pradesh", "सीजन", "मौसम", "season",
    ...DISTRICT_WORDS,
    ...Object.values(SOIL).flat(),
    ...Object.values(SEASON).flat(),
    ...Object.values(WATER).flat(),
  ].map(norm)
);

function matchGroup(text, tokens, group) {
  for (const [value, aliases] of Object.entries(group)) {
    for (const alias of aliases.map(norm)) {
      const hit = alias.includes(" ") ? text.includes(alias) : tokens.includes(alias);
      if (hit) return value;
    }
  }
  return "";
}

function findState(text) {
  for (const name of STATES) {
    const words = [name.toLowerCase(), ...(STATE_HI[name] || [])].map(norm);
    if (words.some((w) => text.includes(w))) return name;
  }
  return "";
}

function findAcres(tokens) {
  const toNumber = (tk) => {
    const digits = tk.replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));
    if (/^\d+(\.\d+)?$/.test(digits)) return parseFloat(digits);
    return NUMBER_MAP[tk];
  };
  for (let i = 0; i < tokens.length - 1; i++) {
    const next = tokens[i + 1];
    if (next.startsWith("एकड") || next.startsWith("acre")) {
      const n = toNumber(tokens[i]);
      if (n !== undefined && n > 0) return Math.min(100, n);
    }
  }
  return null;
}

function findDistrict(raw, tokens) {
  const i = tokens.findIndex((tk) => DISTRICT_WORDS.map(norm).includes(tk));
  if (i === -1) return "";
  const pick = (idx) => (raw[idx] && !STOP.has(tokens[idx]) ? raw[idx] : "");
  const word = pick(i + 1) || pick(i - 1);
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

export function parseVoice(speech) {
  const raw = speech.replace(/[,।.]/g, " ").split(/\s+/).filter(Boolean);
  const tokens = raw.map(norm);
  const text = tokens.join(" ");

  const found = {};
  const state = findState(text);
  const soil = matchGroup(text, tokens, SOIL);
  const season = matchGroup(text, tokens, SEASON);
  const water = matchGroup(text, tokens, WATER);
  const acres = findAcres(tokens);
  const district = findDistrict(raw, tokens);

  if (state) found.state = state;
  if (district) found.district = district;
  if (soil) found.soil_type = soil;
  if (season) found.season = season;
  if (water) found.water_source = water;
  if (acres) found.land_acres = acres;
  return found;
}