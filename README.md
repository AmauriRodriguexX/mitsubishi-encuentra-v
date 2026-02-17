# Mitsubishi Lead Form - HTML/CSS/JavaScript

Esta es una aplicación completamente en **HTML puro, CSS y JavaScript vanilla** lista para integrarse en servidores .NET.

## Archivos principales

```
/public/
├── index.html      # Página principal
├── styles.css      # Estilos CSS
├── script.js       # Lógica JavaScript
├── hero-image.png  # Imagen de fondo (necesitas agregarla)
├── logo-mitsubishi.png  # Logo de Mitsubishi (necesitas agregarla)
└── fonts/
    ├── MMC_OFFICE.woff2
    └── MMC_OFFICE.woff
```

## Requisitos

1. **Imágenes necesarias:**
   - `hero-image.png` - Imagen de los autos Mitsubishi
   - `logo-mitsubishi.png` - Logo de Mitsubishi Motors

2. **Fuente MMC_OFFICE:**
   - Crea una carpeta `/fonts/` 
   - Agrega los archivos de fuente `MMC_OFFICE.woff2` y `MMC_OFFICE.woff`

## Integración con .NET

### Backend API Endpoint

En el archivo `script.js` (línea ~350), encontrarás un comentario con código de ejemplo para conectar con tu backend .NET:

```javascript
fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    showSuccessMessage();
})
.catch(error => {
    console.error('Error:', error);
    // Manejar error
});
```

### Estructura de datos enviados

El formulario envía un objeto JSON con los siguientes campos:

```json
{
  "estado": "cdmx",
  "distribuidor": "mitsubishi-polanco",
  "vehiculo": "outlander",
  "version": "sel",
  "nombre": "Juan",
  "apellidoPaterno": "Pérez",
  "apellidoMaterno": "García",
  "edad": "35",
  "genero": "masculino",
  "correo": "juan@email.com",
  "celular": "5512345678",
  "tiempoCompra": "inmediato",
  "aceptoDatos": "on",
  "aceptoPrivacidad": "on"
}
```

### Ejemplo de Controller en .NET

```csharp
[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateLead([FromBody] LeadFormData data)
    {
        // Validar datos
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Guardar en base de datos
        // _leadService.Save(data);

        // Enviar email de notificación al distribuidor seleccionado
        // _emailService.SendToDealer(data.Distribuidor, data);

        return Ok(new { success = true, message = "Lead guardado correctamente" });
    }
}

public class LeadFormData
{
    public string Estado { get; set; }
    public string Distribuidor { get; set; }
    public string Vehiculo { get; set; }
    public string Version { get; set; }
    public string Nombre { get; set; }
    public string ApellidoPaterno { get; set; }
    public string ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string Genero { get; set; }
    public string Correo { get; set; }
    public string Celular { get; set; }
    public string TiempoCompra { get; set; }
    public bool AceptoDatos { get; set; }
    public bool AceptoPrivacidad { get; set; }
}
```

## Características

### Mobile (< 1024px)
- ✅ Imagen de hero arriba (50% viewport)
- ✅ Formulario abajo con scroll
- ✅ Layout vertical limpio
- ✅ Sin sobreposiciones

### Desktop (≥ 1024px)
- ✅ Imagen de fondo fullscreen
- ✅ Formulario a la derecha
- ✅ Efectos de partículas animadas
- ✅ Gradiente interactivo que sigue el mouse

### Validaciones incluidas
- ✅ Campos requeridos
- ✅ Email válido
- ✅ Teléfono 10 dígitos
- ✅ Edad mínima 18 años
- ✅ Checkboxes de privacidad obligatorios

### Animaciones CSS
- ✅ Floating labels
- ✅ Transiciones suaves
- ✅ Efectos de shine
- ✅ Partículas flotantes (desktop)
- ✅ Loading spinner

## Grid System

Todo está basado en un sistema de grid de **8px/16px**:
- Padding: 16px, 24px, 32px, 48px
- Gaps: 8px, 16px, 24px
- Margins: múltiplos de 8px

## Tipografía

- **H2**: `font-weight: bold` (MMC_OFFICE)
- **P**: `font-weight: 500` (medium) (MMC_OFFICE)
- **Labels**: `font-weight: 500` (MMC_OFFICE)
- **Button**: `font-weight: bold` (MMC_OFFICE)

## Colores

- **Rojo Mitsubishi**: `#ee0000`
- **Negro**: `#000000`
- **Blanco**: `#ffffff`
- **Grises**: `#d1d5db`, `#9ca3af`, `#6b7280`, `#374151`

## Deployment en .NET

1. Copia todos los archivos de `/public/` a tu carpeta `wwwroot` en .NET
2. Agrega las imágenes necesarias
3. Agrega los archivos de fuente
4. Configura tu API endpoint en `script.js`
5. Implementa el controller en .NET para recibir los datos

## Notas importantes

- ✅ **Sin dependencias externas** (no React, no Node.js)
- ✅ **Vanilla JavaScript** puro
- ✅ **CSS puro** con animaciones
- ✅ **Responsive** mobile y desktop
- ✅ **Listo para producción**
- ✅ **Compatible con IE11+** (con polyfills si es necesario)

## Soporte

Para modificaciones adicionales, todos los archivos están comentados y son fáciles de editar:
- `index.html` - Estructura HTML
- `styles.css` - Estilos y animaciones
- `script.js` - Validaciones e interactividad