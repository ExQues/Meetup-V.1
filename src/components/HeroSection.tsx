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
        <div className="flex flex-col lg:flex-row items-start justify-between min-h-[80vh] gap-12">
          
          {/* Coluna esquerda - Texto e CTAs */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-700 mb-8">
              <span className="text-sm font-medium text-gray-300">✨ Introducing Nodus Agent Template</span>
            </div>
            
            {/* Título principal */}
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-none">
              Make your
              <div className="relative inline-block">
                <span className="block">websites look</span>
                <div className="relative inline-block">
                  <span className="relative z-10">10x</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30"></div>
                </div>
                <span className="block">better</span>
              </div>
            </h1>
            
            {/* Subtítulo */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Copy paste the most trending components and use them in your websites without having to worry about styling and animations.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                Browse Components
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                Custom Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
            
            {/* Tecnologias */}
            <div className="flex flex-wrap gap-4 text-gray-400">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-700">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-700">
                <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                <span className="text-sm">React</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-700">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">TailwindCSS</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-700">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Framer Motion</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-700">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Remix</span>
              </div>
            </div>
          </div>
          
          {/* Coluna direita - Grid de cards */}
          <div className="flex-1 max-w-2xl">
            {/* Avatar row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full border-2 border-gray-800"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group">
                <div className="mb-4">
                  <div className="bg-white rounded-lg p-3 mb-4">
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Build world class</h3>
                  <p className="text-gray-400 text-sm">websites at warp speed</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                <div className="mb-4">
                  <h3 className="text-white font-medium text-sm mb-3">Beautify your website within minutes</h3>
                  <p className="text-gray-400 text-xs mb-6">With Aceternity UI, you can build great looking websites within minutes.</p>
                  <div className="text-center">
                    <div className="inline-block px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <span className="text-white text-lg font-semibold">Tadaa ✨</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm mb-2">
                    <span className="text-white font-medium">Hover over me</span>
                  </div>
                </div>
              </div>
              
              {/* Card 5 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 group">
                <div className="text-center">
                  <h3 className="text-gray-900 font-bold text-xl mb-1">Build</h3>
                  <p className="text-gray-600 text-sm">websites with Aceternity UI</p>
                </div>
              </div>
              
              {/* Card 6 */}
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg mb-1">Copy Paste,</h3>
                  <h3 className="text-white font-bold text-lg mb-2">Customize, Deploy.</h3>
                  <p className="text-gray-300 text-xs">Copy paste and be done with it.</p>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Overlay gradient para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;