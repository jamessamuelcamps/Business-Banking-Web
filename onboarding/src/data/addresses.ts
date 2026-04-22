export interface Address {
  id: string;
  line1: string;
  line2?: string;
  town: string;
  postcode: string;
}

const ADDRESSES: Address[] = [
  { id: 'a1', line1: '14 Devonshire Square', town: 'London', postcode: 'EC2M 4YT' },
  { id: 'a2', line1: '26 Devonshire Square', town: 'London', postcode: 'EC2M 4YT' },
  { id: 'a3', line1: '8 Threadneedle Street', line2: 'Flat 3', town: 'London', postcode: 'EC2R 8AY' },
  { id: 'a4', line1: '42 Bishops Square', town: 'London', postcode: 'E1 6EG' },
  { id: 'a5', line1: '17 Shoreditch High Street', line2: 'Flat 1', town: 'London', postcode: 'E1 6JE' },
  { id: 'a6', line1: '3 Rivington Street', town: 'London', postcode: 'EC2A 3DU' },
  { id: 'a7', line1: '91 Great Eastern Street', town: 'London', postcode: 'EC2A 3HX' },
  { id: 'a8', line1: '55 Old Street', line2: 'Flat 4B', town: 'London', postcode: 'EC1V 9HW' },
  { id: 'a9', line1: '12 Clerkenwell Road', town: 'London', postcode: 'EC1M 5PQ' },
  { id: 'a10', line1: '7 Barbican', line2: 'Lauderdale Tower', town: 'London', postcode: 'EC2Y 8EH' },
  { id: 'a11', line1: '33 Cannon Street', town: 'London', postcode: 'EC4M 5SB' },
  { id: 'a12', line1: '1 Canada Square', line2: 'Apartment 12', town: 'London', postcode: 'E14 5AB' },
  { id: 'a13', line1: '20 Churchill Place', town: 'London', postcode: 'E14 5HJ' },
  { id: 'a14', line1: '6 Westferry Circus', town: 'London', postcode: 'E14 4HD' },
];

export function searchAddresses(query: string): Address[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return ADDRESSES.filter(a =>
    a.postcode.toLowerCase().replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
    a.line1.toLowerCase().includes(q) ||
    (a.line2?.toLowerCase().includes(q) ?? false)
  );
}

export function formatAddress(address: Address): string {
  const parts = [address.line1, address.line2, address.town, address.postcode].filter(Boolean);
  return parts.join(', ');
}
