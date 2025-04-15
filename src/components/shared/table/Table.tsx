"use client";

import { useState } from 'react';
import './table.css';
import { useSession } from 'next-auth/react';

interface Column {
  header: string;
  key: string;
}

interface Props {
  columns: Column[];
  title: string;
  data: Record<string, any>[];
}

export const Table = ({ columns, data, title }: Props) => {

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (columnKey: string) => {
    if (columnKey === 'actions') return;
    
    if (sortColumn === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      return 0;
    }
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-2 px-4 text-center ${col.key !== 'actions' ? 'cursor-pointer' : ''}`}
                  onClick={() => handleSort(col.key)}
                >
                  {col.header}
                  {sortColumn === col.key && col.key !== 'actions' && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="border-t border-gray-300">
                {columns.map((col) => (
                  <td key={col.key} className="py-2 px-4 text-center">
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
