import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { apiService } from "@/services/api";

export default function FormularioMinimalista() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    
    // Validação ultra-simples
    if (!form.nome.trim() || !form.email.trim()) {
      setError("Por favor, preencha nome e email.");
      return;
    }
    
    if (!form.email.includes('@')) {
      setError("Por favor, insira um email válido.");
      return;
    }

    setStatus("loading");
    try {
      // Enviar apenas nome e email
      await apiService.submitForm({
        nome: form.nome.trim(),
        email: form.email.toLowerCase().trim(),
        telefone: "00000000000", // Valor padrão
        discord: "sem_discord" // Valor padrão
      });
      setStatus("success");
      setForm({ nome: "", email: "" });
    } catch (error: any) {
      setStatus("error");
      setError(error.message || "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Participe Agora
            </motion.h1>
            <p className="text-gray-400 mb-8">Deixe seus dados para participar do meetup.</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border border-white/10 bg-black/80 backdrop-blur-sm p-6">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="nome" className="block text-sm text-gray-300 mb-2">Nome</label>
                  <input
                    id="nome"
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-2">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm text-center">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Enviando..." : "Participar"}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-green-400 text-center text-sm"
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