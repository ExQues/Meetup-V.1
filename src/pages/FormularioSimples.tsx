import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { apiService } from "@/services/api";

export default function FormularioSimples() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    discord: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleChange(key: keyof typeof form, value: string) {
    if (key === 'telefone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 11);
      let formatted = cleaned;
      if (cleaned.length <= 10) {
        formatted = cleaned.replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3').trim();
      } else {
        formatted = cleaned.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').trim();
      }
      setForm(prev => ({ ...prev, [key]: formatted }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    
    // Validação mínima
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim() || !form.discord.trim()) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    if (!form.email.includes('@')) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setStatus("loading");
    try {
      const formData = {
        ...form,
        telefone: form.telefone.replace(/\D/g, '')
      };
      
      await apiService.submitForm(formData);
      setStatus("success");
      setForm({ nome: "", email: "", telefone: "", discord: "" });
    } catch (error: any) {
      setStatus("error");
      setError(error.message || "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Participe do Meetup
            </motion.h1>
            <p className="text-gray-400 mb-10">Preencha seus dados para participar.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border border-white/10 bg-black/80 backdrop-blur-sm p-8">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="nome" className="block text-sm text-gray-300 mb-2">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    value={form.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-2">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm text-gray-300 mb-2">Telefone</label>
                  <input
                    id="telefone"
                    type="tel"
                    value={form.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="discord" className="block text-sm text-gray-300 mb-2">Discord</label>
                  <input
                    id="discord"
                    type="text"
                    value={form.discord}
                    onChange={(e) => handleChange("discord", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="usuario#1234"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Enviando..." : "Participar"}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-green-400 text-center"
                  >
                    ✓ Inscrição realizada com sucesso!
                  </motion.div>
                )}
              </motion.form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}