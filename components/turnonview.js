const TurnonView = ({ children }) => {
  const changeDate = (input) => {
    const splitDateTime = input.split("T");
    const onlyDate = splitDateTime[0];
    const splitDate = onlyDate.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  return (
    <article>
      <p>Postal Code: {children.postalcode}</p>
      <p>
        Block Status:{" "}
        <span className="statushighlighton">{children.status}</span>
      </p>
      <p>Project Manager in Charge: {children.projectmanager}</p>
      <p>Construction Date: {changeDate(children.constructiondate)}</p>
      <p>Testing and Commissioning Date: {changeDate(children.tncdate)}</p>
      <p>Turned On Date: {changeDate(children.turnondate)}</p>
      <p>Total Block Capacity (kWp): {children.capacity_kwp}</p>
      <p>No. of Panels: {children.panels}</p>
      <p>Panel Maximum Power (Pmax/W): {children.panelkwp}</p>
      <form method="get" action={children.tncreport_doc}>
        Testing and Commissioning Report:{" "}
        <button type="submit">Download</button>
      </form>
      <br />
      <form method="get" action={children.asbulit_doc}>
        As-Built Drawing: <button type="submit">Download</button>
      </form>
    </article>
  );
};

export default TurnonView;
