// returns the table containing exam data
import { useState, useMemo } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { Button } from "@chakra-ui/react";
import { NavLink, Link } from 'react-router-dom'
import Search from './Search'
import mData from '../MOCK_DATA.json'

const mainColumns = [
  {
    accessorKey: 'patient_id',
    header: 'Patient ID',
    cell: (props) => <p><NavLink to={`/patient/${props.getValue()}`}>{props.getValue()}</NavLink></p>
  },
  {      
    accessorKey: 'exam_id',
    header: 'Exam ID',
    cell: (props) => <p><NavLink to={`/exam/${props.getValue()}`}>{props.getValue()}</NavLink></p>
  },
  {      
    accessorKey: 'image',
    header: 'Image',
    cell: (props) => {
      return <img src={`${props.row.original.image}`} alt="exam" style= {{ maxWidth: '100px' }}  />;}

  },
  {      
    accessorKey: 'key_findings',
    header: 'Key Findings',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {      
    accessorKey: 'brixia_scores',
    header: 'Brixia Scores',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {      
    accessorKey: 'age',
    header: 'Age',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {      
    accessorKey: 'sex',
    header: 'Sex',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {      
    accessorKey: 'bmi',
    header: 'BMI',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {      
    accessorKey: 'zip_code',
    header: 'Zip Code',
    cell: (props) => <p>{props.getValue()}</p>
  },
]

const adminColumns = [
  {
    accessorKey: 'update',
    header: 'Update',
    cell: (props) => (
      <Button colorScheme="teal" variant="solid" size="sm" >
        Update
      </Button>
    ),
  },
  {
    accessorKey: 'delete',
    header: 'Delete',
    cell: (props) => (
      <Button colorScheme="red" variant="solid" size="sm" >
        Delete
      </Button>
    ),
  },
];


function ExamTable({ isAdminTable, patient_id, setNumExams }){
  const columns = isAdminTable ? [...mainColumns, ...adminColumns] : mainColumns;

  const filteredData = useMemo(() => {
    if(patient_id) {
      const data = mData.filter(item => item.patient_id === patient_id);
      setNumExams(data.length);
      return data;
    }
    return mData;
  }, [patient_id]);

  const [globalFilters, setGlobalFilters] = useState('');

  const table = useReactTable({
    columns,
    data: filteredData,
    state: {
      globalFilter: globalFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilters,
  });
  
  console.log("rowData: ", table.getRowModel().rows.length)

  return (
    <div>
      <Search 
        globalFilters={globalFilters}
        setGlobalFilters={setGlobalFilters}
      />
      <div className="examTable">
        <table w="full" minWidth="1000px">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                <th key={header.id} style={{ minWidth: header.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header, 
                    header.getContext())}
                </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ minWidth: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

 

export default ExamTable;
