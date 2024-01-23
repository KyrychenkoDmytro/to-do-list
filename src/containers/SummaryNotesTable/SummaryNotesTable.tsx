import { FC } from "react";
import SummaryThead from "../../components/Summary/SummaryThead/SummaryThead";
import SummaryTbody from "../../components/Summary/SummaryTbody/SummaryTbody";

const SummaryNotesTable: FC = () => {
    return (
        <>
            <table className="SummaryNotesTable">
                <SummaryThead />
                <SummaryTbody />
            </table>
        </>
    )
}

export default SummaryNotesTable;