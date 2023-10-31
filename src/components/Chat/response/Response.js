import React from "react";
import "./response.css";
import { FaGg} from "react-icons/fa";
import { BeatLoader } from "react-spinners";


function Response({ loading, responseResult, type }) {
  console.log(type);
  console.log(responseResult);
  let columns = null

  if(type === 'table'){
    if(responseResult.length> 0){
      columns = Object.keys(responseResult[0]);
      console.log(columns)
    }
    else{
      type = null;
      responseResult = 'no records.'
    }
  }

  return (
    <div className='container-response'>
      <span><FaGg/></span>
      {
        !loading ? <BeatLoader size={15}  color="#0b87f8" style={{ backgroundColor: 'transparent' }} />
        :  
        (
          type === 'image' ? 
          <img src={`data:image/jpeg;base64,${responseResult}`} alt="resutl image" />
        :
        (
          type === 'table' ? 
          <div style={{overflowX: 'scroll'}}>
            <table>
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th className="table_heading" key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responseResult.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column, colIndex) => (
                      <td className="table_column" key={colIndex}>{item[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :
            <p>
            {
            
              typeof responseResult === 'object' ? 
              JSON.stringify(responseResult)
              :
              responseResult
            }
            </p>
        )
        )
      }
   
    </div>
  );
}

export default Response;
