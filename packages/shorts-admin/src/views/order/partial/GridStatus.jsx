export default function GridStatus({ status }) {
  const text = ({ 0: 'Unpaid', 1: 'Paid', 2: 'Refund' })[status] || 'Unknown';
  return (
    <div style={{ width: 60 }}>{text}</div>
  );
}
