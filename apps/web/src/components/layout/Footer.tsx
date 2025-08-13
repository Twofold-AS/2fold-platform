export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-8 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Twofold AS
      </div>
    </footer>
  );
}
