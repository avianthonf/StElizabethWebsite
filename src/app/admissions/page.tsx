import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';

export const metadata: Metadata = {
  title: 'Admissions | St. Elizabeth High School',
  description: 'Join the St. Elizabeth High School community. Learn about our admission process, requirements, and how to apply for grades 8-12.',
};

export default function AdmissionsPage() {
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

          {/* Form - Disabled for Phase 3 */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-light)',
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
              <div>
                <label
                  htmlFor="parent-name"
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
                  id="parent-name"
                  name="parent-name"
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
                  Phone Number *
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
                  htmlFor="student-grade"
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
                  id="student-grade"
                  name="student-grade"
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
                  <option value="">Select grade</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
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
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
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
