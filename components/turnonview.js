const TurnonView = ({ children }) => {
  const changeDate = (input) => {
    const splitDateTime = input.split("T");
    const onlyDate = splitDateTime[0];
    const splitDate = onlyDate.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  return (
    <>
      <h1>{children.postalcode}</h1>
      <h3>Status: {children.status}</h3>
      <h4>Project Manager in Charge: {children.projectmanager}</h4>
      <h4>Construction Date: {changeDate(children.constructiondate)}</h4>
      <h4>Testing and Commissioning Date: {changeDate(children.tncdate)}</h4>
      <h4>Turned On Date: {changeDate(children.turnondate)}</h4>
      <h4>Total Block Capacity (kWp): {children.capacity_kwp}</h4>
      <h4>No. of Panels: {children.panels}</h4>
      <h4>Panel Maximum Power (Pmax/W): {children.panelkwp}</h4>
      {/* add download button for tncreport_doc and asbulit_doc */}
    </>
  );
};

export default TurnonView;
