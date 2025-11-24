export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-6 dark:bg-neutral-950">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} DSA Sheet. All rights reserved.</p>
      </div>
    </footer>
  );
}
