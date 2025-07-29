import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generatePDF } from '../utils/pdfGenerator';
import type { FormData } from '../hooks/useFormData';

interface FormContainerProps {
  formData: FormData;
  updateFormData: (field: string, value: string) => void;
  getFormattedDate: () => string;
  getValidityDate: () => string;
  getServiceText: () => string;
  isFormValid: () => boolean;
}

export const FormContainer = ({
  formData,
  updateFormData,
  getFormattedDate,
  getValidityDate,
  getServiceText,
  isFormValid,
}: FormContainerProps) => {
  const handleGeneratePDF = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    generatePDF({
      formData,
      getFormattedDate,
      getValidityDate,
      getServiceText,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Outorgante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="outorgante-nome">Nome Completo *</Label>
            <Input
              id="outorgante-nome"
              value={formData.outorgante.nome}
              onChange={(e) => updateFormData('outorgante.nome', e.target.value)}
              placeholder="Digite o nome completo"
            />
          </div>
          <div>
            <Label htmlFor="outorgante-cpfcnpj">CPF/CNPJ *</Label>
            <Input
              id="outorgante-cpfcnpj"
              value={formData.outorgante.cpfCnpj}
              onChange={(e) => updateFormData('outorgante.cpfCnpj', e.target.value)}
              placeholder="Digite o CPF ou CNPJ"
            />
          </div>
          <div>
            <Label htmlFor="outorgante-endereco">Endereço Completo *</Label>
            <Input
              id="outorgante-endereco"
              value={formData.outorgante.endereco}
              onChange={(e) => updateFormData('outorgante.endereco', e.target.value)}
              placeholder="Digite o endereço completo"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Outorgado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="outorgado-nome">Nome Completo do Procurador *</Label>
            <Input
              id="outorgado-nome"
              value={formData.outorgado.nome}
              onChange={(e) => updateFormData('outorgado.nome', e.target.value)}
              placeholder="Digite o nome do procurador"
            />
          </div>
          <div>
            <Label htmlFor="outorgado-cpf">CPF *</Label>
            <Input
              id="outorgado-cpf"
              value={formData.outorgado.cpf}
              onChange={(e) => updateFormData('outorgado.cpf', e.target.value)}
              placeholder="Digite o CPF do procurador"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Serviço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="concessionaria">Concessionária de Energia *</Label>
            <Select value={formData.concessionaria} onValueChange={(value) => updateFormData('concessionaria', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a concessionária" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enel">Enel</SelectItem>
                <SelectItem value="CPFL">CPFL</SelectItem>
                <SelectItem value="Equatorial">Equatorial</SelectItem>
                <SelectItem value="Light">Light</SelectItem>
                <SelectItem value="EDP">EDP</SelectItem>
                <SelectItem value="Cemig">Cemig</SelectItem>
                <SelectItem value="Copel">Copel</SelectItem>
                <SelectItem value="Celesc">Celesc</SelectItem>
                <SelectItem value="outras">Outras</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipo-servico">Tipo de Serviço *</Label>
            <Select value={formData.tipoServico} onValueChange={(value) => updateFormData('tipoServico', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homologacao">Homologação (Geração Distribuída)</SelectItem>
                <SelectItem value="rateio">Rateio</SelectItem>
                <SelectItem value="aumento_carga">Aumento de Carga</SelectItem>
                <SelectItem value="ligacao_nova">Ligação Nova</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local e Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="local">Local da Assinatura *</Label>
            <Input
              id="local"
              value={formData.local}
              onChange={(e) => updateFormData('local', e.target.value)}
              placeholder="Ex: São Paulo, SP"
            />
          </div>
          <div>
            <Label htmlFor="data">Data da Assinatura *</Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => updateFormData('data', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleGeneratePDF}
        className="w-full bg-teal-600 hover:bg-teal-700"
        size="lg"
        disabled={!isFormValid()}
      >
        <Download className="h-4 w-4 mr-2" />
        Gerar PDF
      </Button>
    </div>
  );
};