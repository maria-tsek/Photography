// Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" key="home-link">
            Food
          </Link>
        </li>
        <li>
          <Link href="/about" key="about-link">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" key="contact-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
