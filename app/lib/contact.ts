export type ContactNumber = {
  label: string;
  phone: string;
  href: string;
};

export const CONTACT_NUMBERS: ContactNumber[] = [
  {
    label: "Office",
    phone: "+44 20 8040 3233",
    href: "tel:+44202080403233",
  },
  {
    label: "Mobile",
    phone: "+44 74 7002 5636",
    href: "tel:+447470025636",
  },
];