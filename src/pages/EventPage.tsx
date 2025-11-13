import { Calendar, Clock, Wifi, Users, Zap, Star, ArrowRight, Sparkles, Code, Terminal, Monitor, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { useEffect, useRef, FC, ReactNode } from 'react'
import { Card } from '@/components/ui/card'

interface ComponentProps {
  title: string
  description: string[]
  icon?: ReactNode
}

const Component: FC<ComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300">
      <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative overflow-hidden hover:border-white/25 hover:shadow-white/5 hover:shadow-3xl w-full h-full min-h-[360px] md:min-h-[380px] flex flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>
        <div className="p-8 relative z-10 flex flex-col items-center text-center flex-1">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>
            <div className="p-6 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-white/20">
              <div className="transform group-hover:rotate-180 transition-transform duration-700">
                {icon}
              </div>
            </div>
          </div>
          <h3 className="mb-4 text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>
          <div className="space-y-1 max-w-sm">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-gray-300 text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse"></div>
          <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  )
}

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
      <section className="py-16 bg-black">
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
                <Component
                  title="Códigos PRO & Premiações"
                  description={[
                    'Durante a live, os participantes poderão receber códigos exclusivos TRAE PRO, garantindo acesso gratuito e completo por tempo limitado.',
                    'Além disso, haverá outras premiações surpresa ao longo do evento.'
                  ]}
                  icon={<Code className="w-8 h-8 text-gray-300" />}
                />
              </motion.div>
              
              {/* Black Feature 2 */}
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
                <Component
                  title="Comunidade & Conexões"
                  description={[
                    'Conecte-se com criadores, desenvolvedores e entusiastas de IA em todo o Brasil.',
                    'Troque ideias, compartilhe projetos e faça parte da comunidade que está moldando o futuro da inteligência artificial.'
                  ]}
                  icon={<Users className="w-8 h-8 text-gray-300" />}
                />
              </motion.div>
              
              {/* Black Feature 3 */}
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:22}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
                <Component
                  title="Próximos Eventos e Desafios"
                  description={[
                    'Descubra o que vem a seguir no ecossistema TRAE Brasil — mais colaborações, desafios e oportunidades únicas pra quem quer liderar a nova era da IA.'
                  ]}
                  icon={<Terminal className="w-8 h-8 text-gray-300" />}
                />
              </motion.div>
            </div>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch auto-rows-fr">
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
                <Component title="Data" description={[ '23 de novembro de 2025' ]} icon={<Calendar className="w-8 h-8 text-gray-300" />} />
              </motion.div>
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
                <Component title="Formato" description={[ 'Online e gratuito' ]} icon={<Wifi className="w-8 h-8 text-gray-300" />} />
              </motion.div>
              <motion.div className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent hover:from-white/12 transition-all duration-500 h-full" initial={{opacity:0, y:22}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
                <Component title="Participação" description={[ 'Não perca esta oportunidade única de ver o TRAE SOLO em ação.', 'Faça parte da comunidade que está revolucionando o desenvolvimento com IA.' ]} icon={<Sparkles className="w-8 h-8 text-gray-300" />} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0, y:18}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Sobre o Helio</h2>
              <p className="text-lg text-gray-400 mb-4">
                Helio é o host da demonstração TRAE SOLO, focado em mostrar como transformar ideias em produtos reais com velocidade e qualidade.
                Sua abordagem prática conecta ferramentas inteligentes a fluxos de trabalho modernos para criar experiências completas.
              </p>
              <p className="text-lg text-gray-400">
                Nesta live, ele conduz a jornada de forma clara e objetiva, explorando integrações, automações e boas práticas que elevam o nível de qualquer projeto.
              </p>
              <motion.a href="https://luma.com/d2kocb6e" target="_blank" rel="noopener noreferrer" className="mt-6 group relative inline-flex items-center bg-black border border-gray-700 hover:border-gray-500 text-white px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden" initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.05}}>
                <span className="flex items-center relative z-10">Registrar-se no Luma <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.a>
            </motion.div>
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.05}}>
              <div className="relative group p-[2px] rounded-3xl bg-gradient-to-b from-white/8 to-transparent">
                <div className="relative rounded-3xl overflow-hidden border border-gray-800/60 bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                    alt="Foto do apresentador"
                    className="w-full h-[340px] md:h-[460px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Black Footer with enhanced effects */}
      <footer className="relative bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white py-20 border-t border-gray-800">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
