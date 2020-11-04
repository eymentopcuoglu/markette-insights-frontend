import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function NonAuthLayout(props) {

    const location = useLocation();
    const capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    useEffect(() => {
        let currentage = capitalizeFirstLetter(location.pathname);

        document.title =
            currentage + " | Markette";

    }, []);

    return (
        <React.Fragment>
            { props.children }
        </React.Fragment>
    );
}