import * as React from 'react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface FormData {
  outorgante: {
    nome: string;
    cpfCnpj: string;
    endereco: string;
  };
  outorgado: {
    nome: string;
    cpf: string;
  };
  concessionaria: string;
  tipoServico: string;
  local: string;
  data: string;
}

export const useFormData = () => {
  const today = new Date();
  const validityDate = addDays(today, 90);
  
  const [formData, setFormData] = React.useState<FormData>({
    outorgante: {
      nome: '',
      cpfCnpj: '',
      endereco: '',
    },
    outorgado: {
      nome: '',
      cpf: '',
    },
    concessionaria: '',
    tipoServico: '',
    local: '',
    data: format(today, 'yyyy-MM-dd'),
  });

  const updateFormData = (field: string, value: string) => {
    const fieldParts = field.split('.');
    if (fieldParts.length === 2) {
      const [section, key] = fieldParts;
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof FormData],
          [key]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const getFormattedDate = () => {
    if (!formData.data) return '';
    const date = new Date(formData.data);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const getValidityDate = () => {
    if (!formData.data) return '';
    const date = new Date(formData.data);
    const validity = addDays(date, 90);
    return format(validity, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const getServiceText = () => {
    switch (formData.tipoServico) {
      case 'homologacao':
        return 'O outorgado está autorizado a solicitar e realizar todos os procedimentos necessários para o cadastro do estabelecimento, com o objetivo de solicitar o acesso à Geração Distribuída como fonte solar fotovoltaica. Esta autorização inclui a interação com órgãos competentes, o preenchimento de formulários específicos e a comunicação com entidades relacionadas à homologação, tais como a distribuidora de energia, a ouvidoria e/ou a ANEEL, conforme necessário para a devida implementação da homologação. Além disso, o outorgado tem poderes para requerer, juntar, retirar e assinar documentos, bem como formulários, conforme necessário para o cumprimento das finalidades acima mencionadas.';
      case 'rateio':
        return 'O outorgado está autorizado a solicitar e realizar todos os procedimentos necessários para implementação do sistema de rateio de energia elétrica, incluindo a interação com a distribuidora de energia, preenchimento de formulários específicos, comunicação com órgãos competentes e demais atividades relacionadas ao rateio entre unidades consumidoras. O outorgado tem poderes para requerer, juntar, retirar e assinar documentos necessários para o cumprimento desta finalidade.';
      case 'aumento_carga':
        return 'O outorgado está autorizado a solicitar e realizar todos os procedimentos necessários para o aumento de carga elétrica do estabelecimento, incluindo a interação com a distribuidora de energia, preenchimento de formulários específicos, análise técnica, aprovação do projeto e demais atividades relacionadas ao aumento da capacidade elétrica. O outorgado tem poderes para requerer, juntar, retirar e assinar documentos necessários para o cumprimento desta finalidade.';
      case 'ligacao_nova':
        return 'O outorgado está autorizado a solicitar e realizar todos os procedimentos necessários para a ligação nova de energia elétrica, incluindo a interação com a distribuidora de energia, preenchimento de formulários específicos, análise técnica, aprovação do projeto, instalação e demais atividades relacionadas à nova conexão à rede elétrica. O outorgado tem poderes para requerer, juntar, retirar e assinar documentos necessários para o cumprimento desta finalidade.';
      default:
        return '';
    }
  };

  const isFormValid = () => {
    return (
      formData.outorgante.nome.trim() !== '' &&
      formData.outorgante.cpfCnpj.trim() !== '' &&
      formData.outorgante.endereco.trim() !== '' &&
      formData.outorgado.nome.trim() !== '' &&
      formData.outorgado.cpf.trim() !== '' &&
      formData.concessionaria.trim() !== '' &&
      formData.tipoServico.trim() !== '' &&
      formData.local.trim() !== '' &&
      formData.data.trim() !== ''
    );
  };

  return {
    formData,
    updateFormData,
    getFormattedDate,
    getValidityDate,
    getServiceText,
    isFormValid,
  };
};