'use client';

import type { Metadata } from 'next';
import { useState, useRef, FormEvent } from 'react';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { validateAdmissionsForm, isHoneypotFilled, type AdmissionsFormData, type FormErrors } from '@/lib/form-validation';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState<AdmissionsFormData>({
    parentName: '',
    email: '',
    phone: '',
    studentGrade: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstErrorRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    if (isHoneypotFilled(formData.website)) {
      console.warn('Honeypot triggered - bot detected');
      return;
    }

    const validationErrors = validateAdmissionsForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => firstErrorRef.current?.focus(), 100);
      return;
    }

    setIsSubmitting(true);
    console.log('Form valid, ready for submission:', formData);
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setErrors({});
    }
  };
  return (
    <ContentPage>
      <PageHero
        title="Admissions"
        description="Join Our Community"
        backgroundImage="/images/campus-2.jpg"
      />
      {/* Welcome Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          Welcome to St. Elizabeth
        </h2>
        <div
          className="walker-body"
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 800,
            color: 'var(--color-text-body)',
          }}
        >
          <p style={{ marginBottom: 24 }}>
            St. Elizabeth High School welcomes families seeking a faith-based education that forms
            the whole person — mind, body, and spirit. We are a community united by shared values:
            faith in God, commitment to excellence, and service to others.
          </p>
          <p style={{ marginBottom: 24 }}>
            Our admission process is designed to identify students who will thrive in our rigorous
            academic environment and contribute to our vibrant school community. We seek families
            who share our mission and are committed to partnering with us in their child's formation.
          </p>
          <p>
            We invite you to explore St. Elizabeth and discover how our Catholic education can
            prepare your child for a life of purpose, leadership, and service.
          </p>
        </div>
      </section>

      {/* Admission Process Timeline */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-light)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginBottom: 'var(--section-padding-y)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            How to Apply
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 48 }}
          >
            Admission Process
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <ProcessStep
              number="01"
              title="Submit Inquiry"
              description="Complete the inquiry form below to express your interest. Our admissions team will contact you within 2-3 business days to schedule a campus visit."
            />
            <ProcessStep
              number="02"
              title="Campus Visit & Interview"
              description="Tour our campus, meet faculty and students, and participate in a family interview. This is an opportunity to experience St. Elizabeth firsthand and ask questions."
            />
            <ProcessStep
              number="03"
              title="Submit Application"
              description="Complete the formal application with required documents: previous academic records, birth certificate, baptismal certificate (if applicable), and recommendation letters."
            />
            <ProcessStep
              number="04"
              title="Admission Decision & Enrollment"
              description="Receive admission decision within 2 weeks. Accepted families complete enrollment paperwork, pay enrollment deposit, and attend new family orientation."
            />
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            Start Your Journey
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
          >
            Inquiry Form
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 40, color: 'var(--color-text-body)' }}
          >
            Complete this form to begin the admission process. Our admissions team will reach out
            to schedule a campus visit and answer your questions.
          </p>

          {/* Inquiry Form */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-light)',
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

              <div>
                <label
                  htmlFor="parentName"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.parentName}
                  aria-describedby={errors.parentName ? 'parentName-error' : undefined}
                  ref={errors.parentName ? firstErrorRef : undefined}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.parentName ? 'var(--color-primary-maroon)' : '#ddd'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                  }}
                />
                {errors.parentName && (
                  <p id="parentName-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.parentName}
                  </p>
                )}
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
                  ref={errors.email && !errors.parentName ? firstErrorRef : undefined}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.email ? 'var(--color-primary-maroon)' : '#ddd'}`,
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  ref={errors.phone && !errors.parentName && !errors.email ? firstErrorRef : undefined}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.phone ? 'var(--color-primary-maroon)' : '#ddd'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                  }}
                />
                {errors.phone && (
                  <p id="phone-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="studentGrade"
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                    color: 'var(--color-text-dark)',
                  }}
                >
                  Student Grade Level *
                </label>
                <select
                  id="studentGrade"
                  name="studentGrade"
                  value={formData.studentGrade}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.studentGrade}
                  aria-describedby={errors.studentGrade ? 'studentGrade-error' : undefined}
                  ref={errors.studentGrade && !errors.parentName && !errors.email && !errors.phone ? firstErrorRef : undefined}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: `1px solid ${errors.studentGrade ? 'var(--color-primary-maroon)' : '#ddd'}`,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                  }}
                >
                  <option value="">Select grade</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
                {errors.studentGrade && (
                  <p id="studentGrade-error" style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }} role="alert">
                    {errors.studentGrade}
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
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 15,
                    border: '1px solid #ddd',
                    borderRadius: 4,
                    backgroundColor: 'var(--color-white)',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  backgroundColor: isSubmitting ? '#999' : 'var(--color-primary-maroon)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderRadius: 4,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {isSubmitting ? 'Validating...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 24 }}
          >
            Questions About Admissions?
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 32 }}
          >
            Our admissions team is here to help. Contact us to schedule a campus visit, ask
            questions, or learn more about St. Elizabeth High School.
          </p>
          <div style={{ fontSize: 16 }}>
            <p style={{ marginBottom: 12 }}>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:admissions@stelizabeth.edu.in"
                style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'underline' }}
              >
                admissions@stelizabeth.edu.in
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a
                href="tel:+918322234567"
                style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'underline' }}
              >
                +91 832 223 4567
              </a>
            </p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}

// Process Step Component (inline, single-use)
function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <div
        style={{
          flexShrink: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {number}
      </div>
      <div>
        <h3
          className="walker-heading"
          style={{ fontSize: 22, marginBottom: 12 }}
        >
          {title}
        </h3>
        <p className="walker-body" style={{ fontSize: 16, lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
