import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Formulario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.nome.trim()) nextErrors.nome = "Informe seu nome.";
    if (!form.email.trim()) nextErrors.email = "Informe seu e-mail.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "E-mail inválido.";
    if (!form.assunto.trim()) nextErrors.assunto = "Informe o assunto.";
    if (!form.mensagem.trim() || form.mensagem.trim().length < 10) nextErrors.mensagem = "Mensagem muito curta.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      // Simulação de envio: integração futura via fetch
      // console.log("Formulário enviado", form);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Formulário de Participação
            </motion.h1>
            <p className="text-gray-400 mb-10">Preencha seus dados para confirmar interesse.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="relative group p-[2px] rounded-2xl bg-gradient-to-b from-white/8 to-transparent">
              <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-sm p-6 sm:p-8">
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  <div className="flex flex-col">
                    <label htmlFor="nome" className="text-sm text-gray-300 mb-2">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      value={form.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.nome)}
                      aria-describedby={errors.nome ? "error-nome" : undefined}
                      placeholder="Seu nome"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.nome && (
                      <p id="error-nome" className="mt-2 text-sm text-red-400">{errors.nome}</p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-gray-300 mb-2">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      placeholder="Seu e-mail"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.email && (
                      <p id="error-email" className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="assunto" className="text-sm text-gray-300 mb-2">Assunto</label>
                    <input
                      id="assunto"
                      name="assunto"
                      type="text"
                      value={form.assunto}
                      onChange={(e) => handleChange("assunto", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.assunto)}
                      aria-describedby={errors.assunto ? "error-assunto" : undefined}
                      placeholder="Assunto"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.assunto && (
                      <p id="error-assunto" className="mt-2 text-sm text-red-400">{errors.assunto}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="mensagem" className="text-sm text-gray-300 mb-2">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={5}
                      value={form.mensagem}
                      onChange={(e) => handleChange("mensagem", e.target.value)}
                      required
                      aria-invalid={Boolean(errors.mensagem)}
                      aria-describedby={errors.mensagem ? "error-mensagem" : undefined}
                      placeholder="Sua mensagem"
                      className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.mensagem && (
                      <p id="error-mensagem" className="mt-2 text-sm text-red-400">{errors.mensagem}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 inline-flex items-center justify-center bg-black border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 sm:col-span-2 disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar"}
                  </button>

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="sm:col-span-2 mt-2 text-green-400"
                    >
                      Mensagem enviada com sucesso!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="sm:col-span-2 mt-2 text-red-400"
                    >
                      Ocorreu um erro ao enviar. Tente novamente.
                    </motion.div>
                  )}
                </motion.form>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
