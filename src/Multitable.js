// import React from 'react'


// export default function Multitable() {
//     const size = 10; // size of the multiplication table
//     let table = [];
  
//     for (let i = 1; i <= size; i++) {
//       let row = [];
//       for (let j = 1; j <= size; j++) {
//         row.push(<td>{i * j}</td>);
//       }
//       table.push(<tr>{row}</tr>);
//     }
  
//     return (
//       <table>
//         <tbody>{table}</tbody>
//       </table>
//     );
//   }
  


// import React from 'react';

// export default function Multitable() {
//   const items = [/* array of items */];

//   const handleClick = (item) => {
//     // Loop logic here
//     console.log(item);
//   };

//   return (
//     <table>
//       <tbody>
//         {items.map((item, index) => (
//           <tr key={index}>
//             <td>Caution Sign</td>
//             <td onClick={() => handleClick(item)}>Click Me</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }



import React, { useState } from 'react';

const Multitable = () => {
    const [table, setTable] = useState([]);

    const generateTable = (number) => {
        let newTable = [];
        for (let i = 1; i <= 10; i++) {
            newTable.push(`${number} x ${i} = ${number * i}`);
          }
        setTable(newTable);
    };

    return (
        <div>
            <button onClick={() =>generateTable(2)}>Generate Table</button>
            <button onClick={() =>generateTable(1)}>1</button>

            <table>
                <tbody>
                {table.map((row, index) => (
              <tr key={index}>
                <td>{row}</td>
              </tr>
            ))}
                </tbody>
            </table>
        </div>
    );
};

export default Multitable;



  