import React from "react";

interface FooterLinksProps {
  links: { name: string; href: string }[];
}

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-sm text-gray-400 hover:text-mediarch"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
