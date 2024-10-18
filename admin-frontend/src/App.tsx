// App.tsx
import { useState, useEffect } from 'react';
import './App.css';
import supabase from '../supabase';
import Navbar from './navbar';

interface Company {
  id: string;
  agree_nda: boolean;
  created_at: string;
  phone: string;
  website: string;
  company_description: string;
  company_type: string;
  funding_requirement: string;
  business_legal_name: string;
  legal_entity_type: string;
  ein: string;
  monthly_revenue_range: string;
  additional_documents_paths: string[];
  income_statement_path: string;
  balance_sheet_path: string;
  cash_flow_statement_path: string;
  company_deck_path: string;
  name: string;
  email: string;
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await supabase.from('companies').select('*');

      if (error) {
        console.error('Error fetching companies:', error);
      } else {
        setCompanies(data as Company[]);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <>
      <div className="cards-container">
        {companies.map((company) => (
          <div className="card" key={company.id}>
            <h2>{company.business_legal_name}</h2>
            <p><strong>Name:</strong> {company.name}</p>
            <p><strong>Email:</strong> {company.email}</p>
            <p><strong>Phone:</strong> {company.phone}</p>
            <p><strong>Website:</strong> <a href={company.website}>{company.website}</a></p>
            <p><strong>Description:</strong> {company.company_description}</p>
            <p><strong>Company Type:</strong> {company.company_type}</p>
            <p><strong>Funding Requirement:</strong> {company.funding_requirement}</p>
            <p><strong>Monthly Revenue Range:</strong> {company.monthly_revenue_range}</p>

            <h3>Documents</h3>
            <ul>
              {company.income_statement_path && (
                <li>
                  <a href={getPublicUrl(company.income_statement_path)} target="_blank" rel="noopener noreferrer">
                    Income Statement
                  </a>
                </li>
              )}
              {company.balance_sheet_path && (
                <li>
                  <a href={getPublicUrl(company.balance_sheet_path)} target="_blank" rel="noopener noreferrer">
                    Balance Sheet
                  </a>
                </li>
              )}
              {company.cash_flow_statement_path && (
                <li>
                  <a href={getPublicUrl(company.cash_flow_statement_path)} target="_blank" rel="noopener noreferrer">
                    Cash Flow Statement
                  </a>
                </li>
              )}
              {company.company_deck_path && (
                <li>
                  <a href={getPublicUrl(company.company_deck_path)} target="_blank" rel="noopener noreferrer">
                    Company Deck
                  </a>
                </li>
              )}
              {company.additional_documents_paths &&
                company.additional_documents_paths.map((path, index) => (
                  <li key={index}>
                    <a href={getPublicUrl(path)} target="_blank" rel="noopener noreferrer">
                      Additional Document {index + 1}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

// Helper function to construct the public URL for a file
function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from('company_uploads').getPublicUrl(path);

  return data.publicUrl;
}

export default App;
