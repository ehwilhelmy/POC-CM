import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

const staffColumns = [
  { key: 'name', label: 'Name', sortable: true, linkColumn: true },
  { key: 'stage', label: 'Stage', sortable: true },
  { key: 'assignedTo', label: 'Assigned To', sortable: true },
  { key: 'refsChecked', label: 'References Checked', sortable: true },
  { key: 'source', label: 'Submission Source', sortable: true },
  { key: 'staffYears', label: 'Staff Years', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'position', label: 'Applied Position', sortable: true },
  { key: 'availability', label: 'Availability', sortable: true },
];

const staffData = [
  { name: 'Ken Maynard', stage: 'Review', assignedTo: 'Select a user', refsChecked: '3/3', source: 'Staff interest form', staffYears: '4', email: 'kennethm2018@gmail.com', status: 'References Pending', position: 'Lifeguard', availability: '20 Jun, 2025 - 15 Jul, 2025' },
  { name: 'Robert Jones', stage: 'Interview', assignedTo: 'Select a user', refsChecked: '2/3', source: 'Staff interest form', staffYears: '3', email: 'mrrobj@gmail.com', status: 'Interview Scheduled', position: 'Lifeguard', availability: '20 Jun, 2025 - 15 Jul, 2025' },
  { name: 'Alicia Johnson', stage: 'Review', assignedTo: 'Select a user', refsChecked: '1/3', source: 'Staff interest form', staffYears: '2', email: 'aliceinwonder@gmail.com', status: 'Interview Scheduled', position: 'Lifeguard', availability: '5 Jul, 2025 - 5 Aug, 2025' },
  { name: 'John Hamelin', stage: 'Review', assignedTo: 'Select a user', refsChecked: '2/3', source: 'Staff interest form', staffYears: '1', email: 'johnham37@gmail.com', status: 'References Pending', position: 'Lifeguard', availability: '20 Jul, 2025 - 7 Aug, 2025' },
  { name: 'Anthony Perkins', stage: 'Review', assignedTo: 'Select a user', refsChecked: '0/3', source: 'Staff Application', staffYears: '1', email: 'tonytouch3@gmail.com', status: 'Contract Sent', position: 'Lifeguard', availability: '15 Jul, 2025 - 1 Aug, 2025' },
];

export const Default: Story = {
  args: {
    columns: staffColumns,
    data: staffData,
    pageSize: 10,
    showActions: true,
  },
};

export const SmallPage: Story = {
  args: {
    columns: staffColumns,
    data: staffData,
    pageSize: 3,
    showActions: true,
  },
};

export const FewRows: Story = {
  args: {
    columns: staffColumns,
    data: staffData.slice(0, 2),
    pageSize: 10,
    showActions: true,
  },
};
