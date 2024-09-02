import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const CalendarZone = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    return (
        <>
            <Datepicker value={value} onChange={newValue => setValue(newValue)} />
        </>
    );
};

export default CalendarZone;
