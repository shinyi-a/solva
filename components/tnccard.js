const UpdateTnC = () => {
  //update status as t&c
  return (
    <form>
      <label htmlFor="tncdate">Testing and Commissioning date: </label>
      <input type="date" name="tncdate" id="tncdate" />
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateTnC;
