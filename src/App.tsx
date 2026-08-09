import React, { useState, FormEvent, useEffect } from 'react';
import { CheckCircle2, Shield, Cpu, Users, BarChart2, Map, X, Check, Clock, Bot, LayoutGrid, GitMerge, MessageCircle } from 'lucide-react';

// Declaración global para el Pixel de Facebook
declare global {
  interface Window {
    fbq: any;
  }
}

export default function App() {
  // Estado para manejar los pasos del formulario
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    objetivo: '',
    tiempo: '',
    zona: '',
    plazo: '',
    inversion: '',
    confirmacion: false
  });

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Validar y pasar al Paso 2
  const handleNextStep = () => {
    if (formData.nombre && formData.email && formData.whatsapp) {
      setCurrentStep(2);
    } else {
      alert("Por favor, completa nombre, email y WhatsApp para continuar.");
    }
  };

  // Enviar formulario (Paso 2 -> Paso 3)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const GOOGLE_SHEETS_ENDPOINT = "/api/submit";
    
    const now = new Date();
    const fechaHora = now.toLocaleString('es-ES', { 
        day: 'numeric', month: 'numeric', year: 'numeric', 
        hour: 'numeric', minute: 'numeric', second: 'numeric' 
    }).replace(',', '');

    const payload = {
        fecha_hora: fechaHora,
        nombre: formData.nombre,
        correo: formData.email,
        whatsapp: formData.whatsapp,
        objetivo: formData.objetivo,
        disponibilidad: formData.tiempo,
        zona: formData.zona,
        plazo: formData.plazo,
        inversion: formData.inversion,
        utm_source: "",
        utm_campaign: "",
        utm_content: ""
    };

    try {
        const response = await fetch(GOOGLE_SHEETS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Error en el servidor');
        const data = await response.json();
        
        if (data.success) {
            setCurrentStep(3); // Mostrar pantalla de gracias
            
            // Scroll arriba
            document.getElementById('aplicar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Pixel FB
            if(typeof window.fbq === 'function') {
                window.fbq('track', 'Lead');
            }
        } else {
            throw new Error(data.error || 'Error al guardar');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al enviar tu aplicación.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      
      {/* NAV */}
      <nav className="absolute w-full z-50 py-8 px-6 md:px-12 lg:px-24 flex justify-between items-center">
        {/* REEMPLAZA CON LA RUTA DE TU LOGO */}
        <img src="/images/logosin fondo.webp" alt="Oi Real Estate" className="h-16 object-contain" />
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="min-h-[90vh] flex items-center relative pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}>
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                
                <div className="z-10 text-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-8 bg-[#E60000]"></div>
                        <p className="uppercase tracking-[0.1em] text-[0.65rem] font-semibold text-gray-300">OPORTUNIDAD DE NEGOCIO INMOBILIARIO</p>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-8 font-normal">
                        Construye tu <br/>propio negocio <br/>inmobiliario bajo <br/>una marca <br/><span className="italic text-[#E60000] font-medium">consolidada</span> <span className="text-white">- sin <br/>empezar de cero.</span>
                    </h1>

                    <div className="flex gap-4 mt-12">
                        <a href="#aplicar" className="border border-white/30 text-white uppercase tracking-widest text-xs font-medium px-8 py-4 hover:border-white hover:bg-white/10 transition-all">Aplicar al programa</a>
                        <a href="#modelo" className="border border-white/30 text-white uppercase tracking-widest text-xs font-medium px-8 py-4 hover:border-white hover:bg-white/10 transition-all hidden sm:inline-block">Descubrir el sistema</a>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div id="aplicar" className="z-10 w-full max-w-lg mx-auto lg:ml-auto">
                    
                    {currentStep !== 3 ? (
                        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 shadow-2xl rounded-sm">
                            
                            {/* PASO 1 */}
                            {currentStep === 1 && (
                                <div>
                                    <h3 className="text-xl font-bold text-[#0a0a0a] mb-2 text-center">APLICAR AL PROGRAMA</h3>
                                    <p className="text-[0.65rem] text-gray-500 mb-8 font-medium uppercase tracking-widest text-center">COMPLETA TUS DATOS PARA VER SI CUALIFICAS PARA EL PROGRAMA.</p>
                                    
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">Nombre Completo *</label>
                                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]" placeholder="Tu nombre completo" />
                                        </div>
                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">Correo Electrónico *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]" placeholder="tu@correo.com" />
                                        </div>
                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">WhatsApp *</label>
                                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]" placeholder="+34 600 000 000" />
                                        </div>
                                    </div>

                                    <button type="button" onClick={handleNextStep} className="bg-[#E60000] text-white w-full py-4 mt-8 flex justify-center items-center text-[0.80rem] font-bold hover:bg-black transition-colors">
                                        SIGUIENTE
                                    </button>
                                </div>
                            )}

                            {/* PASO 2 */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">1. OBJETIVO PRINCIPAL AL ABRIR LA AGENCIA <span className="text-[#E60000]">*</span></label>
                                            <select name="objetivo" value={formData.objetivo} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]">
                                                <option value="" disabled>Selecciona una opción</option>
                                                <option value="Independencia financiera">Independencia financiera</option>
                                                <option value="Crecimiento profesional">Crecimiento profesional</option>
                                                <option value="Construir y operar mi propio negocio">Construir y operar mi propio negocio</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">2. DISPONIBILIDAD DE TIEMPO <span className="text-[#E60000]">*</span></label>
                                            <select name="tiempo" value={formData.tiempo} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]">
                                                <option value="" disabled>Selecciona tu disponibilidad</option>
                                                <option value="Tiempo completo">Tiempo completo</option>
                                                <option value="Tiempo parcial">Tiempo parcial</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">3. ¿EN QUÉ CIUDAD O ZONA TE GUSTARÍA ABRIR TU NEGOCIO? <span className="text-[#E60000]">*</span></label>
                                            <input name="zona" type="text" value={formData.zona} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]" placeholder="Ej. Madrid, Barcelona..." />
                                        </div>

                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">4. PLAZO PARA ESTAR OPERATIVO <span className="text-[#E60000]">*</span></label>
                                            <select name="plazo" value={formData.plazo} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]">
                                                <option value="" disabled>Selecciona un plazo</option>
                                                <option value="Este mes">Este mes</option>
                                                <option value="1 a 3 meses">1 a 3 meses</option>
                                                <option value="3 a 6 meses">3 a 6 meses</option>
                                                <option value="Más de 6 meses">Más de 6 meses</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-black mb-1">5. ¿ESTÁS DISPUESTO A REALIZAR LA INVERSIÓN NECESARIA SI EL MODELO ENCAJA CONTIGO? <span className="text-[#E60000]">*</span></label>
                                            <select name="inversion" value={formData.inversion} onChange={handleChange} required className="w-full bg-white border border-gray-300 text-black p-3 text-sm focus:outline-none focus:border-[#E60000]">
                                                <option value="" disabled>Selecciona una opción</option>
                                                <option value="Sí, estoy dispuesto a invertir si el modelo encaja conmigo">Sí, estoy dispuesto a invertir si el modelo encaja conmigo</option>
                                                <option value="Necesito más información antes de decidir">Necesito más información antes de decidir</option>
                                            </select>
                                        </div>

                                        <div className="flex items-start mt-4">
                                            <div className="flex items-center h-5">
                                                <input name="confirmacion" type="checkbox" checked={formData.confirmacion} onChange={handleChange} required className="w-4 h-4 text-[#E60000] border-gray-300 rounded focus:ring-[#E60000]" />
                                            </div>
                                            <div className="ml-3 text-[0.65rem] font-bold uppercase tracking-widest text-gray-500">
                                                <label>Confirmo que mis datos son correctos y deseo agendar una evaluación.</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button type="button" onClick={() => setCurrentStep(1)} className="w-1/3 py-3 text-[0.80rem] font-bold text-black hover:text-gray-500 transition-colors flex items-center justify-center">
                                            &larr; ATRÁS
                                        </button>
                                        <button type="submit" disabled={isSubmitting} className="w-2/3 py-3 bg-[#E60000] text-white text-[0.80rem] font-bold hover:bg-black transition-colors flex justify-center items-center">
                                            {isSubmitting ? 'ENVIANDO...' : 'ENVIAR APLICACIÓN →'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    ) : (
                        /* PANTALLA DE GRACIAS */
                        <div className="bg-[#161b22] p-10 md:p-12 rounded-sm text-center shadow-2xl">
                            <div className="w-12 h-12 bg-[#2d333b] rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Solicitud recibida correctamente</h2>
                            <p className="text-gray-400 font-light text-sm mb-8">Gracias por postular para formar parte de la red Oi Real Estate.</p>
                            
                            <div className="w-12 h-[1px] bg-[#E60000] mx-auto mb-8"></div>
                            
                            <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                                Nuestro equipo va a revisar tu solicitud, incluyendo la disponibilidad de tu zona. Como no todos los perfiles ni todas las zonas califican para el programa, te confirmamos por WhatsApp en menos de 24 horas si tu situación encaja con el modelo — y si es así, agendamos una llamada donde te explicamos con detalle la inversión y los plazos.
                            </p>
                            
                            <p className="text-[0.70rem] text-gray-500 mb-10">
                                Guarda este número en tus contactos para no perderte el mensaje.
                            </p>
                            
                            <div className="pt-6 border-t border-white/5">
                                <p className="text-[0.75rem] text-white mb-4">¿No quieres esperar? Escríbenos ahora.</p>
                                <a href="https://wa.me/34600000000" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-[#e02424] text-white text-sm font-bold rounded-sm hover:bg-red-700 transition-colors">
                                    <MessageCircle className="w-4 h-4 mr-2" /> Hablar por WhatsApp
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* BENEFICIOS */}
        <section id="modelo" className="py-24 bg-white text-center px-6">
            <h2 className="text-4xl md:text-5xl font-serif text-[#0a0a0a] mb-4 font-normal">Empiezas con lo que a otros<br/>les toma años construir.</h2>
            <p className="text-gray-400 font-sans font-light mb-20">No necesitas experiencia inmobiliaria. Necesitas mentalidad empresarial.</p>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 text-left">
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Cartera en marcha</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">No captas propiedades desde cero. Te incorporas a una cartera ya en marcha, con más de 100.000 propiedades gestionadas y más de 800 nuevos propietarios incorporados cada mes.</p>
                </div>
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <Shield className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Marca consolidada</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">Operas bajo una marca consolidada desde 2008 - no bajo un nombre que tienes que dar a conocer tú mismo. El prestigio ya está construido.</p>
                </div>
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <Cpu className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Tecnología propia</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">CRM propio desde 2011, inteligencia artificial que analiza el mercado y cruza compradores, y un sistema que detecta propietarios y oportunidades antes que el resto del sector.</p>
                </div>
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <Users className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Acompañamiento real</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">Formación inicial de 10 días más acompañamiento presencial durante tu primera semana de operación.</p>
                </div>
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <BarChart2 className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Seguimiento intensivo</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">Seguimiento intensivo durante los primeros 3 meses y supervisión mensual desde el cuarto. No te dejamos operando solo.</p>
                </div>
                <div>
                    <div className="mb-6 text-[#E60000]">
                        <Map className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#0a0a0a] mb-4">Exclusividad</h3>
                    <p className="text-gray-500 font-light text-[0.95rem] leading-relaxed">Exclusividad de zona, confirmada mediante un estudio de mercado antes de arrancar.</p>
                </div>
            </div>
        </section>

        {/* COMPARATIVA */}
        <section className="py-24 px-6 bg-[#111111] text-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-20 font-normal text-white">
                    El modelo tradicional de franquicia inmobiliaria <span className="italic text-[#E60000]">está obsoleto.</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                    <div className="border border-[#222] p-10 relative bg-[#151515]">
                        <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                            <X className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="font-serif text-xl text-gray-400 mb-4">Modelo Tradicional</h3>
                        <p className="font-light text-gray-500 leading-relaxed text-sm">
                            Las franquicias tradicionales venden una marca. Después te dejan resolver por tu cuenta la parte más difícil: conseguir propietarios y generar negocio.
                        </p>
                    </div>

                    <div className="border border-[#E60000] p-10 relative bg-[#1a0f0f]">
                        <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#E60000] flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-serif text-xl text-white mb-4">El Modelo Oi</h3>
                        <p className="font-light text-gray-300 leading-relaxed text-sm">
                            Nosotros hacemos lo contrario. Primero resolvemos la captación. Después, tú haces crecer la agencia.
                        </p>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-xl md:text-2xl font-serif italic font-normal leading-relaxed text-gray-200">
                        "Las franquicias tradicionales te dan una marca. Nosotros también - y 800<br/>propietarios nuevos cada mes."
                    </p>
                    <div className="w-12 h-[1px] bg-[#E60000] mx-auto mt-8"></div>
                </div>
            </div>
        </section>

        {/* NÚMEROS */}
        <section className="py-24 bg-[#f4f4f4]">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-serif text-center text-[#0a0a0a] mb-16 font-normal">Los números detrás del sistema.</h2>
                <div className="flex flex-col md:flex-row justify-center items-center divide-y md:divide-y-0 md:divide-x divide-gray-300">
                    <div className="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">
                        <p className="text-6xl md:text-7xl font-serif text-[#0a0a0a] mb-4">800</p>
                        <p className="text-[0.65rem] uppercase tracking-widest text-gray-500 font-bold leading-relaxed">PROPIETARIOS VENDEDORES<br/>INCORPORADOS CADA MES</p>
                    </div>
                    <div className="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">
                        <p className="text-6xl md:text-6xl lg:text-7xl font-serif text-[#0a0a0a] mb-4">+100.000</p>
                        <p className="text-[0.65rem] uppercase tracking-widest text-gray-500 font-bold leading-relaxed">PROPIEDADES<br/>GESTIONADAS</p>
                    </div>
                    <div className="px-4 md:px-8 py-8 md:py-0 text-center w-full md:w-1/3">
                        <p className="text-6xl md:text-7xl font-serif text-[#0a0a0a] mb-4">2008</p>
                        <p className="text-[0.65rem] uppercase tracking-widest text-gray-500 font-bold leading-relaxed">OPERANDO EN<br/>ESPAÑA DESDE</p>
                    </div>
                </div>
            </div>
        </section>

        {/* TECNOLOGÍA */}
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div>
                        <img src="/images/calendario-Nexo-CRM%20(1).webp" className="w-full rounded-md mb-6 shadow-sm object-cover aspect-video" alt="Agenda IA" />
                        <div className="flex items-center gap-2 mb-3">
                            <Bot className="w-5 h-5 text-[#E60000]" />
                            <h4 className="text-xl font-serif font-bold text-black">Agenda IA</h4>
                        </div>
                        <p className="text-sm font-light text-gray-500 leading-relaxed">Olvídate de la puerta fría y las llamadas de prospección. Nuestra IA filtra y califica el interés, entregando solo citas confirmadas en tu CRM. Tu única tarea es la gestión comercial y el cierre.</p>
                    </div>
                    <div>
                        <img src="/images/Propiedades-%20(1).webp" className="w-full rounded-md mb-6 shadow-sm object-cover aspect-video" alt="Inventario" />
                        <div className="flex items-center gap-2 mb-3">
                            <LayoutGrid className="w-5 h-5 text-[#E60000]" />
                            <h4 className="text-xl font-serif font-bold text-black">Inventario Verificado</h4>
                        </div>
                        <p className="text-sm font-light text-gray-500 leading-relaxed">Accede a nuestro catálogo de propiedades premium ya gestionadas y validadas. Empieza a operar con activos reales desde el primer día.</p>
                    </div>
                    <div>
                        <img src="/images/interfaz-Nexo-CRM%20(1).webp" className="w-full rounded-md mb-6 shadow-sm object-cover aspect-video" alt="CRM" />
                        <div className="flex items-center gap-2 mb-3">
                            <GitMerge className="w-5 h-5 text-[#E60000]" />
                            <h4 className="text-xl font-serif font-bold text-black">Tecnología Integrada</h4>
                        </div>
                        <p className="text-sm font-light text-gray-500 leading-relaxed">Centraliza todo en nuestra plataforma propia: CRM integrado, gestión de demandas y automatización de seguimientos.</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center border-t border-gray-100 pt-16">
                    <p className="text-xl md:text-2xl font-serif italic text-black mb-6">"Quien controla los datos, controla las oportunidades. Y quien controla las oportunidades, lidera el mercado."</p>
                    <p className="text-[0.70rem] text-[#E60000] font-bold uppercase tracking-widest">LUIS RUBÉN GUALTIERI, FUNDADOR Y CEO</p>
                </div>
            </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-24 px-6 bg-[#fcfcfc] border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 font-normal text-black">Respaldado por resultados reales.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white p-10 shadow-sm border border-gray-100 relative pt-12">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#E60000]"></div>
                        <p className="font-serif italic text-gray-600 text-lg leading-relaxed mb-8">
                            "Oi Real Estate proporciona a los franquiciados un gran conocimiento del sector y una imagen sólida y bien posicionada en todo el territorio nacional."
                        </p>
                        <div>
                            <p className="font-bold text-black text-[0.75rem] uppercase tracking-widest">Albert Tárraga</p>
                            <p className="text-gray-400 text-[0.65rem] mt-1 uppercase tracking-widest">Franquiciado Sant Cugat</p>
                        </div>
                    </div>
                    <div className="bg-white p-10 shadow-sm border border-gray-100 relative pt-12">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#E60000]"></div>
                        <p className="font-serif italic text-gray-600 text-lg leading-relaxed mb-8">
                            "La ventaja de emprender con una franquicia es que adaptas su modelo a tus clientes y cartera de propiedades. Oi Real Estate aporta, además, un equipo profesional y la última tecnología."
                        </p>
                        <div>
                            <p className="font-bold text-black text-[0.75rem] uppercase tracking-widest">Marian Fuset</p>
                            <p className="text-gray-400 text-[0.65rem] mt-1 uppercase tracking-widest">Franquiciada Maresme</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CIERRE */}
        <section className="py-24 px-6 text-center bg-[#E60000] text-white">
            <div className="max-w-3xl mx-auto">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] mb-4 font-bold">"EL RIESGO NO ES CAMBIAR. EL RIESGO ES NO HACERLO."</p>
                <h2 className="text-4xl md:text-6xl font-serif mb-6 font-normal">¿Listo para dar el siguiente paso?</h2>
                <p className="font-light text-white/90 mb-12 text-sm">Descubre si este modelo encaja contigo y conoce los requisitos para formar parte de la red.</p>
                
                <a href="#aplicar" className="inline-block bg-[#0a0a0a] text-white px-10 py-5 uppercase tracking-widest text-[0.75rem] font-bold hover:bg-white hover:text-[#0a0a0a] transition-colors shadow-lg">
                    APLICAR AL PROGRAMA -
                </a>
                
                <div className="flex items-center justify-center mt-8 gap-2">
                    <Clock className="w-4 h-4" />
                    <p className="text-[0.65rem] font-medium tracking-[0.1em] uppercase">
                        RESPUESTA EN MENOS DE 24 HORAS
                    </p>
                </div>
            </div>
        </section>
    </main>

    <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 text-[0.70rem] font-light text-center flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p className="mb-4 md:mb-0">© 2026 Oi Real Estate Barcelona. Todos los derechos reservados.</p>
        <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
        </div>
    </footer>

    </div>
  );
}