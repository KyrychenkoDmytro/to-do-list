import { FC } from "react";
import ActiveRow from "../../../Active/ActiveTbody/ActiveRow/ActiveRow";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { useState } from 'react';

type SummaryRowProps = {
    category: string;
    total: number;
    archived: number;
    imgUrl: string;
};

const SummaryRow: FC<SummaryRowProps> = (props) => {
    const { total, archived, imgUrl, category } = props;
    const active = total - archived;
    const { archivedNotesByCategory } = useAppSelector(state => state.notes);
    const [showArchiveNotes, setShowArchiveNotes] = useState(false);

    return (
        <>
            <tr
                className="SummaryNotesTable__body-row show-notes"
                data-note-category={category}
                onClick={() => setShowArchiveNotes(!showArchiveNotes)}
            >
                <td className="SummaryNotesTable__td" colSpan={2}>
                    <div className="SummaryNotesTable__body-name archives-table__name">
                        <div><img src={imgUrl} alt={category} /></div>
                        <span>{category}</span>
                    </div>
                </td>
                <td className="SummaryNotesTable__td" colSpan={2}>{active}</td>
                <td className="SummaryNotesTable__td" colSpan={2}>{archived}</td>
            </tr>
            {
                showArchiveNotes && (
                    archivedNotesByCategory[category]?.map(item => <ActiveRow {...item} isActiveCategory={false} />)
                )
            }

        </>
    )
}

export default SummaryRow;