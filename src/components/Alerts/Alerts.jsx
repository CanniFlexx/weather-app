import { Alert, AlertTitle } from '@mui/material';

const Alerts = ({ alerts }) => (
  <div className="my-4">
    {alerts.map((alert, index) => (
      <Alert severity="warning" key={index}>
        <AlertTitle>{alert.event}</AlertTitle>
        {alert.description}
      </Alert>
    ))}
  </div>
);

export default Alerts;
