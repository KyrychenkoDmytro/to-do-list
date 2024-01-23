import { FC } from "react";

const SummaryThead: FC = () => {
    return (
        <thead className="SummaryNotesTable__header">
            <tr className="SummaryNotesTable__header-row">
                <th colSpan={2}>Category</th>
                <th colSpan={2}>Active</th>
                <th colSpan={2}>Summary</th>
            </tr>
        </thead>
    )
}

export default SummaryThead;