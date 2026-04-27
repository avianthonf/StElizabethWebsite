import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | St. Elizabeth High School',
  description: 'Get in touch with St. Elizabeth High School, Pomburpa, Goa. Visit us, call, or email for inquiries about admissions, academics, and school programs.',
};

export default function ContactPage() {
  return (
    <ContentPage>
      <PageHero
        title="Contact Us"
        description="Get in Touch"
        backgroundImage="/images/campus-3.jpg"
      />
      {/* Contact Information Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          Visit St. Elizabeth High School
        </h2>
        <p
          className="walker-body"
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 800,
            color: 'var(--color-text-body)',
            marginBottom: 48,
          }}
        >
          We welcome visitors to our campus. Whether you're a prospective family, community member,
          or alumni, we invite you to experience St. Elizabeth firsthand. Contact us to schedule a
          campus tour or to learn more about our programs.
        </p>

        {/* Contact Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
            marginBottom: 64,
          }}
        >
          <ContactCard
            icon={<MapPin size={24} />}
            title="Address"
            content={
              <>
                St. Elizabeth High School
                <br />
                Pomburpa, Bardez
                <br />
                Goa 403523, India
              </>
            }
          />
          <ContactCard
            icon={<Phone size={24} />}
            title="Phone"
            content={
              <a
                href="tel:+918322234567"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                +91 832 223 4567
              </a>
            }
          />
          <ContactCard
            icon={<Mail size={24} />}
            title="Email"
            content={
              <a
                href="mailto:info@stelizabeth.edu.in"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                info@stelizabeth.edu.in
              </a>
            }
          />
          <ContactCard
            icon={<Clock size={24} />}
            title="Office Hours"
            content={
              <>
                Monday - Friday
                <br />
                8:00 AM - 4:00 PM
                <br />
                (Closed on public holidays)
              </>
            }
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-light)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginBottom: 'var(--section-padding-y)',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            Send Us a Message
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
          >
            Contact Form
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 40, color: 'var(--color-text-body)' }}
          >
            Have a question or need more information? Fill out the form below and our team will
            respond within 1-2 business days.
          </p>

          {/* Form - Disabled for Phase 3 */}
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              padding: 40,
              borderRadius: 8,
              border: '2px dashed var(--color-primary-maroon)',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-primary-maroon)',
                marginBottom: 24,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              ⚠️ Form integration coming in Phase 3 (Requirements FORM-01 through FORM-05)
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label
                    htmlFor="first-name"
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: 'var(--color-text-dark)',
                    }}
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    disabled
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: 15,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      backgroundColor: '#f9f9f9',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: 'var(--color-text-dark)',
                    }}
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    disabled
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: 15,
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      backgroundColor: '#f9f9f9',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="academics">Academic Programs</option>
                  <option value="athletics">Athletics</option>
                  <option value="arts">Arts Programs</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    backgroundColor: '#f9f9f9',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled
                style={{
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  backgroundColor: '#ccc',
                  color: '#666',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'not-allowed',
                }}
              >
                Form submission coming in Phase 3
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <p className="walker-overline" style={{ marginBottom: 16 }}>
          Find Us
        </p>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 32 }}
        >
          Campus Location
        </h2>

        {/* Map Placeholder */}
        <div
          style={{
            minHeight: 400,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ddd',
          }}
        >
          <div style={{ textAlign: 'center', padding: 40 }}>
            <MapPin size={48} style={{ color: 'var(--color-primary-maroon)', marginBottom: 16 }} />
            <p
              style={{
                fontSize: 16,
                color: '#666',
                marginBottom: 8,
              }}
            >
              Google Maps embed coming in Phase 3
            </p>
            <p style={{ fontSize: 14, color: '#999' }}>
              Interactive map showing St. Elizabeth High School location in Pomburpa, Goa
            </p>
          </div>
        </div>

        {/* Directions */}
        <div
          style={{
            marginTop: 32,
            padding: 24,
            backgroundColor: 'var(--color-bg-light)',
            borderRadius: 8,
          }}
        >
          <h3
            className="walker-heading"
            style={{ fontSize: 20, marginBottom: 16 }}
          >
            Directions
          </h3>
          <p className="walker-body" style={{ fontSize: 15, lineHeight: 1.6 }}>
            St. Elizabeth High School is located in Pomburpa, Bardez, North Goa. The campus is
            easily accessible from Panaji (15 km), Mapusa (8 km), and Calangute (5 km). Visitors
            can reach us via NH66 or local roads through Bardez taluka.
          </p>
        </div>
      </section>

      {/* Department Contacts */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 40, textAlign: 'center' }}
          >
            Department Contacts
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 32,
            }}
          >
            <DepartmentContact
              department="Admissions Office"
              email="admissions@stelizabeth.edu.in"
              phone="+91 832 223 4567"
            />
            <DepartmentContact
              department="Principal's Office"
              email="principal@stelizabeth.edu.in"
              phone="+91 832 223 4568"
            />
            <DepartmentContact
              department="Academic Office"
              email="academics@stelizabeth.edu.in"
              phone="+91 832 223 4569"
            />
            <DepartmentContact
              department="Finance Office"
              email="finance@stelizabeth.edu.in"
              phone="+91 832 223 4570"
            />
          </div>
        </div>
      </section>
    </ContentPage>
  );
}

// Contact Card Component (inline, single-use)
function ContactCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 32,
        backgroundColor: 'var(--color-bg-light)',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          color: 'var(--color-primary-maroon)',
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <h3
        className="walker-heading"
        style={{ fontSize: 18, marginBottom: 12 }}
      >
        {title}
      </h3>
      <div className="walker-body" style={{ fontSize: 15, lineHeight: 1.6 }}>
        {content}
      </div>
    </div>
  );
}

// Department Contact Component (inline, single-use)
function DepartmentContact({
  department,
  email,
  phone,
}: {
  department: string;
  email: string;
  phone: string;
}) {
  return (
    <div>
      <h3
        className="walker-heading"
        style={{ fontSize: 18, marginBottom: 12 }}
      >
        {department}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.9)' }}>
        <a
          href={`mailto:${email}`}
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          {email}
        </a>
        <br />
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          style={{ color: 'inherit', textDecoration: 'underline' }}
        >
          {phone}
        </a>
      </p>
    </div>
  );
}
