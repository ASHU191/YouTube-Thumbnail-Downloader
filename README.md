# Descargador de Miniaturas de YouTube

Una aplicación web moderna y gratuita para descargar miniaturas de videos de YouTube en alta resolución.

## 🚀 Características

- **Descarga Gratuita**: Obtén miniaturas sin costo alguno
- **Alta Resolución**: Miniaturas hasta 1280x720 píxeles
- **Múltiples Calidades**: Maxres, HQ, MQ y SD
- **Interfaz Intuitiva**: Diseño limpio y fácil de usar
- **Responsive**: Funciona perfectamente en móviles y escritorio
- **Sin Registro**: No necesitas crear cuenta

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos
- **Lucide React** - Iconos SVG

## 📦 Instalación

1. Clona el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/youtube-thumbnail-downloader.git
cd youtube-thumbnail-downloader
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🚀 Despliegue en Vercel

1. Haz fork de este repositorio
2. Conecta tu repositorio con Vercel
3. Despliega automáticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/youtube-thumbnail-downloader)

## 📁 Estructura del Proyecto

\`\`\`
├── app/
│   ├── api/
│   │   └── extract-thumbnail/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── ThumbnailCard.tsx
├── lib/
│   └── utils.ts
├── public/
│   └── robots.txt
└── README.md
\`\`\`

## 🎯 Uso

1. Copia la URL de cualquier video de YouTube
2. Pégala en el campo de entrada
3. Haz clic en "Buscar"
4. Selecciona la calidad deseada
5. Haz clic en "Descargar"

## 🔧 Formatos de URL Soportados

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## 📱 Calidades Disponibles

- **Máxima Resolución** (1280x720) - `maxresdefault.jpg`
- **Alta Calidad** (480x360) - `hqdefault.jpg`
- **Calidad Media** (320x180) - `mqdefault.jpg`
- **Calidad Estándar** (640x480) - `sddefault.jpg`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ⚠️ Disclaimer

Esta herramienta es independiente y no está afiliada con YouTube o Google. Respeta los términos de servicio de YouTube al usar las miniaturas descargadas.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en GitHub.

---

Hecho con ❤️ para la comunidad hispanohablante
