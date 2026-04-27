/**
 * Site Navigation Data
 *
 * Defines the complete navigation structure for St. Elizabeth High School website.
 * Based on Walker School's 10-item navigation pattern with nested submenus.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const siteNavigation: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/history" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Principal's Message", href: "/about/principal" },
      { label: "Faith & Values", href: "/about/values" },
      { label: "Campus & Facilities", href: "/about/campus" },
      { label: "Leadership Team", href: "/about/leadership" },
      { label: "School Calendar", href: "/about/calendar" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum Overview", href: "/academics/curriculum" },
      { label: "Grade 8", href: "/academics/grade-8" },
      { label: "Grade 9", href: "/academics/grade-9" },
      { label: "Grade 10 (SSC)", href: "/academics/grade-10" },
      { label: "Grade 11", href: "/academics/grade-11" },
      { label: "Grade 12 (HSC)", href: "/academics/grade-12" },
      { label: "Academic Calendar", href: "/academics/calendar" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admission Process", href: "/admissions/process" },
      { label: "Apply Online", href: "/admissions/apply" },
      { label: "Fee Structure", href: "/admissions/fees" },
      { label: "Scholarships", href: "/admissions/scholarships" },
      { label: "Transfer Students", href: "/admissions/transfer" },
      { label: "Schedule a Visit", href: "/admissions/visit" },
      { label: "FAQs", href: "/admissions/faq" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Athletics", href: "/student-life/athletics" },
      { label: "Arts & Music", href: "/student-life/arts" },
      { label: "Clubs & Activities", href: "/student-life/clubs" },
      { label: "Spiritual Life", href: "/student-life/spiritual" },
      { label: "Service & Outreach", href: "/student-life/service" },
      { label: "Student Council", href: "/student-life/council" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Parent Association", href: "/community/parents" },
      { label: "Alumni Network", href: "/community/alumni" },
      { label: "Events & News", href: "/community/events" },
      { label: "Newsletter", href: "/community/newsletter" },
      { label: "Parent Portal", href: "/community/portal" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "Contact Information", href: "/contact/info" },
      { label: "Directions", href: "/contact/directions" },
      { label: "Inquiry Form", href: "/contact/inquiry" },
    ],
  },
];

/**
 * Get navigation item by href
 */
export function getNavItemByHref(href: string): NavItem | null {
  for (const item of siteNavigation) {
    if (item.href === href) return item;
    if (item.children) {
      const child = item.children.find((c) => c.href === href);
      if (child) return child;
    }
  }
  return null;
}

/**
 * Get breadcrumb trail for a given href
 */
export function getBreadcrumbs(href: string): NavItem[] {
  const breadcrumbs: NavItem[] = [];

  for (const item of siteNavigation) {
    if (item.href === href) {
      breadcrumbs.push(item);
      return breadcrumbs;
    }
    if (item.children) {
      const child = item.children.find((c) => c.href === href);
      if (child) {
        breadcrumbs.push(item, child);
        return breadcrumbs;
      }
    }
  }

  return breadcrumbs;
}
