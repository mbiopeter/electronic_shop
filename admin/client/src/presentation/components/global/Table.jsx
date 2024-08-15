import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Delete, Mode } from '../../../logical/consts/icons'; // Assuming icons are exported from this path
import '../../css/variables.css';

export default function StickyHeadTable({ columns, rows, onEdit, onDelete }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'var(--secondary-background-color)' }}>
            <TableContainer sx={{ maxHeight: 'var(--height)' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'var(--header-background-color)' }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: 'var(--secondary-background-color)', color: 'var(--text-color)' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ borderBottom: '1px solid var(--input-text-color)' }}>
                                {columns.map((column) => {
                                    const value = row[column.id];

                                    if (column.id === 'edit') {
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: 'var(--text-color)' }}>
                                                <Mode onClick={() => onEdit(row)} style={{ cursor: 'pointer' }} />
                                            </TableCell>
                                        );
                                    }

                                    if (column.id === 'delete') {
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: 'var(--text-color)' }}>
                                                <Delete onClick={() => onDelete(row)} style={{ cursor: 'pointer', color: 'var(--link-hover-color)' }} />
                                            </TableCell>
                                        );
                                    }

                                    if (column.id === 'name') {
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: 'var(--text-color)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {row.img ? (
                                                        <img src={row.img} alt={row.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                                                    ):(
                                                        <span style={{paddingRight:'10px'}}>{row.id}.</span>
                                                    )}
                                                    {value}
                                                </div>
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell key={column.id} align={column.align} sx={{ color: 'var(--text-color)' }}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ color: 'var(--text-color)' }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
