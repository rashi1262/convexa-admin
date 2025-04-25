// src/components/commonComponent/Table.js
import React from 'react';
import PropTypes from 'prop-types';
import { FaTrash, FaEdit, FaEye, FaWpforms } from 'react-icons/fa';

const Table = ({ columns, data, showIndex = false, currentPage = 1, itemsPerPage = 10, onDelete, onUpdate, onView, onForm, showEdit = true, showForm = true }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            {showIndex && <th>S.No</th>}
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {showIndex && <td>{(currentPage - 1) * itemsPerPage + rowIndex + 1}</td>}
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.accessor]}</td>
              ))}
              <td>
                <button onClick={() => onView(row)} title="View">
                  <FaEye />
                </button>
                {showEdit && (
                  <button onClick={() => onUpdate(row)} title="Update">
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => onDelete(row)} title="Delete">
                  <FaTrash />
                </button>
                {/* {showForm && (
                <button onClick={() => onForm(row)} title="Form">
                  <FaWpforms />
                </button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  showIndex: PropTypes.bool,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onView: PropTypes.func,
  onForm: PropTypes.func,
  showEdit: PropTypes.bool,
  showForm: PropTypes.bool
};

export default Table;
