/* ─────────────────  src/pages/Contact.jsx  ───────────────── */
import { useRef, useState } from 'react';
import emailjs              from '@emailjs/browser';
import { motion }           from 'framer-motion';
import { FaPaperPlane }     from 'react-icons/fa';
import { toast }            from 'react-hot-toast';         

/*  ▸  your own EmailJS IDs  ◂  */
const EMAILJS_SERVICE  = 'service_zt8q8ya';
const EMAILJS_TEMPLATE = 'template_4z9mi2r';
const EMAILJS_PUBLIC   = 'yZePv_eg1l5RViVtK';

const fade = {
  hidden : { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: .6 } },
};

export default function Contact() {
  const formRef             = useRef(null);
  const [status, setStatus] = useState('idle'); 

  const sendEmail = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    emailjs
      .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_PUBLIC)
      .then(() => {
        setStatus('sent');
        formRef.current.reset();
        toast.success('Message sent!');
      })
      .catch(() => {
        setStatus('error');
        toast.error('Something went wrong!');
      });
  };

  return (
    <section id="contact" className="relative bg-white py-20 overflow-hidden">
      {/* decorative blob */}
      <div className="pointer-events-none absolute -top-20 right-10 h-96 w-96 rounded-full
                      bg-sky-400/20 blur-3xl" />

      <div className="container mx-auto max-w-2xl px-6">
        {/* heading & intro */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="inline-block bg-gradient-to-r from-[#002244] via-sky-500 to-sky-300
                          bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Get&nbsp;in&nbsp;Touch
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-600">
            Have an idea, suggestion, or spotted a bug? &nbsp;Drop us a quick message and we’ll get back within one business day.
          </p>
        </motion.div>

        {/* form */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Input placeholder="Your Name"  name="user_name" />
            <Input placeholder="Your Email" name="user_email" type="email" />
          </div>

          <Input    placeholder="Subject" name="subject" />
          <Textarea placeholder="Message (thoughts, suggestions or issues…)" name="message" rows={6} />

          {/* button + status */}
          <div className="pt-4 flex flex-col items-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full
                         bg-gradient-to-r from-sky-600 to-teal-500 px-8 py-3 text-sm font-semibold
                         text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
              <FaPaperPlane className="text-xs" />
            </button>

            {status === 'sent'  && (
              <p className="mt-4 text-green-600">Thanks – we’ll be in touch! ✅</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-600">Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- small helpers ---------- */
function Input({ placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm
                 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200
                 hover:shadow-md"
      required
      {...rest}
    />
  );
}

function Textarea({ placeholder, ...rest }) {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full resize-none rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-sm
                 shadow-sm transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200
                 hover:shadow-md"
      required
      {...rest}
    />
  );
}
