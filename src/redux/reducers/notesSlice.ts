import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, ArchivedNotesByCategory, NumberOfNotesByCategory } from '../../types/interfaces';

const getActiveNotes = (state: NotesSliceState) => {
    state.activeNotes = state.data.filter(item => !item.archived);
};

const updateArchivedNotesByCategory = (state: NotesSliceState) => {
    state.archivedNotesByCategory = state.data.reduce((archiveObj: ArchivedNotesByCategory, note) => {
        if (note.archived) {
            if (!archiveObj[note.category]) {
                archiveObj[note.category] = [];
            }
            archiveObj[note.category].push(note);
        }
        return archiveObj;
    }, {})
};

const calcCategoryCounts = (state: NotesSliceState) => {
    const categoryCounts: NumberOfNotesByCategory = {};

    state.data.forEach(note => {
        const { category, archived, imgUrl } = note;
        if (!categoryCounts[category]) {
            categoryCounts[category] = { total: 0, archived: 0, imgUrl };
        }
        categoryCounts[category].total++;
        if (archived) {
            categoryCounts[category].archived++;
        }
    });

    state.categoryCounts = categoryCounts;
}

const findNextId = (state: NotesSliceState) => {
    state.nextId = state.data.reduce((accum, item) => (accum < item.id ? (accum = item.id) : accum), 0) + 1;
}

interface NotesSliceState {
    data: Note[];
    activeNotes: Note[];
    archivedNotesByCategory: ArchivedNotesByCategory;
    categoryCounts: NumberOfNotesByCategory;
    isActiveForm: boolean;
    nextId: number;
    editableNote: Note | null;

}

const initialState: NotesSliceState = {
    data: [],
    activeNotes: [],
    archivedNotesByCategory: {},
    categoryCounts: {},
    isActiveForm: false,
    nextId: 0,
    editableNote: null,
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.data = action.payload;

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
            findNextId(state);
        },
        deleteAllNotes: (state) => {
            state.data = [];

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
            findNextId(state);
        },
        archiveAllNotes: (state) => {
            state.data = state.data.map((note) => {
                note.archived = true;
                return note;
            });

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
        },
        createOneNote: (state, action: PayloadAction<Note>) => {
            state.data = [...state.data, action.payload];

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
            findNextId(state);
        },
        deleteOneNote: (state, action: PayloadAction<number>) => {
            state.data = [...state.data.filter((note) => note.id !== action.payload)];

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
            findNextId(state);
        },
        archiveOneNote: (state, action: PayloadAction<number>) => {
            const note = state.data.find((note) => note.id === action.payload);
            if (note) {
                note.archived = true;
                state.data = [...state.data];
            }

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
        },
        unarchiveOneNote: (state, action: PayloadAction<number>) => {
            const note = state.data.find((note) => note.id === action.payload);
            if (note) {
                note.archived = false;
                state.data = [...state.data];
            }

            getActiveNotes(state);
            updateArchivedNotesByCategory(state);
            calcCategoryCounts(state);
        },
        editOneNote: (state, action: PayloadAction<number>) => {
            const note = state.data.find((note) => note.id === action.payload);
            if (note) {
                state.editableNote = note;
            } else {
                state.editableNote = null;
            }
        },
        toggleFormState: (state) => {
            state.isActiveForm = !state.isActiveForm;
        }
    }
})

export const { setNotes, deleteAllNotes, archiveAllNotes, createOneNote, deleteOneNote, archiveOneNote, unarchiveOneNote, toggleFormState, editOneNote } = notesSlice.actions;

export default notesSlice.reducer;