const UpdateTurnon = () => {
  //update status as turn on
  return (
    <form>
      <label htmlFor="turnondate">Turn on date: </label>
      <input type="date" name="turnondate" id="turnondate" />
      <br />
      <label htmlFor="tncreport_doc">
        Upload testing and commissioning report:{" "}
      </label>
      <input type="text" name="tncreport_doc" id="tncreport_doc" />
      <br />
      <label htmlFor="asbulit_doc">Upload as-built drawing: </label>
      <input type="text" name="asbulit_doc" id="asbulit_doc" />
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateTurnon;
