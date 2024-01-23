import { FC, useState } from 'react';
import ActiveNotesTable from '../containers/ActiveNotesTable/ActiveNotesTable';
import SummaryNotesTable from '../containers/SummaryNotesTable/SummaryNotesTable';


import { useEffect } from 'react';
import { useAppDispatch } from "../hooks/reduxHooks";
import { setNotes } from '../redux/reducers/notesSlice';

const Home: FC = () => {

    const dispatch = useAppDispatch();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://65afeb712f26c3f2139c13f0.mockapi.io/api/notes');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                dispatch(setNotes(result));
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="Home">
            <div className="container">
                <ActiveNotesTable />
                <SummaryNotesTable />
                {error &&
                    <p>Error: {error}</p>
                }
            </div>
        </div>
    )
}

export default Home; 