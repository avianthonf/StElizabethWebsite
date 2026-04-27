import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const highlights = [
  {
    title: "Academic Excellence",
    description:
      "A strong academic foundation that encourages curiosity, discipline, and lifelong learning.",
  },
  {
    title: "Faith & Values",
    description:
      "A school culture rooted in compassion, service, moral integrity, and holistic character formation.",
  },
  {
    title: "Vibrant Student Life",
    description:
      "Clubs, cultural activities, sports, and leadership opportunities that help every student grow with confidence.",
  },
];

const newsItems = [
  {
    title: "Admissions Open for the New Academic Year",
    category: "Admissions",
    description:
      "Applications are now open for the upcoming academic year. Families are invited to explore our campus and programmes.",
  },
  {
    title: "Celebrating Excellence in the Annual Day Programme",
    category: "Campus Life",
    description:
      "Students showcased talent, teamwork, and creativity during a memorable evening of performances and recognition.",
  },
  {
    title: "Community Outreach and Service Initiatives",
    category: "Community",
    description:
      "Our students continue to live the school’s values through meaningful acts of service in the wider community.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#f7f1e8] pt-40 pb-24">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#800000] lg:block" />
          <div className="relative mx-auto grid max-w-7xl gap-16 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-[#800000]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#800000] shadow-sm">
                Rooted in faith, growing in excellence
              </div>
              <h1 className="font-display text-5xl leading-[0.95] font-semibold text-[#002147] sm:text-6xl lg:text-7xl">
                A school community shaped by learning, values, and purpose.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-700 sm:text-xl">
                St. Elizabeth High School Pomburpa nurtures students through strong academics,
                moral formation, and a vibrant campus life inspired by service and dignity.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/admissions/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#800000] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#5c0000]"
                >
                  Begin Admission
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-[#002147] px-7 py-3 text-sm font-semibold text-[#002147] transition hover:bg-[#002147] hover:text-white"
                >
                  Discover Our Story
                </a>
              </div>
            </div>

            <div className="relative lg:pt-6">
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/40 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                <div className="aspect-[4/5] bg-[linear-gradient(180deg,rgba(128,0,0,0.06),rgba(0,33,71,0.2))] p-8 sm:p-10">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/70 bg-white/80 p-6 backdrop-blur">
                    <div>
                      <p className="text-sm uppercase tracking-[0.26em] text-[#800000]">St. Elizabeth</p>
                      <h2 className="mt-3 font-display text-3xl font-semibold text-[#002147]">
                        An academic home for disciplined minds and compassionate hearts.
                      </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#002147] p-5 text-white">
                        <div className="text-3xl font-semibold">50+</div>
                        <p className="mt-2 text-sm text-white/80">Years of educational legacy</p>
                      </div>
                      <div className="rounded-2xl bg-[#f5f1ea] p-5 text-[#002147]">
                        <div className="text-3xl font-semibold">Holistic</div>
                        <p className="mt-2 text-sm text-zinc-600">Formation through academics, faith, sports, and service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-zinc-200 bg-[#fcfbf8] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 h-1 w-16 rounded-full bg-[#D4AF37]" />
                  <h2 className="font-display text-2xl font-semibold text-[#002147]">{item.title}</h2>
                  <p className="mt-4 text-base leading-7 text-zinc-700">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#002147] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                Why families choose us
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Education that forms the whole person.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                "Dedicated teachers who combine care with academic rigour",
                "A disciplined environment that nurtures confidence and responsibility",
                "Meaningful opportunities in arts, athletics, and public speaking",
                "A values-led school culture grounded in respect, service, and faith",
              ].map((point) => (
                <div key={point} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="leading-7 text-white/85">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f1e8] py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#800000]">Latest updates</p>
                <h2 className="mt-3 font-display text-4xl font-semibold text-[#002147]">
                  Stories from our campus community
                </h2>
              </div>
              <a href="/news" className="text-sm font-semibold text-[#800000] hover:underline">
                View all news
              </a>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {newsItems.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-zinc-200">
                  <div className="h-56 bg-[linear-gradient(135deg,#800000,#002147)]" />
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#800000]">{item.category}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-[#002147]">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-zinc-700">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="rounded-[2rem] bg-[#800000] px-8 py-14 text-center text-white shadow-[0_20px_80px_rgba(128,0,0,0.22)] sm:px-12">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#F3E5AB]">Begin your journey</p>
              <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
                Visit our campus and experience our community firsthand.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                We would be delighted to welcome your family, share our story, and help you explore what makes St. Elizabeth a meaningful place to learn and grow.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/admissions/visit"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#800000] transition hover:bg-[#f7f1e8]"
                >
                  Schedule a Visit
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact the School
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
