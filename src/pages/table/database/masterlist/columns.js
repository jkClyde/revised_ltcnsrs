import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const renderWrappedCell = (params) => <span>{params.value}</span>;

export const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 5,
    renderCell: (params) => (
      <div style={{ overflowWrap: 'break-word' }}>
        {/* {`${params.row.last_name || ''}, ${params.row.first_name || ''} ${params.row.middle_name || ''}`} */}
        hidden
      </div>
    ),
    headerAlign: 'center',
    cellClassName: 'name-column--cell',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'date_of_birth',
    headerName: (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.2',
          textAlign: 'center'
        }}
      >
        DOB (MM/DD/YYYY)
      </div>
    ),
    flex: 3,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    renderCell: (params) => {
      if (params.value) {
        const date = new Date(params.value);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${month}/${day}/${year}`;
      } else {
        return ''; // Return an empty string if there's no value
      }
    },
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'dow',
    headerName: (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.2',
          textAlign: 'center'
        }}
      >
        DOW (MM/DD/YYYY)
      </div>
    ),
    flex: 3,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders',
    renderCell: (params) => (
      <span>
        {params.row.child_health
          ? new Date(params.row.child_health.date_of_weighing).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            })
          : 'None'}
      </span>
    )
  },
  {
    field: 'aim',
    headerName: 'AIM',
    type: 'number',
    flex: 1,
    renderCell: renderWrappedCell,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'weight',
    headerName: (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.2',
          textAlign: 'center'
        }}
      >
        Weight (kg)
      </div>
    ),
    type: 'number',
    flex: 1.5,
    renderCell: (params) => <span>{params.row.child_health ? params.row.child_health.weight : 'None'}</span>,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'height',
    headerName: (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.2',
          textAlign: 'center'
        }}
      >
        Height (cm)
      </div>
    ),
    type: 'number',
    flex: 1.5,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders',
    renderCell: (params) => <span>{params.row.child_health ? params.row.child_health.height : 'None'}</span>
  },
  {
    field: 'muac',
    headerName: (
      <div
        style={{
          whiteSpace: 'normal',
          lineHeight: '1.2',
          textAlign: 'center'
        }}
      >
        MUAC (cm)
      </div>
    ),
    type: 'number',
    flex: 1.5,
    renderCell: (params) => <span>{params.row.child_health ? params.row.child_health.muac : 'None'}</span>,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'gender',
    headerName: 'Sex',
    flex: 2,
    renderCell: renderWrappedCell,
    headerAlign: 'center',
    cellClassName: 'centered-cell',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'weightForAge',
    headerName: 'WFA',
    flex: 3,
    // cellClassName: getCellClassNameWFA,
    renderCell: (params) => (
      <div style={{ overflowWrap: 'break-word' }}>{params.row.child_health ? params.row.child_health.wfa : 'None'}</div>
    ),
    headerAlign: 'center',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'lengthForAge',
    headerName: 'LFA',
    flex: 3,
    // cellClassName: getCellClassNameLFA,
    renderCell: (params) => <span>{params.row.child_health ? params.row.child_health.lfa : 'None'}</span>,
    headerAlign: 'center',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'weightForLength',
    headerName: 'WFL',
    flex: 3,
    // cellClassName: getCellClassNameWFL,
    renderCell: (params) => <span>{params.row.child_health ? params.row.child_health.wfl : 'None'}</span>,
    headerAlign: 'center',
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'profile',
    headerName: 'View',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <IconButton
        variant="outlined"
        color="#a4a9fc"
        sx={
          {
            // Add additional styling here if needed
          }
        }
        onClick={(e) => {
          e.stopPropagation(); // Stop the event from propagating to the row
          // handleProfileButtonClick(params.row);
        }}
      >
        <VisibilityIcon />
      </IconButton>
    ),
    headerClassName: 'MuiDataGrid-columnHeaders'
  },
  {
    field: 'delete',
    headerName: 'Delete',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <IconButton
        variant="outlined"
        color="error"
        // onClick={() => handleDeleteRow(params.row.id)}
      >
        <DeleteIcon />
      </IconButton>
    ),
    headerClassName: 'MuiDataGrid-columnHeaders'
  }
];
