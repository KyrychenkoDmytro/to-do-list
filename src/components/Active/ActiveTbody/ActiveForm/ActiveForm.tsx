import { useAppSelector, useAppDispatch } from "../../../../hooks/reduxHooks";
import { createOneNote, toggleFormState, editOneNote } from "../../../../redux/reducers/notesSlice";
import { useState, useEffect } from 'react';
import { images } from "../../../../data/images";

const ActiveForm = () => {
    const { isActiveForm, nextId, editableNote } = useAppSelector(state => state.notes);
    const [name, setName] = useState(editableNote?.name || '');
    const [date, setDate] = useState(editableNote?.created || '');
    const [dates, setDates] = useState(editableNote?.dates || null);
    const [category, setCategory] = useState(editableNote?.category || 'Task');
    const [content, setContent] = useState(editableNote?.content || '');
    const dispatch = useAppDispatch();

    const formatDate = (dateString: string, isDates: boolean) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        if (isDates) {
            return `${day}/${month}/${year}`;
        } else {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const monthText = months[date.getMonth()];
            return `${monthText} ${day}, ${year}`;
        }
    };

    const handleFormClose = () => {
        if (editableNote) {
            dispatch(createOneNote(editableNote));
        }
        dispatch(toggleFormState());
        dispatch(editOneNote(Infinity));
        setName('');
        setDate('');
        setCategory('Task');
        setContent('');
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let isRepeatData: boolean = false;
        dates?.forEach((item) => {
            if (item === formatDate(date, true)) {
                isRepeatData = true;
            }
        })

        const newNote = {
            id: editableNote ? editableNote.id : nextId,
            imgUrl: images.filter((img) => img.imgName === category)[0]?.imgUrl || '',
            name,
            created: formatDate(date, false),
            category,
            content,
            dates: isRepeatData ? dates : dates !== null ? [...dates, formatDate(date, true)] : [formatDate(date, true)],
            archived: false,
        };

        dispatch(createOneNote(newNote));
        dispatch(toggleFormState());
        dispatch(editOneNote(Infinity));
        setName('');
        setDate('');
        setCategory('Task');
        setContent('');
    };

    useEffect(() => {
        if (editableNote) {
            setName(editableNote.name);
            setDate(formatDate(editableNote.created, false));
            setCategory(editableNote.category);
            setContent(editableNote.content);
            if (editableNote.dates === null) {
                setDates([formatDate(editableNote.created, true)])
            } else {
                setDates(editableNote.dates);
            }
        }
    }, [editableNote]);

    return (
        <>
            {isActiveForm && (
                <tr className="ActiveNotesTable__body-row notes-form">
                    <td className="ActiveNotesTable__body-form" colSpan={6}>
                        <form id="noteForm" onSubmit={handleFormSubmit}>
                            <input
                                className="ActiveNotesTable__body-form-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <input
                                className="ActiveNotesTable__body-form-date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            <select
                                className="ActiveNotesTable__body-form-category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                                <option value="Task">Task</option>
                                <option value="Random Thought">Random Thought</option>
                                <option value="Idea">Idea</option>
                            </select>
                            <textarea
                                className="ActiveNotesTable__body-form-text"
                                name="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={100}
                                cols={30}
                                rows={2}
                                placeholder="Content"
                                required
                            />
                            <button className="ActiveNotesTable__body-form-submit" id="submitNote" type="submit">Add Note</button>
                            <button onClick={handleFormClose} className="ActiveNotesTable__body-form-close" id="closeForm">x</button>
                        </form>
                    </td>
                </tr>
            )}
        </>
    )
}
export default ActiveForm;