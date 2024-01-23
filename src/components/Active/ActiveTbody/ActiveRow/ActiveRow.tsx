import { FC } from "react";
import { Note } from "../../../../types/interfaces";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { deleteOneNote, archiveOneNote, editOneNote, toggleFormState, unarchiveOneNote } from "../../../../redux/reducers/notesSlice";

const ActiveRow: FC<Note> = (props) => {
    const { id, name, imgUrl, created, category, content, dates, isActiveCategory } = props;
    const dispatch = useAppDispatch();
    const { isActiveForm } = useAppSelector(state => state.notes);

    const editHandler = () => {
        dispatch(editOneNote(id));
        dispatch(deleteOneNote(id));
        dispatch(toggleFormState())
    }

    return (
        <tr className={isActiveCategory ? "ActiveNotesTable__body-row createdNote" : "ActiveNotesTable__body-row createdNote archiveNote"} data-note-id={id}>
            <td>
                <div className="ActiveNotesTable__body-name">
                    <div><img src={imgUrl} alt={category} /></div>
                    <span>{name}</span>
                </div>
            </td>
            <td>{created}</td>
            <td>{category}</td>
            <td>{content}</td>
            <td>{dates && dates.length > 1 ? dates.join(', ') : ''}</td>
            <td>
                {
                    isActiveCategory ? (
                        <div className="ActiveNotesTable__body-wrapper-icons">
                            <button
                                className="ActiveNotesTable__body-icons-edit"
                                id="editNote"
                                onClick={editHandler}
                                disabled={isActiveForm}
                            >
                                <img src="./assets/icons/edit.svg" alt="edit" />
                            </button>
                            <button
                                onClick={() => dispatch(archiveOneNote(id))}
                                className="ActiveNotesTable__body-icons-archive"
                                id="archiveNote"
                                disabled={isActiveForm}
                            >
                                <img src="./assets/icons/archive.svg" alt="archive" />
                            </button>
                            <button
                                onClick={() => dispatch(deleteOneNote(id))}
                                className="ActiveNotesTable__body-icons-delete"
                                id="deleteNote"
                                disabled={isActiveForm}
                            >
                                <img src="./assets/icons/delete.svg" alt="delete" />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="unArchiveNote"
                            data-unarchive-id={id}
                            onClick={() => dispatch(unarchiveOneNote(id))}
                        >Unarchive</button>
                    )
                }
            </td>
        </tr>
    )
}

export default ActiveRow;