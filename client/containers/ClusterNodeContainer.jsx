import React, { useState, useEffect } from 'react';
import { ClusterNode } from '../components/ClusterNode.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors/';

// Material UI Styling
const useStyles = makeStyles({
  root: {
    backgroundColor: grey[300],
  },
  title: {
    fontSize: 30,
  },
});

// FETCH broker information
function ClusterNodeContainer({}) {
  const [clusterId, setClusterId] = useState('');
  const [brokers, setBrokers] = useState([]);

  const fetchBrokerInfo = () => {
    fetch('/admin/brokerInfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // object
      .then((data) => {
        setBrokers((brokers) => {
          brokers = data.brokers;
          return brokers;
        }); //brokers property, returns  [ { nodeId: 0, host: 'Cerebro', port: 9092 } ]
        setClusterId((clusterId) => {
          clusterId = data.clusterId;
          return clusterId;
        }); //clusterID property, returns '1_le6xdKSCuBQUa6duOmcg'
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBrokerInfo();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} align='center'>
            Relational Overview of the Cluster
          </Typography>
        </CardContent>
      </Card>
      <ClusterNode clusterId={clusterId} brokers={brokers} />
    </div>
  );
}
export default ClusterNodeContainer;
