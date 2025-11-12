import { Calendar, Clock, Wifi, Users, Zap, Star, ArrowRight, Sparkles, Code, Terminal, Monitor, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { useEffect, useRef } from 'react'

export default function EventPage() {
  const glowRef = useRef<HTMLDivElement>(null)
  const beamsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [])
  return (
    <div className="min-h-screen bg-black">
      {/* Dark Hero Section - All Black with Subtle Effects */}
      <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
        <BackgroundBeams color="#32F08C" visible={14} />
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="mb-8" initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <div className="inline-flex items-center px-6 py-3 bg-black border border-gray-800 rounded-full text-sm font-medium hover:border-gray-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Monitor className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-300 font-semibold">
                  Evento Online & Gratuito
                </span>
              </div>
            </motion.div>
            
            <motion.div className="mb-8" initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.05}}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-2">
                <span className="block text-white">Demonstração e Live Demo</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                <span className="text-[#32F08C]">TRAE SOLO</span>
                <span className="text-gray-300"> em ação</span>
              </p>
            </motion.div>
            
            <motion.div className="max-w-3xl mx-auto mb-10" initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-6">
                Veja o TRAE criar, integrar e executar projetos reais usando Browser, Docview e Integrações Inteligentes. 
                Helio mostrará, ao vivo, como transformar ideias em produtos prontos em poucos minutos.
              </p>
            </motion.div>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12" initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.15}}>
              <div className="flex items-center px-6 py-3 bg-black rounded-full border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-lg font-medium text-gray-300">23 de novembro de 2025</span>
              </div>
              <div className="flex items-center px-6 py-3 bg-black rounded-full border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <Clock className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-lg font-medium text-gray-300">Formato Online</span>
              </div>
            </motion.div>
            
            <motion.a href="https://luma.com/d2kocb6e" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center bg-black border border-gray-600 hover:border-gray-400 text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.2}}>
              <span className="flex items-center relative z-10">
                Garantir Minha Vaga Gratuita
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* All Black Features Section with 3D effects */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                O que você vai experimentar
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Uma jornada completa através do poder da inteligência artificial
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
              {/* Black Feature 1 with hover effect */}
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                <div className="relative bg-[#0a0a0a] rounded-2xl p-8 ring-1 ring-gray-800/60 shadow-lg shadow-black/50 group-hover:-translate-y-2 group-hover:shadow-black/70 transition-all duration-500 h-full flex flex-col">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-800 group-hover:border-gray-600 group-hover:scale-110 transition-all duration-300">
                      <Code className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gray-200 transition-colors">Códigos PRO & Premiações</h3>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors mt-auto">Durante a live, os participantes poderão receber códigos exclusivos TRAE PRO, garantindo acesso gratuito e completo por tempo limitado. Além disso, haverá outras premiações surpresa ao longo do evento.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Black Feature 2 */}
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
                <div className="relative bg-[#0a0a0a] rounded-2xl p-8 ring-1 ring-gray-800/60 shadow-lg shadow-black/50 group-hover:-translate-y-2 group-hover:shadow-black/70 transition-all duration-500 h-full flex flex-col">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-800 group-hover:border-gray-600 group-hover:scale-110 transition-all duration-300">
                      <Users className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gray-200 transition-colors">Comunidade & Conexões</h3>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors mt-auto">Conecte-se com criadores, desenvolvedores e entusiastas de IA em todo o Brasil. Troque ideias, compartilhe projetos e faça parte da comunidade que está moldando o futuro da inteligência artificial.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Black Feature 3 */}
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:22}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
                <div className="relative bg-[#0a0a0a] rounded-2xl p-8 ring-1 ring-gray-800/60 shadow-lg shadow-black/50 group-hover:-translate-y-2 group-hover:shadow-black/70 transition-all duration-500 h-full flex flex-col">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6 border border-gray-800 group-hover:border-gray-600 group-hover:scale-110 transition-all duration-300">
                      <Terminal className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gray-200 transition-colors">Próximos Eventos e Desafios</h3>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors mt-auto">Descubra o que vem a seguir no ecossistema TRAE Brasil — mais colaborações, desafios e oportunidades únicas pra quem quer liderar a nova era da IA.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* All Black Event Details Section with premium effects */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative group p-[2px] rounded-3xl bg-gradient-to-b from-gray-300/10 to-transparent">
              <motion.div className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-gray-800/60 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-black/40" initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{once:true, amount:0.15}} transition={{duration:0.5}}>
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-6 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]"></div>
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  📅 Detalhes do Evento
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <motion.div className="text-center group" initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                  <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-800 group-hover:border-gray-600 group-hover:scale-105 transition-all duration-300">
                    <Calendar className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Data</h3>
                  <p className="text-xl text-gray-500 font-medium group-hover:text-gray-400 transition-colors">23 de novembro de 2025</p>
                </motion.div>
                
                <motion.div className="text-center group" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
                  <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-800 group-hover:border-gray-600 group-hover:scale-105 transition-all duration-300">
                  <Wifi className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Formato</h3>
                  <p className="text-xl text-gray-500 font-medium group-hover:text-gray-400 transition-colors">Online e gratuito</p>
                </motion.div>
              </div>
              
              <div className="text-center">
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                  Não perca esta oportunidade única de ver o TRAE SOLO em ação e fazer parte da comunidade que está revolucionando o desenvolvimento com IA.
                </p>
                
                <motion.a href="https://luma.com/d2kocb6e" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center bg-black border border-gray-700 hover:border-gray-500 text-white px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden" initial={{opacity:0, y:22}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
                  <span className="flex items-center relative z-10">
                    Registrar-se Agora
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.a>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* All Black Footer with enhanced effects */}
      <footer className="bg-black text-white py-16 border-t border-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="mb-8" initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <h3 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TRAE SOLO Brasil
              </h3>
              <p className="text-xl text-gray-500 mb-8">
                Transformando ideias em realidade com inteligência artificial
              </p>
            </motion.div>
            
            
            
            <motion.div className="border-t border-gray-900 pt-8" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
              <span className="text-gray-600">© 2025 TRAE SOLO. Todos os direitos reservados.</span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
