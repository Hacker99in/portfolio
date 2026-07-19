export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="accent">{profile.name}</span> &middot; built with React &middot; &copy; {year}
      </div>
    </footer>
  );
}
