import ApiSuccess from '../utils/apiSuccess.js';

const healthCheck = async (req, res) => {
  const uptimeInSeconds = process.uptime();
  res.status(200).json(ApiSuccess.success('succuss', { date: formatUptime(uptimeInSeconds) }));
};
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days} days ${hrs} hours ${mins} minutes ${secs} seconds`;
}
export default healthCheck;
