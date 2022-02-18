const UpdateContruction = () => {
  //count capacity here
  //get logged in user as project manager (only staff account can see this)
  //get logged in user email
  //update status to construction
  return (
    <form>
      <label htmlFor="constructiondate">Construction start date: </label>
      <input type="date" name="constructiondate" id="constructiondate" />
      <br />
      <label htmlFor="panelkwp">Panel type: </label>
      <select name="panelkwp" id="panelkwp">
        <option value="">Panel watt-peak</option>
        <option value="375">375 Wp</option>
        <option value="385">385 Wp</option>
        <option value="395">395 Wp</option>
        <option value="405">405 Wp</option>
      </select>
      <br />
      <label htmlFor="panels">No. of panels: </label>
      <input type="number" name="panels" id="panels" min="0" />
      <br />
      <input type="submit" />
    </form>
  );
};

export default UpdateContruction;
