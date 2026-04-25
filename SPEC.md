# SPEC.md - Sistemas 4A

## 1. Project Overview

- **Project Name:** Sistemas 4A Landing Page
- **Type:** Website de consultoría y soporte técnico IT
- **Company:** Sistemas 4A (Venezuela)
- **Focus:** Consultoría empresarial y residencial conPlanes de Soporte Técnico
- **Reference:** https://www.winstelecom.com.pa/ + https://nautiluz.github.io/Angel-Rodriguez/

## 2. UI/UX Specification

### Layout Structure
- **Header:** Logo + Navegación + Botón "Cotizar"
- **Hero:** Título profesional + tagline + CTA
- **Servicios:** Grid de servicios con categorías
- **Planes:** 4 planes empresariales (Micro, PYME, Premium, Ilimitado)
- **Copiloto IA:** Widget flotante + Modal
- **Contacto:** Formulario + WhatsApp + Email
- **Footer:** Links + Redes sociales

### Visual Design
- **Colors:**
  - Primary: #0078D4 (azul Microsoft)
  - Secondary: #107C10 (verde éxito)
  - Accent: #FFB900 (amarillo)
  - Dark: #323130
  - Gray: #605E5C
  - Light: #F3F2F1
  - White: #FFFFFF
- **Typography:** DM Sans + Inter
- **Style:** Minimalista profesional, estilo Wins Telecom

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 3. Functionality Specification

### Servicios Técnicos
1. **Soporte Remoto:** Por hora, язык simple
2. **Diagnóstico General:** Memory test, HDD, componentes
3. **Recuperación Datos:** 500 BsF base + 20 BsF/10GB
4. **Internet/WiFi:** Redes, VPN, correo
5. **Desarrollo Web:** Páginas, sistemas
6. **Consultoría IT:** Estrategia, Planeación
7. **Suministro Tech:** Hardware, software, redes

### Planes de Soporte
| Plan | Equipos | Horas Sitio | Precio BsF |
|------|---------|-------------|-------------|
| Micro | hasta 5 | 4 hrs/mes | 2000 +IVA |
| PYME | hasta 10 | 8 hrs/mes | 5000 +IVA |
| Premium | hasta 20 | 16 hrs/mes | 10000 +IVA |
| Ilimitado | hasta 30 | ilimitadas | 30000 +IVA |

### Conversión BCV
- Precio USD (base): $5/hora técnica
- Tasa BCV: api.dolarflow.com
- Mostrar: Bs + USD equivalente

### Copiloto IA (Local)
- No usa APIs externas
- Ejecuta en dispositivo del usuario
- Flujo: Selección servicio → Ir a sección → Mostrar detalles → Capturar datos → Envío automático
- Captura: nombre → empresa → equipos → email → teléfono
- Envío por 3 canales:
  1. **Telegram:** Envío directo via API Bot (automático)
  2. **WhatsApp:** Abre WhatsApp Web con mensaje preparado
  3. **Email:** Automático via EmailJS (configurar credenciales)

### Sistema de Leads (GitHub Pages)
- Guardar en localStorage
- Sin backend PHP
- Telegram API directo desde JS
- Email vía EmailJS (configurar en copilot.js)

## 4. Admin Panel

- Editar precios de servicios
- Editar precios de planes
- Configurar tasa BCV manual/auto
- Editarcontacto (WhatsApp, Email)
- Ver Leads capturados

## 5. Contacto

- WhatsApp: +58 412 0317421
- Email: nautiluz90@gmail.com
- Responsable: Ing. Angel Rodriguez