const Footer = () => {
  let footnote = " © Copyright " + new Date().getFullYear() + ", ";
  return (
    <div className="footercontainer">
      <footer className="normalfooter">
        <div className="footerdivider"></div>
        <br />
        {footnote}
        <span className="logo footerlogo">SOLVA</span>
      </footer>
    </div>
  );
};

export default Footer;
