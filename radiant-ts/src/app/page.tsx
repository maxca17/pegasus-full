// Main Page 

import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud' // This is the set of logo images
import { LogoCluster } from '@/components/logo-cluster' 
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
}


// Top Section of the page (includes the navbar and the hero section)
function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute bottom-0 inset-2 ring-1 ring-inset rounded-4xl ring-black/5" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
            >
              CUTS Clothing raises $10M in Debt from Dream Ventures
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-4xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-6xl/[0.8] md:text-7xl/[0.8]"          >
          Flexible Financing Built for Lasting Partnerships
          </h1>
          <p className="mt-8 max-w-lg font-medium text-xl/7 text-gray-950/75 sm:text-2xl/8">
            Trusted financing solutions that grow with your vision and goals.
          </p>
          <div className="flex flex-col gap-y-4 gap-x-6 mt-12 sm:flex-row">
            <Button href="/blog">Apply Now</Button>
            <Button variant="secondary" href="/pricing">
              View Case Studies
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}



function BentoSection() {
  return (
    <Container>
      <Subheading>Financing Solutions</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Identify the best financing solution.
      </Heading>

      <div className="grid grid-cols-1 gap-4 mt-10 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Insight"
          title="Comprehensive Financial Clarity"
          description="Our platform seamlessly integrates with your core systems—accounting, marketing, and sales—to deliver real-time, data-driven insights into your business's financial health."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Risk Analysis"
          title="Data-Driven Underwriting"
          description="We combine advanced data analytics with real-time inputs from your integrated systems to assess both financial and operational risks. This comprehensive approach ensures our financing solutions are transparent, fair, and tailored to your unique risk profile, empowering you with confidence and clarity."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Speed"
          title="Efficiency at Your Fingertips"
          description="Our platform is built for speed, enabling rapid pre-approvals and faster access to capital. Streamlined processes and real-time data integration mean you get funding quickly, allowing you to stay focused on what matters—driving your business forward."
          graphic={
            <div className="flex pt-10 pl-10 size-full">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Source"
          title="Get the furthest reach"
          description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="py-32 mx-2 mt-2 bg-gray-900 rounded-4xl">
      <Container>
        <Subheading dark>Outreach</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Customer outreach has never been easier.
        </Heading>

        <div className="grid grid-cols-1 gap-4 mt-10 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Networking"
            title="Sell at the speed of light"
            description="Our RadiantAI chat assistants analyze the sentiment of your conversations in real time, ensuring you're always one step ahead."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Integrations"
            title="Meet leads where they are"
            description="With thousands of integrations, no one will be able to escape your cold outreach."
            graphic={<LogoTimeline />}
            // `!overflow-visible` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Meetings"
            title="Smart call scheduling"
            description="Automatically insert intro calls into your leads' calendars without their consent."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Engagement"
            title="Become a thought leader"
            description="RadiantAI automatically writes LinkedIn posts that relate current events to B2B sales, helping you build a reputation as a thought leader."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">

          <BentoSection />
        </div>
        <DarkBentoSection />
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}


