import Navbar from "@/components/common/Navbar";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CompanyData } from "@/data/Company";
import { LearningData } from "@/data/Learning";
import LearningCard from "@/components/common/LearningCard";
import { FeatureData } from "@/data/Feature";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <Navbar />

      <main className="flex-1">

        {/* hero section */}
        <section className="relative overflow-hidden bg-background py-20 lg:py-32 max-w-10/12 mx-auto">

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              <div className="flex flex-col gap-6">

                <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl">
                  Master Coding. <br />
                  <span className="text-[#F9C505]">Land Your Dream Job.</span>
                </h1>
                <p className="text-pretty text-lg text-muted-foreground sm:text-xl">
                  The all-in-one platform for modern software engineers. Learn from industry experts, prepare for
                  high-stakes interviews, and find exclusive job opportunities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-[#F9C505] rounded-md border py-2 px-4 text-center transition-all text-white text-sm shadow-sm hover:shadow-lg">
                    <Link href="/signup" className="gap-2 flex items-center">
                      Start Learning Free <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </button>
                  <button className="rounded-md py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600">
                    <Link href="/videos">Browse Tutorials</Link>
                  </button>
                </div>
                <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <img
                          src={`/me.png?height=32&width=32&query=avatar-${i}`}
                          alt={`User ${i}`}
                        />
                      </div>
                    ))}
                  </div>
                  <span>Rated 4.9/5 by our community</span>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
                  <Image src="/hero_section.png" alt="Platform Dashboard" width={600} height={450} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trusted By section*/}
        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Our students work at top tech companies
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale md:gap-16">
              {CompanyData.map((company) => (
                <div key={company.id} className="flex items-center text-xl font-bold">
                  {
                    company.name
                  }
                </div>
              ))}
            </div>
          </div>
        </section>


         {/* Learning Paths */}
        <section className="py-24 max-w-10/12 mx-auto">
          <div className="container mx-auto px-4">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-center">Choose Your Learning Path</h2>
              <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground text-center">
                Structured paths designed to take you from your current level to job-ready in months.
              </p>
            <div className="grid gap-8 md:grid-cols-3">
              {LearningData.map((path, index) => (
                <div key={index} className="border p-6 rounded-md border-r-slate-600 hover:border-[#F9C505] shadow hover:shadow-sm" >
                    <LearningCard 
                        title={path.title} 
                        desc={path.desc} 
                        icon={path.icon} 
                        color={path.color}
                        link = {path.link}
                      />
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Feature Section */}
        <section className="bg-muted/30 py-24 max-w-10/12 mx-auto">

          <div className="container mx-auto px-4">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-video overflow-hidden rounded-2xl border bg-card shadow-xl lg:order-last">
                <Image src="/Interview.png" alt="Interview Practice" width={700} height={550} />
              </div>
               
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Everything you need to get hired.
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Beyond tutorials, we provide the tools and support to navigate the job market successfully.
                  </p>
                </div>

                <div className="grid gap-6">
                  {FeatureData.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Final CTA */}
        <section className="py-24 max-w-10/12 mx-auto">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl px-8 py-16 text-center bg-[#F9C505] md:px-16 md:py-24">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl text-white">Ready to transform your career?</h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90 sm:text-xl text-white">
                Join thousands of developers who have leveled up their skills and landed jobs at top tech companies.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white border py-2 px-4 text-center transition-all text-black text-sm shadow-sm hover:shadow-lg rounded-md">
                  <Link href="/signup">Get Started for Free</Link>
                </button>
                <button
                  className="bg-transparent text-primary-foreground py-2 px-4 border-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/contact">Talk to an Expert</Link>
                </button>
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
}
