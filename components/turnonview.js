const TurnonView = ({ children }) => {
  const changeDate = (input) => {
    const splitDateTime = input.split("T");
    const onlyDate = splitDateTime[0];
    const splitDate = onlyDate.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  return (
    <>
      <h3>Postal Code: {children.postalcode}</h3>
      <h4>Block Status: {children.status}</h4>
      <h4>Project Manager in Charge: {children.projectmanager}</h4>
      <h4>Construction Date: {changeDate(children.constructiondate)}</h4>
      <h4>Testing and Commissioning Date: {changeDate(children.tncdate)}</h4>
      <h4>Turned On Date: {changeDate(children.turnondate)}</h4>
      <h4>Total Block Capacity (kWp): {children.capacity_kwp}</h4>
      <h4>No. of Panels: {children.panels}</h4>
      <h4>Panel Maximum Power (Pmax/W): {children.panelkwp}</h4>
      <form method="get" action={children.tncreport_doc}>
        Testing and Commissioning Report:{" "}
        <button type="submit">Download</button>
      </form>
      <form method="get" action={children.asbulit_doc}>
        As-Built Drawing: <button type="submit">Download</button>
      </form>
    </>
  );
};

export default TurnonView;
