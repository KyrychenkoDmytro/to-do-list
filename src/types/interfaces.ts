export interface Note {
    id: number;
    name: string;
    created: string;
    category: string;
    content: string;
    dates: string[] | null;
    imgUrl: string;
    archived: boolean;
    isActiveCategory?: boolean;
}

export interface ArchivedNotesByCategory { [category: string]: Note[] }

export interface NumberOfNotesByCategory {
    [category: string]: { total: number; archived: number; imgUrl: string }
}

