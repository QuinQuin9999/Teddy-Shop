import React, { useState } from 'react';
import { Table, Button } from 'antd';

const Detail = (props) => {

    const initialTableSize = 8;
    const [expandedTable, setExpandedTable] = useState(false);
    const [tableSize, setTableSize] = useState(initialTableSize);
      
    const handleReadMore = () => {
        setTableSize(data.length);
        setExpandedTable(true);
    }; 
    
    const handleCollapse = () => {
        setTableSize(initialTableSize);
        setExpandedTable(false);
    }

    const columns = [
        {
          dataIndex: 'name',
          render: (text) => <strong>{text}</strong>,
        },
        {
          className: 'info',
          dataIndex: 'info',
          render: (text) => (
              <div>
                  {text.split(',').map((item, index) => (
                      <pre key={index} style={{ whiteSpace: 'pre-wrap', marginBottom: '8px' }}>{item}</pre>
                  ))}
              </div>
          ),
        }
    ]

    const data = [];
    const description = props.data
    let i = 0;
    for (let key in description) {
        if (description.hasOwnProperty(key)) {
            const value = description[key];
            data.push({
                key: `${i}`,
                name: `${key}`,
                info: value,
            });
            i++;
        }
    }

    return (
        <>
        <h2 style={{fontSize: '24px', padding: '8px 16px'}}>Thông tin sản phẩm</h2>
        <div className="specifications-container">
            <Table
                columns={columns}
                dataSource={data.slice(0, tableSize)}
                bordered
                pagination={false}
                // title={() => <strong>MÔ TẢ SẢN PHẨM</strong>}
            /> 
        </div>
        </>
    )
}

export default Detail;
