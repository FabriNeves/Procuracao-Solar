import * as React from 'react';
import { FormContainer } from './components/FormContainer';
import { PreviewContainer } from './components/PreviewContainer';
import { useFormData } from './hooks/useFormData';

export const FormPage = () => {
  const formData = useFormData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulário de Procuração
          </h1>
          <p className="text-gray-600">
            Preencha os dados abaixo para gerar sua procuração personalizada
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <FormContainer {...formData} />
          <PreviewContainer {...formData} />
        </div>
      </div>
    </div>
  );
};