import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        // Cor institucional — verde-lavoura do Santa Carmem Notícias
        brand: {
          50: '#E6F1EA',
          100: '#C3DDCB',
          200: '#9AC5A8',
          300: '#6FAB85',
          400: '#4A9064',
          500: '#2E7D47',
          600: '#266B3D',
          700: '#1F6B3A', // verde-lavoura (cor principal do selo)
          800: '#17532C', // verde-cerrado (hover, sombras)
          900: '#103E21', // verde-profundo (fundos escuros)
        },
        // Dourado-seara: acentos, destaques, sol no símbolo
        accent: {
          50: '#FCF4DE',
          100: '#F9E7B7',
          200: '#F6D17A',
          300: '#F0C25A',
          400: '#EFBE48',
          500: '#E8B23A', // dourado-seara (cor oficial)
          600: '#C9962F',
          700: '#A57824',
          800: '#7A581A',
          900: '#4E3810',
        },
        // Cores das editorias (cores-assinatura usadas em tags e bordas)
        editoria: {
          cidade: '#1F4E79',
          policia: '#C0392B',
          agro: '#2E7D32',
          eventos: '#E67E22',
        },
        // Azul-céu sutil — fundo da manchete, céu do selo
        sky: {
          light: '#E8F1F9',
        },
        surface: {
          light: '#FAFAFA',
          dark: '#0F1115',
        },
        ink: {
          light: '#1A1D24',
          dark: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-source-serif)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            lineHeight: '1.7',
          },
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
