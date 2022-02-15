export default function Home() {
  return (
    <form>
      <label htmlFor="usernameinput">Username: </label>
      <input type="text" name="usernameinput" id="usernameinput" />
      <br />
      <label htmlFor="passwordinput">Password: </label>
      <input type="password" name="passwordinput" id="passwordinput" />
      <br />
      <input type="submit" name="usersubmit" id="usersubmit" />
    </form>
  );
}
