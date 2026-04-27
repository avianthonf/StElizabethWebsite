'use client';

// TODO: Replace FORMSPREE_ENDPOINT with actual URL from Formspree dashboard
// See user_setup in 03-02-PLAN.md for instructions

import type { Metadata } from 'next';
import { useState, useRef, FormEvent } from 'react';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { validateContactForm, isHoneypotFilled, type ContactFormData, type FormErrors } from '@/lib/form-validation';
import { GdprConsent } from '@/components/ui/GdprConsent';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (isHoneypotFilled(formData.website)) {
      console.warn('Honeypot triggered - bot detected');
      return; // Silently fail for bots
    }

    // Validate
    const validationErrors = validateContactForm(formData);

    // Check GDPR consent
    if (!gdprConsent) {
      validationErrors.gdprConsent = 'You must consent to data processing to submit this form';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      setTimeout(() => {
        if (validationErrors.firstName) firstNameRef.current?.focus();
        else if (validationErrors.lastName) lastNameRef.current?.focus();
        else if (validationErrors.email) emailRef.current?.focus();
        else if (validationErrors.subject) subjectRef.current?.focus();
        else if (validationErrors.message) messageRef.current?.focus();
      }, 100);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Submit to Formspree
      // PLACEHOLDER: Replace with actual Formspree endpoint URL after user setup
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `Contact Form: ${formData.subject}`, // Formspree email subject
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for contacting us! We will respond within 1-2 business days.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          website: '',
        });
        setGdprConsent(false);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your form. Please try again or email us directly at info@stelizabeth.edu.in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setErrors({});
    }
  };
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
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

          {/* Contact Form */}
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              padding: 40,
              borderRadius: 8,
            }}
          >
            {/* Aria-live region for screen reader announcements */}
            <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-9999px' }}>
              {Object.keys(errors).length > 0 && `Form has ${Object.keys(errors).length} error${Object.keys(errors).length > 1 ? 's' : ''}`}
            </div>

            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Honeypot field - hidden from users */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label
                    htmlFor="firstName"
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
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    ref={firstNameRef}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: 15,
                      border: `1px solid ${errors.firstName ? 'var(--color-primary-maroon)' : 'var(--color-border-light)'}`,
                      borderRadius: 4,
                      backgroundColor: 'var(--color-white)',
                    }}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
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
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    ref={lastNameRef}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: 15,
                      border: `1px solid ${errors.lastName ? 'var(--color-primary-maroon)' : 'var(--color-border-light)'}`,
                      borderRadius: 4,
                      backgroundColor: 'var(--color-white)',
                    }}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                      {errors.lastName}
                    </p>
                  )}
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
                  value={formData.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  ref={emailRef}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.email ? 'var(--color-primary-maroon)' : 'var(--color-border-light)'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                  }}
                />
                {errors.email && (
                  <p id="email-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.email}
                  </p>
                )}
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
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
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
                  value={formData.subject}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  ref={subjectRef}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.subject ? 'var(--color-primary-maroon)' : 'var(--color-border-light)'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
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
                {errors.subject && (
                  <p id="subject-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.subject}
                  </p>
                )}
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
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  ref={messageRef}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.message ? 'var(--color-primary-maroon)' : 'var(--color-border-light)'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                    fontFamily: 'inherit',
                  }}
                />
                {errors.message && (
                  <p id="message-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <GdprConsent
                checked={gdprConsent}
                onChange={setGdprConsent}
                error={errors.gdprConsent}
                id="contact-gdpr-consent"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  backgroundColor: isSubmitting ? 'var(--color-gray-light)' : 'var(--color-primary-maroon)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: 4,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div
                  style={{
                    marginTop: 24,
                    padding: 16,
                    backgroundColor: 'var(--color-bg-light)',
                    borderLeft: '4px solid var(--color-primary-maroon)',
                    borderRadius: 4,
                  }}
                  role="status"
                  aria-live="polite"
                >
                  <p style={{ fontSize: 15, color: 'var(--color-text-dark)', margin: 0 }}>
                    {submitMessage}
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div
                  style={{
                    marginTop: 24,
                    padding: 16,
                    backgroundColor: 'var(--color-offwhite)',
                    borderLeft: '4px solid var(--color-primary-maroon)',
                    borderRadius: 4,
                  }}
                  role="alert"
                  aria-live="assertive"
                >
                  <p style={{ fontSize: 15, color: 'var(--color-primary-maroon)', margin: 0 }}>
                    {submitMessage}
                  </p>
                </div>
              )}
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
            backgroundColor: 'var(--color-gray-light)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed var(--color-border-light)',
          }}
        >
          <div style={{ textAlign: 'center', padding: 40 }}>
            <MapPin size={48} style={{ color: 'var(--color-primary-maroon)', marginBottom: 16 }} />
            <p
              style={{
                fontSize: 16,
                color: 'var(--color-gray)',
                marginBottom: 8,
              }}
            >
              Google Maps embed coming in Phase 3
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-gray)' }}>
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
