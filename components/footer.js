const Footer = () => {
  let footnote = " © Copyright " + new Date().getFullYear() + ", ";
  return (
    <footer className="normalfooter">
      <div className="footerdivider"></div>
      <br />
      {footnote}
      <span className="logo footerlogo">SOLVA</span>
    </footer>
  );
};

export default Footer;
