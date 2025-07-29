import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Users, Plus, Home } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-600 p-4 rounded-full">
              <FileText className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Gerador de Procuração para Serviços de Energia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gere sua procuração personalizada para serviços junto à concessionária de energia elétrica em poucos passos: 
            escolha o tipo de serviço, preencha os dados e baixe o documento em PDF!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <Zap className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Homologação</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Geração Distribuída Solar Fotovoltaica
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Rateio</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Divisão de energia entre unidades
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <Plus className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Aumento de Carga</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Ampliação da capacidade elétrica
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <Home className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Ligação Nova</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Nova conexão à rede elétrica
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link to="/formulario">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
              Começar Agora
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-white/50 border-teal-100">
            <CardContent className="py-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Como funciona?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div>
                  <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-semibold">1</span>
                  </div>
                  <p>Preencha os dados do outorgante e outorgado</p>
                </div>
                <div>
                  <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-semibold">2</span>
                  </div>
                  <p>Selecione o tipo de serviço desejado</p>
                </div>
                <div>
                  <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-teal-600 font-semibold">3</span>
                  </div>
                  <p>Gere e baixe seu PDF pronto para assinatura</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};