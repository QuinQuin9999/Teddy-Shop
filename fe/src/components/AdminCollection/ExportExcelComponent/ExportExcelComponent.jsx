import React from 'react'
import * as XLSX from 'xlsx'
import { Button } from 'antd'

const exportToExcel = (data, fileName) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

const ExportExcelComponent = ({collections}) => {

    const handleExport = () => {
        exportToExcel(collections, 'collections');
    }

    return (
        <div>
            <Button
                type='primary'
                onClick={handleExport}
            >
                Export to Excel
            </Button>
        </div>
    )
}

export default ExportExcelComponent