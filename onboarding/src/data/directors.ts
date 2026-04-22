export interface Director {
  id: string;
  name: string;
  role: string;
  appointedDate: string;
}

const DIRECTORS: Director[] = [
  { id: 'd1', name: 'James Samuel-Camps', role: 'Director', appointedDate: 'Appointed 14 Mar 2021' },
  { id: 'd2', name: 'Sarah Mitchell', role: 'Director', appointedDate: 'Appointed 2 Aug 2019' },
  { id: 'd3', name: 'Thomas Webb', role: 'Director & Company Secretary', appointedDate: 'Appointed 22 Jan 2020' },
];

export function getDirectors(): Director[] {
  return DIRECTORS;
}
