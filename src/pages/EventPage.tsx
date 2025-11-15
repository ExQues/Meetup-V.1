import { Calendar, Clock, Wifi, Users, Zap, Star, ArrowRight, Sparkles, Code, Terminal, Square } from 'lucide-react'
import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { TypingText } from '@/components/TypingText'
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
      <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl w-full h-full min-h-[360px] md:min-h-[380px] flex flex-col">
        <div className="p-8 relative z-10 flex flex-col items-center text-center flex-1">
          <div className="relative mb-6">
            {icon}
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
          
        </div>
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
      <section id="hero" ref={sectionRef} className="bg-black text-white relative">
        <BackgroundBeams color="#32F08C" visible={14} />
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="relative group max-w-4xl mx-auto text-center">
            
            
            <motion.div className="mb-8" initial={{opacity:0, y:14}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.05}}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-2 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.06)]">
                <TypingText text="Demonstração e Live Demo" speed={40} delay={50} once className="inline-block" />
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                <span className="relative inline-block px-1 text-[#32F08C] before:content-[''] before:absolute before:inset-0 before:bg-[#32F08C]/14 before:blur-md before:rounded-md before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 after:block after:h-[2px] after:bg-gradient-to-r from-transparent via-[#32F08C] to-transparent after:mt-1 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500">TRAE SOLO</span>
                <span className="text-gray-300 transition-colors group-hover:text-gray-200"> em ação</span>
              </p>
            </motion.div>
            
            <motion.div className="max-w-3xl mx-auto mb-10" initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-6">
                Veja o TRAE criar, integrar e executar projetos reais usando Browser, Docview e Integrações Inteligentes. 
                Helio mostrará, ao vivo, como transformar ideias em produtos prontos em poucos minutos.
              </p>
            </motion.div>
            
            
            <motion.a href="https://luma.com/d2kocb6e" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center px-10 py-5 rounded-2xl text-lg font-semibold bg-gradient-to-b from-[#32F08C] to-[#22C06C] text-black shadow-[0_8px_20px_rgba(50,240,140,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32F08C]" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.2}}>
              <span className="flex items-center">
                Garantir Minha Vaga Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      

      {/* All Black Features Section with 3D effects */}
      <section id="features" className="py-16 bg-black">
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
            
          </div>
        </div>
      </section>



      <section id="sobre" className="py-16 bg-black">
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
      <footer id="footer" className="relative bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#141414] text-white py-20 border-t border-gray-900">
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_70%)]"></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015),transparent_18%),linear-gradient(to_left,rgba(255,255,255,0.015),transparent_18%)]"></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_40%),linear-gradient(to_top,rgba(255,255,255,0.02),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="mb-8" initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <h3 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TRAE SOLO Brasil
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                Transformando ideias em realidade com inteligência artificial
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
