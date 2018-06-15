export const MATCH_TYPE: MatchType[] = [
    { id: 0, name: 'Group' },
    { id: 1, name: 'Elimination' },
    { id: 2, name: 'Friendly' },
    { id: 3, name: 'Other' }
];

export const MATCH_STATUS: MatchType[] = [
    { id: 0, name: 'Not Started' },
    { id: 1, name: 'In Play' },
    { id: 2, name: 'Finished' },
    { id: 3, name: 'Canceled' }
];

export class MatchType {
    id: number;
    name: string;
}

export const GROUPS: string [] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
