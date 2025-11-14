import { motion } from "framer-motion";
import { Code, Calendar, Users, ArrowRight } from "lucide-react";

export default function Comunidade() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-4xl md:text-5xl font-bold mb-4">
              Comunidade TRAE Brasil
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="text-lg md:text-xl text-gray-400 mb-6">
              Nosso ponto de encontro oficial é o servidor do Discord. É lá que acontecem
              eventos e anúncios exclusivos, além de um canal de texto dedicado para brasileiros.
            </motion.p>
            <div className="max-w-3xl mx-auto text-left text-gray-300">
              <ul className="space-y-2">
                <li>• Eventos e desafios que só acontecem no Discord</li>
                <li>• Canal de texto pt‑BR exclusivo para a comunidade brasileira</li>
                <li>• Networking, projetos e suporte entre participantes</li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto space-y-4 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 flex items-start gap-4 hover:border-white/20"
            >
              <div className="rounded-xl border border-white/10 bg-black p-3">
                <Code className="w-6 h-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold">Projetos</h3>
                <p className="text-gray-400 mt-1">Descubra e compartilhe iniciativas da comunidade.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 flex items-start gap-4 hover:border-white/20"
            >
              <div className="rounded-xl border border-white/10 bg-black p-3">
                <Calendar className="w-6 h-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold">Eventos</h3>
                <p className="text-gray-400 mt-1">Acompanhe encontros, lives e desafios.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="relative group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 flex items-start gap-4 hover:border-white/20"
            >
              <div className="rounded-xl border border-white/10 bg-black p-3">
                <Users className="w-6 h-6 text-gray-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold">Networking</h3>
                <p className="text-gray-400 mt-1">Conecte-se com pessoas e oportunidades.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white/80 transition-colors" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </motion.div>
          </div>
          <div className="max-w-4xl mx-auto text-center mt-10">
            <motion.a
              href="https://discord.gg/rYC6VVa2V2"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="inline-flex items-center bg-black border border-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#32F08C]"
            >
              Entrar no Discord
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
