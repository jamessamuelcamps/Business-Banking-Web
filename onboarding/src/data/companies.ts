export interface DemoCompany {
  number: string;
  name: string;
  address: string;
}

const SUFFIXES = [
  'Ltd', 'Limited', 'Group Ltd', 'Holdings Ltd', 'Properties Ltd',
  'Capital Ltd', 'Ventures Ltd', 'Solutions Ltd', 'Services Ltd',
  'Technologies Ltd', 'Consulting Ltd', 'Partners LLP', 'Associates Ltd',
  'Investments Ltd', 'Development Ltd', 'Management Ltd', 'Enterprises Ltd',
  'Finance Ltd', 'Group Holdings Ltd', 'Property Group Ltd',
];

const STREETS = [
  'High Street', 'Park Lane', 'King Street', 'Queen Street', 'Church Road',
  'Victoria Road', 'London Road', 'Station Road', 'Mill Lane', 'Bridge Street',
  'Castle Street', 'Market Street', 'George Street', 'Albert Road', 'Manor Road',
  'York Road', 'Grove Road', 'Elm Avenue', 'Oak Street', 'Hill Road',
];

const CITIES = [
  'London', 'Manchester', 'Birmingham', 'Leeds', 'Edinburgh',
  'Bristol', 'Cardiff', 'Glasgow', 'Liverpool', 'Sheffield',
  'Newcastle', 'Oxford', 'Cambridge', 'Bath', 'Brighton',
  'Nottingham', 'Leicester', 'Coventry', 'Reading', 'Southampton',
];

const POSTCODES = [
  'EC1A 1BB', 'W1A 1AA', 'M1 1AA', 'B1 1BB', 'LS1 1AA',
  'EH1 1YZ', 'BS1 1AA', 'CF10 1AA', 'G1 1AA', 'L1 1AA',
  'S1 1AA', 'NE1 1AA', 'OX1 1AA', 'CB1 1AA', 'BA1 1AA',
  'BN1 1AA', 'NG1 1AA', 'LE1 1AA', 'CV1 1AA', 'RG1 1AA',
];

// Name stems per letter — 5 stems × 20 suffixes = 100 companies per letter
const STEMS: Record<string, string[]> = {
  A: ['Apex', 'Atlas', 'Aston', 'Anchor', 'Aspect'],
  B: ['Beacon', 'Bridgeway', 'Broadstone', 'Bluewater', 'Blackwood'],
  C: ['Castleton', 'Clifton', 'Cobalt', 'Cornerstone', 'Creston'],
  D: ['Dalton', 'Dawnfield', 'Deepwater', 'Denbury', 'Dorset'],
  E: ['Eastbridge', 'Elgin', 'Elmwood', 'Envoy', 'Exton'],
  F: ['Fairfield', 'Falconer', 'Ferndale', 'Fieldstone', 'Forbury'],
  G: ['Galton', 'Glenmore', 'Goldcrest', 'Grange', 'Greenfield'],
  H: ['Halcyon', 'Harborne', 'Hartwell', 'Hawksworth', 'Highfield'],
  I: ['Ibstock', 'Ilkley', 'Inver', 'Ironbridge', 'Isobar'],
  J: ['Jarvis', 'Jedburgh', 'Jenner', 'Jericho', 'Joiner'],
  K: ['Kearney', 'Kelso', 'Kenmore', 'Kestrel', 'Kingsley'],
  L: ['Lakewood', 'Langton', 'Larkmoor', 'Latimer', 'Ledbury'],
  M: ['Malvern', 'Mapleton', 'Marlowe', 'Mercer', 'Millbrook'],
  N: ['Nairn', 'Nantwich', 'Nearfield', 'Neston', 'Northgate'],
  O: ['Oakfield', 'Oldbury', 'Olympian', 'Onyx', 'Orbis'],
  P: ['Paladin', 'Parkgate', 'Pemberton', 'Pennine', 'Pilgrim'],
  Q: ['Quadrant', 'Quantock', 'Quarry', 'Queensbury', 'Quicksilver'],
  R: ['Radley', 'Ramsey', 'Redwood', 'Renfrew', 'Ridgeway'],
  S: ['Saffron', 'Saltire', 'Sandgate', 'Saxon', 'Silverstone'],
  T: ['Talisman', 'Tamworth', 'Tealstone', 'Tenbury', 'Thornfield'],
  U: ['Ullswater', 'Underhill', 'Unison', 'Unity', 'Upland'],
  V: ['Vale', 'Valiant', 'Verity', 'Vernon', 'Vestra'],
  W: ['Waldron', 'Walsall', 'Warwick', 'Westgate', 'Whitmore'],
  X: ['Xander', 'Xenith', 'Xero', 'Xiron', 'Xpedite'],
  Y: ['Yarrow', 'Yately', 'Yelverton', 'Yeoman', 'York'],
  Z: ['Zeal', 'Zenith', 'Zephyr', 'Zest', 'Zinc'],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function padNumber(n: number): string {
  return String(n).padStart(8, '0');
}

function generateCompaniesForLetter(letter: string, letterIndex: number): DemoCompany[] {
  const stems = STEMS[letter] ?? [letter + 'corp'];
  const companies: DemoCompany[] = [];

  let idx = 0;
  for (const stem of stems) {
    for (const suffix of SUFFIXES) {
      const seed = letterIndex * 10000 + idx;
      const street = pick(STREETS, seed + 1);
      const city = pick(CITIES, seed + 2);
      const postcode = pick(POSTCODES, seed + 3);
      const streetNum = (Math.floor(seededRandom(seed + 4) * 200) + 1);
      companies.push({
        number: padNumber(letterIndex * 1000000 + idx + 1),
        name: `${stem} ${suffix}`,
        address: `${streetNum} ${street}, ${city}, ${postcode}`,
      });
      idx++;
    }
  }

  return companies;
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const ALL_COMPANIES: DemoCompany[] = LETTERS.flatMap((letter, i) =>
  generateCompaniesForLetter(letter, i + 1)
);

export function searchCompanies(query: string): DemoCompany[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return ALL_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(q) || c.number.includes(q)
  ).slice(0, 8);
}
