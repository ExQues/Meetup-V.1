import { motion } from "framer-motion";

export default function Formulario() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-4xl md:text-5xl font-bold mb-4">
              Formulário de Participação
            </motion.h1>
            <p className="text-gray-400 mb-10">Preencha seus dados para confirmar interesse.</p>
          </div>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
            <input className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600" placeholder="Seu nome" />
            <input className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600" placeholder="Seu e-mail" />
            <input className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 sm:col-span-2" placeholder="Assunto" />
            <textarea className="w-full rounded-xl border border-gray-800 bg-black px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 sm:col-span-2" placeholder="Mensagem" rows={5} />
            <button className="mt-2 inline-flex items-center bg-black border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 sm:col-span-2">Enviar</button>
          </div>
        </div>
      </section>
    </div>
  );
}
