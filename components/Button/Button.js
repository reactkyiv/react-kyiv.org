import React from 'react';
import colors from '../../styles/variables/colors';

export default ({ label }) => {
    return (
        <div>
            <button className="button">
                {label}
            </button>
            <style jsx>{`
                .button {
                    padding: 8px;
                    font-size: 14px;
                    letter-spacing: 0.1em;
                    color: black;
                    border: 1px solid black;
                    outline: none;
                    background-color: white;
                    background-size: 400% 400%;
                    box-shadow: 6px 6px 0 ${colors.primary};
                    border-radius: 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                  }

                  .button:hover {
                    box-shadow: 3px 3px 0 ${colors.primary};
                  }

                  .button:active {
                    box-shadow: 0 0 0;
                    border: 2px solid ${colors.primary};
                  }
            `}</style>
        </div>
    )
}

// .button {
//     background-color: ${colors.white};
//     border: 1px solid ${colors.black};
//     cursor: pointer;
//     padding: 8px;
//     outline: none;
// }

// .button:active {
//     background-color: ${colors.primary};
// }