import { FC } from "react";
import SummaryRow from "./SummaryRow/SummaryRow";
import { useAppSelector } from "../../../hooks/reduxHooks";

const SummaryTbody: FC = () => {
    const { categoryCounts } = useAppSelector(state => state.notes);

    return (
        <tbody className="SummaryNotesTable__body">
            {Object.entries(categoryCounts).map(([category, data]) => (
                <SummaryRow
                    key={category}
                    category={category}
                    total={data.total}
                    archived={data.archived}
                    imgUrl={data.imgUrl}
                />
            ))}
        </tbody>
    )
}

export default SummaryTbody;