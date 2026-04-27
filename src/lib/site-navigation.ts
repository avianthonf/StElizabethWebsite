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
      { label: "Principal's Desk", href: "/about/principal" },
      { label: "Faith & Values", href: "/about/values" },
      { label: "Accreditation", href: "/about/accreditation" },
      { label: "Campus & Facilities", href: "/about/campus" },
      { label: "Leadership Team", href: "/about/leadership" },
      { label: "School Calendar", href: "/about/calendar" },
    ],
  },
  {
    label: "Admission",
    href: "/admission",
    children: [
      { label: "Apply Online", href: "/admission/apply" },
      { label: "Admission Process", href: "/admission/process" },
      { label: "Fee Structure", href: "/admission/fees" },
      { label: "Financial Aid", href: "/admission/financial-aid" },
      { label: "Schedule a Visit", href: "/admission/visit" },
      { label: "Virtual Tour", href: "/admission/virtual-tour" },
      { label: "FAQs", href: "/admission/faq" },
      { label: "Contact Admissions", href: "/admission/contact" },
      { label: "Transfer Students", href: "/admission/transfer" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Parent Association", href: "/community/parents" },
      { label: "Alumni Network", href: "/community/alumni" },
      { label: "Events & Calendar", href: "/community/events" },
      { label: "Newsletter", href: "/community/newsletter" },
      { label: "Parent Portal", href: "/community/portal" },
      { label: "Volunteer Opportunities", href: "/community/volunteer" },
    ],
  },
  {
    label: "Support St. Elizabeth",
    href: "/support",
    children: [
      { label: "Ways to Give", href: "/support/give" },
      { label: "Annual Fund", href: "/support/annual-fund" },
      { label: "Endowment", href: "/support/endowment" },
      { label: "Sponsor a Student", href: "/support/sponsor" },
    ],
  },
  {
    label: "Primary School",
    href: "/primary",
    children: [
      { label: "Overview", href: "/primary/overview" },
      { label: "Curriculum", href: "/primary/curriculum" },
      { label: "Daily Life", href: "/primary/daily-life" },
    ],
  },
  {
    label: "Lower School",
    href: "/lower-school",
    children: [
      { label: "Overview", href: "/lower-school/overview" },
      { label: "Curriculum", href: "/lower-school/curriculum" },
      { label: "Student Life", href: "/lower-school/student-life" },
    ],
  },
  {
    label: "New Avenues",
    href: "/new-avenues",
    children: [
      { label: "Program Overview", href: "/new-avenues/overview" },
      { label: "Learning Approach", href: "/new-avenues/approach" },
      { label: "Success Stories", href: "/new-avenues/stories" },
      { label: "Enrollment", href: "/new-avenues/enrollment" },
    ],
  },
  {
    label: "Middle School",
    href: "/middle-school",
    children: [
      { label: "Overview", href: "/middle-school/overview" },
      { label: "Academics", href: "/middle-school/academics" },
    ],
  },
  {
    label: "Upper School",
    href: "/upper-school",
    children: [
      { label: "Overview", href: "/upper-school/overview" },
      { label: "Academics", href: "/upper-school/academics" },
      { label: "College Counseling", href: "/upper-school/college" },
    ],
  },
  {
    label: "Activities",
    href: "/activities",
    children: [
      { label: "Athletics", href: "/activities/athletics" },
      { label: "Arts & Music", href: "/activities/arts" },
      { label: "Clubs & Organizations", href: "/activities/clubs" },
      { label: "Service Learning", href: "/activities/service" },
      { label: "Spiritual Life", href: "/activities/spiritual" },
      { label: "Student Government", href: "/activities/government" },
      { label: "Summer Programs", href: "/activities/summer" },
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
