export function Footer() {
  return (
    <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-text-dark)', color: 'var(--color-white)' }}>
      <p>&copy; {new Date().getFullYear()} St. Elizabeth High School. All rights reserved.</p>
    </footer>
  );
}
