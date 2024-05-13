// import { useState } from "react";
// import {PropTypes} from 'prop-types' 

// const SearchBar = ({setRezult}) => {

//     const fetchData = async (value) => {
//         const token = localStorage.getItem('token');
//         let marzi = []; // Define marzi outside try-catch block
//         try {
//             const response = await fetch(`http://localhost:3000/projects/search?query=${value}`, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": token,
//                 },
//             });
//             const data = await response.json();
//             marzi = data.filter((item) => {
//                 return value && item.toLowerCase().includes(value.toLowerCase());
//             });
//         } catch (error) {
//             console.log(error);
//         }
//         console.log(marzi);
//         setRezult(marzi);
//     }
    
    
    

//     const handleChange = (value) => {
//         setInput(value);
//         fetchData(value);
//     }

//     const [input , setInput] = useState('');
//   return (
//     <div>
//       <input type="text" placeholder="Search projects by name" value={input} onChange={(e) => handleChange(e.target.value)} className="w-full"/>
//     </div>
//   )
// }

// SearchBar.propTypes = {
//     setRezult: PropTypes.func.isRequired,
// }


// export default SearchBar

import { useState } from "react";
import PropTypes from 'prop-types';

const SearchBar = ({ setRezult, setSearchError }) => {
    const fetchData = async (value) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/projects/search?query=${value}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            const marzi = data.filter((item) => {
                return value && item.toLowerCase().includes(value.toLowerCase());
            });
            setRezult(marzi);
        } catch (error) {
            setSearchError(true);
        }
    }

    const handleChange = (value) => {
        setInput(value);
        if (value.trim() === '') {
            setRezult([]);
            return;
        }
        fetchData(value);
    }

    const [input, setInput] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Search projects by name"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full"
            />
        </div>
    );
}

SearchBar.propTypes = {
    setRezult: PropTypes.func.isRequired,
    setSearchError: PropTypes.func.isRequired,
}

export default SearchBar;

