import { FC } from "react";
import ActiveThead from "../../components/Active/ActiveThead/ActiveThead";
import ActiveTbody from "../../components/Active/ActiveTbody/ActiveTbody";
import { toggleFormState } from "../../redux/reducers/notesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const ActiveNotesTable: FC = () => {
    const dispatch = useAppDispatch();
    const { isActiveForm } = useAppSelector(state => state.notes);

    return (
        <>
            <table className="ActiveNotesTable">
                <ActiveThead />
                <ActiveTbody />
            </table>
            <div>
                <button
                    onClick={() => dispatch(toggleFormState())}
                    className="create-new-note"
                    id="createNote"
                    disabled={isActiveForm}
                >
                    Create Note
                </button>
            </div>
        </>
    )
}

export default ActiveNotesTable;