const DashFooter = () => {
  let footnote = " © Copyright " + new Date().getFullYear() + ", ";
  return (
    <footer>
      <div className="dashboardfooterdivider"></div>
      <br />
      {footnote}
      <span className="logo footerlogo">SOLVA</span>
    </footer>
  );
};

export default DashFooter;
