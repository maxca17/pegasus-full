import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Button } from '@/components/button' // Assuming you have a Button component

export default function IntakeForm() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16">
        <div className="space-y-16">
          {/* Personal Information */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Personal Information</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Please provide your personal details below.
            </p>
            <form className="mt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Name */}
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Company Information</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Provide details about your company.
            </p>
            <form className="mt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Website */}
                <div className="sm:col-span-4">
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      id="website"
                      name="website"
                      type="url"
                      required
                      placeholder="https://www.example.com"
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Company Description */}
                <div className="col-span-full">
                  <label htmlFor="company-description" className="block text-sm font-medium leading-6 text-gray-900">
                    Company Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="company-description"
                      name="company-description"
                      rows={4}
                      required
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Company Type */}
                <div className="sm:col-span-3">
                  <label htmlFor="company-type" className="block text-sm font-medium leading-6 text-gray-900">
                    Company Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="company-type"
                      name="company-type"
                      required
                      className="block px-3 py-2 w-full text-gray-900 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a type</option>
                      <option>LLC</option>
                      <option>Corporation</option>
                      <option>Partnership</option>
                      <option>Sole Proprietorship</option>
                    </select>
                  </div>
                </div>

                {/* Funding Requirement */}
                <div className="sm:col-span-3">
                  <label htmlFor="funding-requirement" className="block text-sm font-medium leading-6 text-gray-900">
                    Funding Requirement
                  </label>
                  <div className="mt-2">
                    <select
                      id="funding-requirement"
                      name="funding-requirement"
                      required
                      className="block px-3 py-2 w-full text-gray-900 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an amount</option>
                      <option>$0 - $50,000</option>
                      <option>$50,001 - $100,000</option>
                      <option>$100,001 - $500,000</option>
                      <option>$500,001 - $1,000,000</option>
                      <option>$1,000,001+</option>
                    </select>
                  </div>
                </div>

                {/* Business Legal Name */}
                <div className="sm:col-span-3">
                  <label htmlFor="legal-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Business Legal Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="legal-name"
                      name="legal-name"
                      type="text"
                      required
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Legal Entity Type */}
                <div className="sm:col-span-3">
                  <label htmlFor="legal-entity-type" className="block text-sm font-medium leading-6 text-gray-900">
                    Legal Entity Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="legal-entity-type"
                      name="legal-entity-type"
                      required
                      className="block px-3 py-2 w-full text-gray-900 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a type</option>
                      {/* Replace with your provided list */}
                      <option>LLC</option>
                      <option>C-Corporation</option>
                      <option>S-Corporation</option>
                      <option>Partnership</option>
                      <option>Sole Proprietorship</option>
                    </select>
                  </div>
                </div>

                {/* EIN */}
                <div className="sm:col-span-3">
                  <label htmlFor="ein" className="block text-sm font-medium leading-6 text-gray-900">
                    EIN
                  </label>
                  <div className="mt-2">
                    <input
                      id="ein"
                      name="ein"
                      type="text"
                      required
                      placeholder="XX-XXXXXXX"
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Monthly Revenue Range */}
                <div className="sm:col-span-3">
                  <label htmlFor="monthly-revenue" className="block text-sm font-medium leading-6 text-gray-900">
                    Monthly Revenue Range
                  </label>
                  <div className="mt-2">
                    <select
                      id="monthly-revenue"
                      name="monthly-revenue"
                      required
                      className="block px-3 py-2 w-full text-gray-900 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a range</option>
                      <option>$0 - $10,000</option>
                      <option>$10,001 - $50,000</option>
                      <option>$50,001 - $100,000</option>
                      <option>$100,001 - $500,000</option>
                      <option>$500,001+</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* NDA Placeholder */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Non-Disclosure Agreement</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Please review and agree to our standard mutual NDA before proceeding.
            </p>
            {/* Placeholder for NDA content */}
            <div className="p-4 mt-6 bg-gray-50 rounded-md">
              {/* Replace this with your actual NDA content or a link */}
              <p className="text-gray-600 text-sm/6">
                [Standard Dream mNDA content goes here.]
              </p>
            </div>
            <div className="flex items-center mt-4">
              <input
                id="agree-nda"
                name="agree-nda"
                type="checkbox"
                required
                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600"
              />
              <label htmlFor="agree-nda" className="block ml-2 text-sm text-gray-900">
                I have read and agree to the Non-Disclosure Agreement
              </label>
            </div>
          </section>

          {/* Financial Information */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Financial Information</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Upload your financial documents below.
            </p>
            <form className="mt-8">
              <div className="space-y-8">
                {/* Income Statement */}
                <div>
                  <label htmlFor="income-statement" className="block text-sm font-medium leading-6 text-gray-900">
                    Income Statement
                  </label>
                  <div className="mt-2">
                    <input
                      id="income-statement"
                      name="income-statement"
                      type="file"
                      required
                      className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Balance Sheet */}
                <div>
                  <label htmlFor="balance-sheet" className="block text-sm font-medium leading-6 text-gray-900">
                    Balance Sheet
                  </label>
                  <div className="mt-2">
                    <input
                      id="balance-sheet"
                      name="balance-sheet"
                      type="file"
                      required
                      className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Cash Flow Statement */}
                <div>
                  <label htmlFor="cash-flow-statement" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash Flow Statement
                  </label>
                  <div className="mt-2">
                    <input
                      id="cash-flow-statement"
                      name="cash-flow-statement"
                      type="file"
                      required
                      className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Additional Supporting Documents */}
                <div>
                  <label htmlFor="additional-documents" className="block text-sm font-medium leading-6 text-gray-900">
                    Additional Supporting Documents
                  </label>
                  <p className="mt-1 text-sm text-gray-600">
                    Upload any additional documents such as budget models, velocities, etc.
                  </p>
                  <div className="mt-2">
                    <input
                      id="additional-documents"
                      name="additional-documents"
                      type="file"
                      multiple
                      className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end items-center mt-8">
            {/* Using your Button component for consistency */}
            <Button type="submit" className="px-6 py-3">
              Submit
            </Button>
          </div>
        </div>
      </Container>
      {/* Adjusted Footer to cover the whole screen */}
      <div className="mt-16">
        <Footer />
      </div>
    </main>
  )
}
