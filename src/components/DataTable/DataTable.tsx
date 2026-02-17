import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './DataTable.css';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  linkColumn?: boolean;
}

export interface DataTableProps {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onSelect?: (selectedIndices: number[]) => void;
  onRowAction?: (index: number) => void;
  pageSize?: number;
  showActions?: boolean;
}

function compareValues(a: React.ReactNode, b: React.ReactNode): number {
  const aStr = typeof a === 'string' ? a : typeof a === 'number' ? a : String(a ?? '');
  const bStr = typeof b === 'string' ? b : typeof b === 'number' ? b : String(b ?? '');
  if (typeof aStr === 'number' && typeof bStr === 'number') {
    return aStr - bStr;
  }
  return String(aStr).localeCompare(String(bStr));
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onSort,
  onSelect,
  onRowAction,
  pageSize = 10,
  showActions = true,
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(0);

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const sorted = [...data].sort((a, b) => {
      const result = compareValues(a[sortKey], b[sortKey]);
      return sortDir === 'asc' ? result : -result;
    });
    return sorted;
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const pageData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    setPage(0);
    onSort?.(key, newDir);
  };

  const toggleSelect = (index: number) => {
    const globalIndex = page * pageSize + index;
    const next = new Set(selected);
    if (next.has(globalIndex)) {
      next.delete(globalIndex);
    } else {
      next.add(globalIndex);
    }
    setSelected(next);
    onSelect?.(Array.from(next));
  };

  const toggleAll = () => {
    const pageIndices = pageData.map((_, i) => page * pageSize + i);
    const allSelected = pageIndices.every((i) => selected.has(i));
    const next = new Set(selected);
    if (allSelected) {
      pageIndices.forEach((i) => next.delete(i));
    } else {
      pageIndices.forEach((i) => next.add(i));
    }
    setSelected(next);
    onSelect?.(Array.from(next));
  };

  const pageIndices = pageData.map((_, i) => page * pageSize + i);
  const allPageSelected = pageIndices.length > 0 && pageIndices.every((i) => selected.has(i));

  return (
    <div className="cm-table-wrapper">
      <table className="cm-table">
        <thead>
          <tr>
            <th className="cm-table__th cm-table__th--checkbox cm-table__sticky cm-table__sticky--checkbox">
              <button className="cm-table__checkbox-btn" onClick={toggleAll}>
                {allPageSelected
                  ? <CheckBoxIcon className="cm-table__checkbox-icon" />
                  : <CheckBoxOutlineBlankIcon className="cm-table__checkbox-icon" />
                }
              </button>
            </th>
            {columns.map((col, colIndex) => (
              <th
                key={col.key}
                className={clsx('cm-table__th', {
                  'cm-table__th--sortable': col.sortable,
                  'cm-table__sticky cm-table__sticky--name': colIndex === 0,
                })}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="cm-table__th-content">
                  {col.label}
                  {col.sortable && (
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? <ArrowUpwardIcon className="cm-table__sort-icon cm-table__sort-icon--active" style={{ fontSize: 16 }} />
                        : <ArrowDownwardIcon className="cm-table__sort-icon cm-table__sort-icon--active" style={{ fontSize: 16 }} />
                      : <ImportExportIcon className="cm-table__sort-icon" style={{ fontSize: 16 }} />
                  )}
                </span>
              </th>
            ))}
            {showActions && <th className="cm-table__th cm-table__th--actions" />}
          </tr>
        </thead>
        <tbody>
          {pageData.map((row, i) => {
            const globalIndex = page * pageSize + i;
            return (
              <tr
                key={globalIndex}
                className={clsx('cm-table__row', {
                  'cm-table__row--selected': selected.has(globalIndex),
                  'cm-table__row--alt': i % 2 === 1,
                })}
              >
                <td className="cm-table__td cm-table__td--checkbox cm-table__sticky cm-table__sticky--checkbox">
                  <button className="cm-table__checkbox-btn" onClick={() => toggleSelect(i)}>
                    {selected.has(globalIndex)
                      ? <CheckBoxIcon className="cm-table__checkbox-icon" />
                      : <CheckBoxOutlineBlankIcon className="cm-table__checkbox-icon" />
                    }
                  </button>
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key}
                    className={clsx('cm-table__td', {
                      'cm-table__td--link': col.linkColumn,
                      'cm-table__sticky cm-table__sticky--name': colIndex === 0,
                    })}
                  >
                    {row[col.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="cm-table__td cm-table__td--actions">
                    <button
                      className="cm-table__action-btn"
                      onClick={() => onRowAction?.(globalIndex)}
                      aria-label="More actions"
                    >
                      <MoreHorizIcon />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="cm-table__pagination">
          <span className="cm-table__page-info">
            Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="cm-table__page-controls">
            <button
              className="cm-table__page-btn"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon style={{ fontSize: 16 }} />
            </button>
            <span className="cm-table__page-current">
              Page {page + 1} of {totalPages}
            </span>
            <button
              className="cm-table__page-btn"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightIcon style={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
