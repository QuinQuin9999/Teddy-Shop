import { Button, Table } from 'antd';
import React, { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }
  console.log('data', data)
  return (
    <div>
      {(rowSelectedKeys.length > 1) && (
        <Button style={{
          background: '#1677ff',
          color: '#fff',
          cursor: 'pointer',
          margin: '10px 0'
        }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </Button>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </div>
  )
}

export default TableComponent