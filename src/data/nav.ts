export type NavItem = {
  label: string;
  href: string;
  /** Section id tracked by the scroll-spy; omitted for links without an on-page target. */
  sectionId?: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Class", href: "#class", sectionId: "class" },
  { label: "Membership", href: "#membership", sectionId: "membership" },
  { label: "Trainers", href: "#trainers", sectionId: "trainers" },
  // TODO: point Blog at the real blog once it exists.
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];
