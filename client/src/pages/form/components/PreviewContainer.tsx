import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '../hooks/useFormData';

interface PreviewContainerProps {
  formData: FormData;
  getFormattedDate: () => string;
  getValidityDate: () => string;
  getServiceText: () => string;
}

export const PreviewContainer = ({
  formData,
  getFormattedDate,
  getValidityDate,
  getServiceText,
}: PreviewContainerProps) => {
  const entityType = formData.outorgante.cpfCnpj.length > 14 ? 'jurídica' : 'física';
  const documentType = formData.outorgante.cpfCnpj.length > 14 ? 'CNPJ' : 'CPF';

  return (
    <div className="sticky top-8">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Pré-visualização da Procuração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 border rounded-lg font-serif text-sm leading-relaxed space-y-4 max-h-[600px] overflow-y-auto">
            <div className="text-right mb-6">
              {getFormattedDate() && <p>{getFormattedDate()}</p>}
            </div>

            <h2 className="text-center font-bold text-lg mb-6">PROCURAÇÃO</h2>

            <div>
              <p className="font-bold mb-2">OUTORGANTE:</p>
              <p>
                {formData.outorgante.nome || '[Nome do Outorgante]'}, pessoa {entityType}, 
                inscrita no {documentType} sob nº {formData.outorgante.cpfCnpj || '[CPF/CNPJ]'}, 
                com {entityType === 'física' ? 'residência' : 'sede'} na {formData.outorgante.endereco || '[Endereço]'}, 
                neste ato nomeia e constitui como seu procurador:
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">OUTORGADO:</p>
              <p>
                Vem, pelo presente instrumento particular de procuração, nomear e constituir seu bastante procurador, 
                o Sr. {formData.outorgado.nome || '[Nome do Procurador]'}, inscrito no CPF sob o nº {formData.outorgado.cpf || '[CPF do Procurador]'}.
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">PODER:</p>
              <p>
                {getServiceText() || '[O texto do poder aparecerá aqui quando você selecionar o tipo de serviço]'}
              </p>
            </div>

            <div>
              <p className="font-bold mb-2">OBJETIVO:</p>
              <p>
                Todos os poderes especificados nesta procuração destinam-se exclusivamente e especificamente à defesa 
                dos interesses do Outorgante junto à distribuidora {formData.concessionaria || '[Nome da Concessionária]'}.
              </p>
            </div>

            <p>
              O presente mandato vigorará até {getValidityDate() || '[Data de Validade]'}, vedado o substabelecimento 
              dos poderes ora outorgados.
            </p>

            <div className="mt-8">
              <p>{formData.local || '[Local]'}, {getFormattedDate() || '[Data]'}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-center">
                _____________________________________________________
              </p>
              <p className="text-center mt-2">
                {formData.outorgante.nome || '[Nome do Outorgante]'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};