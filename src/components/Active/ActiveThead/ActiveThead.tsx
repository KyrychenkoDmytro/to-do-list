import { FC } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { deleteAllNotes, archiveAllNotes } from "../../../redux/reducers/notesSlice";

const ActiveThead: FC = () => {
    const dispatch = useAppDispatch();
    const deleteAllHandler = () => {
        if (window.confirm('Do you want to delete all notes?')) {
            dispatch(deleteAllNotes());
        }
    }
    const archiveAllHandler = () => {
        if (window.confirm('Do you want to archive all notes?')) {
            dispatch(archiveAllNotes());
        }
    }

    return (
        <thead className="ActiveNotesTable__header">
            <tr className="ActiveNotesTable__header-row">
                <th>Name</th>
                <th>Created</th>
                <th>Category</th>
                <th>Content</th>
                <th>Dates</th>
                <th>
                    <div className="ActiveNotesTable__header-wrapper-icons">
                        <button onClick={archiveAllHandler} className="ActiveNotesTable__header-icons-archive-all">
                            <img src="./assets/icons/archive-all.svg" alt="archive all" />
                        </button>
                        <button onClick={deleteAllHandler} className="ActiveNotesTable__header-icons-delete-all">
                            <img src="./assets/icons/delete-all.svg" alt="delete all" />
                        </button>
                    </div>
                </th>

            </tr>
        </thead>
    )
}

export default ActiveThead;