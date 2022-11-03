import React, {useState, useEffect} from "react";
import readXlsxFile from 'read-excel-file';

function ImportExcel() {
    const [excelFile, setExcelFile] =useState('');
    const [headingRow, setHeadingRow] = useState([]);
    const [rows, setRows] = useState([]);
    const [fileFormatError, setFileFormatError] = useState('');

    function handleOnFileChange(event) {
        setExcelFile(event.target.files[0]);
    }

    function importData(){
        let input = document.getElementById('excel-upload');
        setFileFormatError('');
        readXlsxFile(excelFile).then((rows) => {
            console.log(rows);
            setHeadingRow(rows.splice(0, 1)[0]);
            setRows(rows);
            console.log(headingRow);
          }).catch((error)=>{
            setFileFormatError(error.message);
          })
    }

    return(
        <div>
            <div className="form-fields">
                <label>Select Excel File: </label>
                <input type='file' id='excel-upload' onChange={handleOnFileChange}/>
                <button onClick={importData} className="button-pr">Import Data</button>
                {fileFormatError && <div className="error">{fileFormatError}</div>}
            </div>
            <div className="imported-data">
                <table>
                    <thead>
                        <tr>
                            {headingRow.length > 0 && headingRow.map((item, index)=> <th key={`heading-${index}`}>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    {rows.length > 0 && rows.map((itemList, index) => {
                        return (
                            <tr key={`row-${index}`}>
                                {itemList.length > 0 && itemList.map((item, itemIndex) => <td key={`col-${index}${itemIndex}`}>{item}</td>)}
                            </tr>
                        )
                    }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ImportExcel;