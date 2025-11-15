import React from 'react';
import { BackgroundBeams } from './ui/background-beams';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Efeito de luzes de fundo */}
      <BackgroundBeams 
        className="absolute inset-0 z-0" 
        color="#18CCFC" 
        visible={18}
      />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          
          {/* Coluna esquerda - Texto e CTAs */}
          <div className="flex-1 max-w-2xl mb-12 lg:mb-0">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
              <span className="text-sm font-medium text-gray-300">✨ Transformando Ideias em Realidade</span>
            </div>
            
            {/* Título principal */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Crie experiências
              <span className="block">que </span>
              <span className="block relative">
                encantam
                <span className="absolute -right-8 top-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg opacity-20"></span>
              </span>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Desenvolva interfaces modernas e intuitivas com nossa plataforma completa. 
              Do conceito à implementação, transforme suas ideias em realidade digital.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Começar Agora
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Ver Demonstração
              </Button>
            </div>
            
            {/* Tecnologias */}
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">React</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Node.js</span>
              </div>
            </div>
          </div>
          
          {/* Coluna direita - Grid de cards */}
          <div className="flex-1 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Desenvolvimento Rápido</h3>
                  <p className="text-gray-400 text-sm">Crie aplicações modernas em tempo recorde com nossas ferramentas inteligentes.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">UI</span>
                    </div>
                    <span className="text-purple-400 text-sm font-medium">Interface Premium</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Design Excepcional</h3>
                  <p className="text-gray-300 text-sm">Interfaces elegantes que cativam seus usuários desde o primeiro clique.</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Confiável</h3>
                  <p className="text-gray-400 text-sm">Soluções testadas e otimizadas para performance máxima.</p>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl mb-2">Copie, Cole, Personalize</h3>
                  <p className="text-gray-300 text-sm mb-3">Simples assim. Pronto para produção.</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Overlay gradient para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;