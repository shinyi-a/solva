const FooterContent = () => {
  let footnote = " © Copyright " + new Date().getFullYear() + ", ";
  return (
    <footer>
      {footnote}
      <span>Solva</span>
    </footer>
  );
};

export default FooterContent;
