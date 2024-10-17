// app/intake-form/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Container } from '@/components/container'
import { GradientBackground } from '@/components/gradient'
import { Button } from '@/components/button'
import { v4 as uuidv4 } from 'uuid'

// Initialize Supabase client with hardcoded API keys
const supabaseUrl = 'https://nflnbqnrvuulmkysyawx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mbG5icW5ydnV1bG1reXN5YXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNjIxNTEsImV4cCI6MjAzNTYzODE1MX0.WH-_jPV4YJZCKw6W4aOD-_zglcBrufBnPUoRNXcKu34'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function IntakeForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)

      // Extract form fields
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const phone = formData.get('phone') as string
      const website = formData.get('website') as string
      const companyDescription = formData.get('company-description') as string
      const companyType = formData.get('company-type') as string
      const fundingRequirement = formData.get('funding-requirement') as string
      const businessLegalName = formData.get('legal-name') as string
      const legalEntityType = formData.get('legal-entity-type') as string
      const ein = formData.get('ein') as string
      const monthlyRevenueRange = formData.get('monthly-revenue') as string
      const agreeNda = formData.get('agree-nda') === 'on'

      // Extract files
      const incomeStatementFile = formData.get('income-statement') as File
      const balanceSheetFile = formData.get('balance-sheet') as File
      const cashFlowStatementFile = formData.get('cash-flow-statement') as File
      const companyDeckFile = formData.get('latest-company-deck') as File
      const additionalDocumentsFiles = formData.getAll('additional-documents') as File[]

      // Generate a unique identifier for the company
      const companyId = uuidv4()

      // Upload files to Supabase Storage
      const uploadFile = async (file: File, path: string) => {
        try {
          const { data, error } = await supabase.storage
            .from('company_uploads') // Ensure this bucket exists and has proper permissions
            .upload(path, file, {
              cacheControl: '3600',
              upsert: false,
            })

          if (error) {
            console.error('Supabase storage error:', error)
            throw error
          }

          if (!data) {
            throw new Error('No data returned from upload')
          }

          return data.path
        } catch (error) {
          console.error('File upload failed:', error)
          throw new Error('File upload failed. Please try again.')
        }
      }

      // Upload each file and get its path
      const incomeStatementPath = incomeStatementFile
        ? await uploadFile(
            incomeStatementFile,
            `${companyId}/income_statement/${incomeStatementFile.name}`
          )
        : null

      const balanceSheetPath = balanceSheetFile
        ? await uploadFile(
            balanceSheetFile,
            `${companyId}/balance_sheet/${balanceSheetFile.name}`
          )
        : null

      const cashFlowStatementPath = cashFlowStatementFile
        ? await uploadFile(
            cashFlowStatementFile,
            `${companyId}/cash_flow_statement/${cashFlowStatementFile.name}`
          )
        : null

      const companyDeckPath = companyDeckFile
        ? await uploadFile(
            companyDeckFile,
            `${companyId}/company_deck/${companyDeckFile.name}`
          )
        : null

      const additionalDocumentsPaths: string[] = []
      for (const file of additionalDocumentsFiles) {
        if (file && file.name) {
          const path = await uploadFile(
            file,
            `${companyId}/additional_documents/${file.name}`
          )
          additionalDocumentsPaths.push(path)
        }
      }

      // Prepare data for insertion
      const companyData = {
        id: companyId,
        name,
        email,
        phone,
        website,
        company_description: companyDescription,
        company_type: companyType,
        funding_requirement: fundingRequirement,
        business_legal_name: businessLegalName,
        legal_entity_type: legalEntityType,
        ein,
        monthly_revenue_range: monthlyRevenueRange,
        agree_nda: agreeNda,
        income_statement_path: incomeStatementPath,
        balance_sheet_path: balanceSheetPath,
        cash_flow_statement_path: cashFlowStatementPath,
        company_deck_path: companyDeckPath,
        additional_documents_paths: additionalDocumentsPaths,
      }

      // Insert data into Supabase
      const { error: insertError } = await supabase
        .from('companies')
        .insert([companyData])

      if (insertError) throw insertError

      // Show success message and redirect to homepage
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.push('/');
      }, 5000);
    } catch (error) {
      console.error('Error during submission:', error);
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Add these state variables at the top of your component
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Add this JSX right before the return statement
  if (showSuccessPopup) {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
        <div className="p-8 bg-white rounded-lg shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-black-600">Submission Successful!</h2>
          <p className="text-gray-600">Redirecting to homepage in 5 seconds...</p>
        </div>
      </div>
    );
  }

  if (showErrorPopup) {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
        <div className="p-8 bg-white rounded-lg shadow-xl">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Submission Error</h2>
          <p className="text-gray-600">An error occurred during submission. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mt-16">
        <form className="space-y-16" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Personal Information</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Please provide your personal details below.
            </p>
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
            </div>
          </section>

          {/* Company Information */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Company Information</h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Provide details about your company.
            </p>
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Website */}
                <div className="sm:col-span-4">
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      id="website"
                      name="website"
                      type="text"
                      required
                      placeholder="https://www.example.com"
                      className="block px-3 py-2 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Company Description */}
                <div className="col-span-full">
                  <label
                    htmlFor="company-description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="company-type"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="funding-requirement"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="legal-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="legal-entity-type"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="ein"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                  <label
                    htmlFor="monthly-revenue"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
            </div>
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
            <div className="mt-8 space-y-8">
              {/* Income Statement */}
              <div>
                <label
                  htmlFor="income-statement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Income Statement
                </label>
                <div className="mt-2">
                  {/* <input
                    id="income-statement"
                    name="income-statement"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  /> */}
                </div>
              </div>

              {/* Balance Sheet */}
              <div>
                <label
                  htmlFor="balance-sheet"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Balance Sheet
                </label>
                <div className="mt-2">
                  {/* <input
                    id="balance-sheet"
                    name="balance-sheet"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  /> */}
                </div>
              </div>
              {/* Cash Flow Statement */}
              <div>
                <label
                  htmlFor="cash-flow-statement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cash Flow Statement
                </label>
                <div className="mt-2">
                  {/* <input
                    id="cash-flow-statement"
                    name="cash-flow-statement"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  /> */}
                </div>
              </div>

              {/* Latest Company Deck */}
              <div>
                <label
                  htmlFor="latest-company-deck"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Latest Company Deck
                </label>
                <div className="mt-2">
                  {/* <input
                    id="latest-company-deck"
                    name="latest-company-deck"
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  /> */}
                </div>
              </div>
            </div>
          </section>

          {/* Additional Supporting Documents */}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">
              Additional Supporting Documents
            </h2>
            <p className="mt-4 text-gray-600 text-sm/6">
              Upload any additional documents such as budget models, velocities, etc.
            </p>
            <div className="mt-8">
              <label
                htmlFor="additional-documents"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Additional Supporting Documents
              </label>
              <div className="mt-2">
                {/* <input
                  id="additional-documents"
                  name="additional-documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  className="block w-full text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
                /> */}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end items-center mt-8">
            <Button type="submit" className="px-6 py-3" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Container>
      {/* Adjusted Footer to cover the whole screen */}
      <div className="mt-16">
        <Footer />
      </div>
    </main>
  )
}
