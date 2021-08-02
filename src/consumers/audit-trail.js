const auditTrail = ({ ReportsService }) => {
  const createAuditTrail = (channel) => async (msg) => {
    if (msg.content) {
      await ReportsService.createAuditTrail(msg, channel);
    }
  };

  return {
    createAuditTrail
  };
};

module.exports = auditTrail;
