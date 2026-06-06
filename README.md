# Lambert Coffee Store

Proyecto web React + Vite listo para catalogo, carrito y checkout inicial.

## Incluye

- Landing de venta con video de portada y logo local.
- Catalogo editable de cafe por formato y precio.
- Carrito con subtotal, envio y total.
- Checkout con datos del cliente.
- Metodos de pago preparados: Tuu, Transbank y transferencia.
- Boton de WhatsApp con resumen automatico del pedido.

## Configuracion

1. Copia `.env.example` como `.env.local`.
2. Cambia `VITE_WHATSAPP_NUMBER` por el numero real, sin `+`.
3. Agrega `VITE_TUU_CHECKOUT_URL` si tienes link de checkout Tuu.
4. Agrega `VITE_TRANSBANK_CHECKOUT_URL` si tienes un link o endpoint propio para Transbank.

## Desarrollo

```bash
npm install
npm run dev
```

## Produccion

```bash
npm run build
```

La carpeta final para subir queda en `dist/`.
