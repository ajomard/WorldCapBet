export const MATCH_TYPE: MatchType[] = [
    { id: 0, name: 'Group' },
    { id: 1, name: 'Elimination' },
    { id: 2, name: 'Friendly' },
    { id: 3, name: 'Other' }
];

export class MatchType {
    id: number;
    name: string;
}

export class Constants {
    public static GROUPS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
}