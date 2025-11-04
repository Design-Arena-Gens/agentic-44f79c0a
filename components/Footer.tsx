export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>? {new Date().getFullYear()} NeonForge. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a className="nav-link" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          <a className="nav-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="nav-link" href="mailto:support@neonforge.gg">Contact</a>
        </div>
      </div>
    </footer>
  );
}
